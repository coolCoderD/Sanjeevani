import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, BlobSASPermissions } from "@azure/storage-blob";
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import dotenv from "dotenv";

dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  "AZURE_STORAGE_ACCOUNT_NAME",
  "AZURE_STORAGE_ACCOUNT_KEY",
  "AZURE_FORM_RECOGNIZER_ENDPOINT",
  "AZURE_FORM_RECOGNIZER_KEY"
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing environment variable: ${varName}`);
    process.exit(1); // Stop execution if any env variable is missing
  }
});

// Azure Blob Storage Configuration
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  new StorageSharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT_NAME, process.env.AZURE_STORAGE_ACCOUNT_KEY)
);

// Azure Form Recognizer Configuration
const formRecognizerClient = new DocumentAnalysisClient(
  process.env.AZURE_FORM_RECOGNIZER_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_FORM_RECOGNIZER_KEY)
);

/**
 * Get the URL of a blob.
 * @param {string} containerName - Name of the container.
 * @param {string} blobName - Name of the blob (file).
 * @returns {string} - The URL of the blob.
 */
const getBlobURL = async (containerName, blobName) => {
  try {
    console.log(`🔍 Fetching URL for blob: ${blobName} in container: ${containerName}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);
    return blobClient.url;
  } catch (error) {
    console.error("❌ Error fetching blob URL:", error);
    throw error;
  }
};

/**
 * Generate a SAS URL for uploading a blob.
 * @param {string} containerName - Name of the container.
 * @param {string} blobName - Name of the blob.
 * @param {number} expiryTime - Expiry time in seconds (default: 3600s).
 * @returns {string} - The SAS URL for uploading the file.
 */
const getUploadURL = async (containerName = process.env.AZURE_BLOB_CONTAINER_NAME, blobName, expiryTime = 3600) => {
  try {
    console.log(`🚀 Generating upload SAS URL for ${blobName} in ${containerName}`);

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + expiryTime);

    const sasToken = generateBlobSASQueryParameters(
      {
        containerName,
        blobName,
        permissions: BlobSASPermissions.parse("w"), // Write permission
        expiresOn: expiryDate,
      },
      new StorageSharedKeyCredential(process.env.AZURE_STORAGE_ACCOUNT_NAME, process.env.AZURE_STORAGE_ACCOUNT_KEY)
    ).toString();

    return `${blobClient.url}?${sasToken}`;
  } catch (error) {
    console.error("❌ Error generating SAS upload URL:", error);
    throw error;
  }
};

/**
 * Extract text from a PDF using Azure Form Recognizer.
 * @param {string} containerName - The Azure Blob container name.
 * @param {string} blobName - The name of the PDF file.
 * @returns {string} - Extracted text from the document.
 */
const extractTextFromPDF = async (containerName, blobName) => {
  try {
    console.log(`📄 Extracting text from PDF: ${blobName} in container: ${containerName}`);

    const blobURL = await getBlobURL(containerName, blobName);

    // Start document analysis
    console.log(`🔍 Sending file to Azure Form Recognizer...`);
    const poller = await formRecognizerClient.beginAnalyzeDocument("prebuilt-document", blobURL);
    const result = await poller.pollUntilDone();

    if (!result || !result.pages) {
      throw new Error("❌ No text extracted. Check if the file is valid.");
    }

    // Extract and format text
    const extractedText = result.pages
      .map(page => page.lines.map(line => line.content).join("\n"))
      .join("\n");

    console.log("✅ Extraction successful.");
    return extractedText;
  } catch (error) {
    console.error("❌ Error extracting text from PDF:", error);
    throw error;
  }
};

export const deleteBlob = async (containerName, blobName) => {
    try {
      console.log(`🚀 Deleting blob: ${blobName} from container: ${containerName}`);
      
      const containerClient = blobServiceClient.getContainerClient(containerName);
      const blobClient = containerClient.getBlobClient(blobName);
      
      await blobClient.deleteIfExists();
      console.log(`✅ Blob deleted successfully: ${blobName}`);
    } catch (error) {
      console.error("❌ Error deleting blob:", error);
      throw new Error("Failed to delete blob from Azure");
    }
  };

// Export functions
export {
  getBlobURL,
  getUploadURL,
  extractTextFromPDF,

};

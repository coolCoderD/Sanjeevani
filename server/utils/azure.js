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


const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

const generateBlobSasToken = (containerName, blobName) => {
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  
  const sasOptions = {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("rw"), // 'r' (read-only access)
      expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour expiry
  };

  return generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
};

async function getBlobURL(blobName) {
  const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
  
  if (!process.env.AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is missing.");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  return blobClient.url;
}


const getUploadURL = async (blobName, expiryTime = 3600) => {
  try {
    const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
    const storageAccountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
    const blobServiceUrl = process.env.AZURE_BLOB_SERVICE_URL;  // New

    if (!containerName || !storageAccountName || !blobServiceUrl || !blobName) {
      throw new Error("❌ Missing environment variables: Check .env file.");
    }

    console.log("📌 Using Container:", containerName);
    console.log("📌 Blob Name:", blobName);
    console.log("📌 Blob Service URL:", blobServiceUrl);

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    const expiryDate = new Date();
    expiryDate.setSeconds(expiryDate.getSeconds() + expiryTime);

    const sasToken = generateBlobSasToken("medical-report", blobName);

    // return `${blobServiceUrl}/${containerName}/${blobName}?${sasToken}`;
    
    return `${blobClient.url}?${sasToken}`;
  } catch (error) {
    console.error("❌ Error generating SAS upload URL:", error);
    throw error;
  }
};



const extractTextFromPDF = async (blobName) => {
  try {
    const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
    console.log(`📄 Extracting text from PDF: ${blobName} in container: ${containerName}`);

    // Corrected Blob URL retrieval
    // const blobURL = `https://myblobstorage90.blob.core.windows.net/pdf-files/Reports/67db196b1ec10de398f4ca50_ddada_1742469383330.pdf?sv=2025-05-05&se=2025-03-20T12%3A16%3A23Z&sr=b&sp=rw&sig=%2FoXK80bE%2BzmSjTG%2BMdig2FjXR6aiQFGJvtvUyUUl6k8%3D`;
    const blobURL = await getUploadURL(blobName, 600);

    console.log(`🔗 Blob URL: ${blobURL}`);

    // Use beginAnalyzeDocumentFromUrl for URL-based analysis
    console.log(`🔍 Sending file to Azure Form Recognizer...`);
    const poller = await formRecognizerClient.beginAnalyzeDocumentFromUrl("prebuilt-document", blobURL);

    const result = await poller.pollUntilDone();

    if (!result || !result.pages) {
      throw new Error("❌ No text extracted. Check if the file is valid.");
    }

    const extractedText = result.pages.map(page =>
      page.lines.map(line => line.content).join("\n")
    ).join("\n");

    console.log("✅ Extraction successful.");
    return extractedText;
  } catch (error) {
    console.error("❌ Error extracting text from PDF:", error);
    throw error;
  }
};




export const deleteBlob = async ( blobName) => {
    try {
      const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
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

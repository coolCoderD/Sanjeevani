from flask import Blueprint, request, jsonify
from  src.controllers.report_controller import update_kb, embed_report, generalReportQuery, dateValQuery , dateValQueryDietPlan,generate_health_alerts

report_bp = Blueprint('report_bp', __name__)

@report_bp.route('/update_kb', methods=['POST'])
def reportsUpdate():    
    return update_kb()

@report_bp.route('/embed_report', methods=['POST'])
def reportsEmbed():
    return embed_report()

@report_bp.route('/generalReportQuery', methods=['POST'])
def reportQuery():    
    return generalReportQuery(request)

@report_bp.route('/dateValQuery', methods=['POST'])
def date_val_Query():    
    return dateValQuery()

@report_bp.route('/dietPlan', methods=['POST'])
def diet_plan():    
    return dateValQueryDietPlan()

@report_bp.route('/healthAlerts', methods=['POST'])
def health_alerts():
    try:
        patient_details = request.json  # Extract JSON data from request
        if not patient_details:
            return jsonify({"error": "Missing patient details"}), 400

        alerts = generate_health_alerts(patient_details)  # Pass patient_details
        return jsonify(alerts)  # Return JSON response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

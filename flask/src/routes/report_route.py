from flask import Blueprint, request
from  src.controllers.report_controller import update_kb, embed_report, generalReportQuery, dateValQuery , generate_diet_plan

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

@report_bp.route('/diet_plan', methods=['GET'])
def diet_plan():    
    return generate_diet_plan()
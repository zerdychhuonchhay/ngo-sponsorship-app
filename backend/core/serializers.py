from rest_framework import serializers
from .models import School, Student, AcademicReport, FollowUpRecord, Transaction, GovernmentFiling

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class AcademicReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicReport
        fields = '__all__'

class FollowUpRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowUpRecord
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class GovernmentFilingSerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentFiling
        fields = '__all__'

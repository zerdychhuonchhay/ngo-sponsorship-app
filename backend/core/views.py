from rest_framework import viewsets
from .models import School, Student, AcademicReport, FollowUpRecord, Transaction, GovernmentFiling
from .serializers import (
    SchoolSerializer,
    StudentSerializer,
    AcademicReportSerializer,
    FollowUpRecordSerializer,
    TransactionSerializer,
    GovernmentFilingSerializer
)

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class AcademicReportViewSet(viewsets.ModelViewSet):
    queryset = AcademicReport.objects.all()
    serializer_class = AcademicReportSerializer

class FollowUpRecordViewSet(viewsets.ModelViewSet):
    queryset = FollowUpRecord.objects.all()
    serializer_class = FollowUpRecordSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class GovernmentFilingViewSet(viewsets.ModelViewSet):
    queryset = GovernmentFiling.objects.all()
    serializer_class = GovernmentFilingSerializer

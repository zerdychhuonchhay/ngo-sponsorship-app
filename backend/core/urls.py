from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SchoolViewSet,
    StudentViewSet,
    AcademicReportViewSet,
    FollowUpRecordViewSet,
    TransactionViewSet,
    GovernmentFilingViewSet
)

router = DefaultRouter()
router.register(r'schools', SchoolViewSet)
router.register(r'students', StudentViewSet)
router.register(r'academic-reports', AcademicReportViewSet)
router.register(r'follow-up-records', FollowUpRecordViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'government-filings', GovernmentFilingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

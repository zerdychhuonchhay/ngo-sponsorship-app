from django.db import models

# =============================================================================
# Core Student & School Models
# =============================================================================

class School(models.Model):
    """Represents a school that students can be associated with."""
    name = models.CharField(max_length=255, help_text="The name of the school")
    location = models.CharField(max_length=255, blank=True, help_text="The general location of the school")

    def __str__(self):
        return self.name

class Student(models.Model):
    """The core model for storing all student information."""
    
    # --- Status Choices ---
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    STUDENT_STATUS_CHOICES = [
        ('Pending Qualification', 'Pending Qualification'),
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
    ]
    SPONSORSHIP_STATUS_CHOICES = [
        ('Sponsored', 'Sponsored'),
        ('Unsponsored', 'Unsponsored'),
    ]

    # --- Core Information ---
    student_id = models.CharField(max_length=50, unique=True, help_text="A unique ID for each student (e.g., CPB00002)")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True, help_text="A file upload for the student's photo")
    
    # --- Program & Schooling ---
    school = models.ForeignKey(School, on_delete=models.SET_NULL, null=True, blank=True, help_text="The school the student is associated with")
    current_grade = models.CharField(max_length=50, help_text="The student's current grade or university year")
    eep_enroll_date = models.DateField(help_text="The date the student enrolled in the program")
    out_of_program_date = models.DateField(blank=True, null=True, help_text="The date the student left the program (can be blank)")
    student_status = models.CharField(max_length=50, choices=STUDENT_STATUS_CHOICES, default='Pending Qualification')
    
    # --- Sponsorship Details ---
    sponsorship_status = models.CharField(max_length=50, choices=SPONSORSHIP_STATUS_CHOICES, default='Unsponsored')
    has_housing_sponsorship = models.BooleanField(default=False)
    sponsor_name = models.CharField(max_length=255, blank=True, help_text="The name of the student's sponsor")
    
    # --- Guardian & Location ---
    guardian_name = models.CharField(max_length=255, help_text="The name(s) of the parent or guardian")
    guardian_contact_info = models.TextField(blank=True)
    home_location = models.CharField(max_length=255, help_text="The home location or slum area of the student")

    # --- Document Checklist ---
    has_birth_certificate = models.BooleanField(default=False)
    has_sponsorship_contract = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.student_id})"

# =============================================================================
# Historical Record Models (Linked to Student)
# =============================================================================

class AcademicReport(models.Model):
    """Stores academic reports for a student over time."""
    PASS_FAIL_CHOICES = [
        ('Pass', 'Pass'),
        ('Fail', 'Fail'),
    ]
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='academic_reports')
    report_period = models.CharField(max_length=100, help_text='The period the report covers (e.g., "Q1 2025")')
    grade_level = models.CharField(max_length=50, help_text="The student's grade level at the time of the report")
    subjects_and_grades = models.TextField(help_text="A text field to list subjects and grades")
    overall_average = models.FloatField(blank=True, null=True, help_text="The overall grade average for the period")
    pass_fail_status = models.CharField(max_length=10, choices=PASS_FAIL_CHOICES)
    teacher_comments = models.TextField(blank=True)

    def __str__(self):
        return f"Report for {self.student.first_name} - {self.report_period}"

class FollowUpRecord(models.Model):
    """Stores records from follow-up visits with a student."""
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='follow_up_records')
    date_of_follow_up = models.DateField()
    location_of_follow_up = models.CharField(max_length=255)
    health_status_notes = models.TextField(help_text="Notes on the student's health, social, and home life status")
    risk_factors = models.TextField(blank=True, help_text="A text field for a checklist of specific risk factors")
    parent_work_status = models.CharField(max_length=255)
    hygiene_products_provided = models.BooleanField(default=False)
    staff_notes = models.TextField(blank=True, help_text="A text field for staff notes, recommendations, and protection concerns")
    completed_by = models.CharField(max_length=100)
    reviewed_by = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Follow-up for {self.student.first_name} on {self.date_of_follow_up}"

# =============================================================================
# Financial and Compliance Models
# =============================================================================

class Transaction(models.Model):
    """Represents a single financial transaction (income or expense)."""
    TRANSACTION_TYPE_CHOICES = [
        ('Income', 'Income'),
        ('Expense', 'Expense'),
    ]
    date = models.DateField()
    description = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=TRANSACTION_TYPE_CHOICES)
    category = models.CharField(max_length=100, help_text="e.g., School Fees, Hot Lunches, Gas")
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, blank=True, help_text="An optional link to the student associated with this transaction")

    def __str__(self):
        return f"{self.type}: {self.description} - ${self.amount}"

class GovernmentFiling(models.Model):
    """Tracks government and compliance documents and deadlines."""
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Submitted', 'Submitted'),
        ('Approved', 'Approved'),
    ]
    document_name = models.CharField(max_length=255)
    authority = models.CharField(max_length=255, help_text="e.g., Ministry of Education")
    due_date = models.DateField()
    submission_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    attached_file = models.FileField(upload_to='filings/', blank=True, null=True, help_text="A file upload for a copy of the submitted document")

    def __str__(self):
        return f"{self.document_name} ({self.status})"


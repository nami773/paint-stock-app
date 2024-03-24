from django.conf import settings
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Paint(models.Model):
    OUT = "OUT"
    LOW = "LOW"
    AVAILABLE = "AVL"
    STATUS_CHOICES = {OUT: "Out Of Stock", LOW: "Running Low", AVAILABLE: "Available"}
    colour = models.CharField(max_length=128)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default=OUT)
    updated_at = models.DateTimeField(default=timezone.now)
    updated_by = models.ForeignKey(User, models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return f"{self.colour}: {self.status}"

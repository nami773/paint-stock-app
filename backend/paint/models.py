from django.conf import settings
from django.db import models


class Paint(models.Model):
    OUT = "OUT"
    LOW = "LOW"
    AVAILABLE = "AVL"
    STATUS_CHOICES = {OUT: "Out Of Stock", LOW: "Running Low", AVAILABLE: "Available"}
    colour = models.CharField(max_length=128)
    status = models.CharField(max_length=3, choices=STATUS_CHOICES, default=OUT)
    rgb = models.CharField(max_length=128)

    def __str__(self):
        return f"{self.colour}: {self.status}"

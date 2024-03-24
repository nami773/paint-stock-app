from django.contrib.auth.models import User
from paint.models import Paint
from rest_framework import serializers, mixins, viewsets


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "url",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "groups",
        ]


# Restrict to view, update/edit, disable/enable operations
class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = User.objects.all().order_by("username")
    serializer_class = UserSerializer


class PaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paint
        fields = ["url", "colour", "status"]
        read_only_fields = ["colour"]


# Restrict to view, update/edit operations
class PaintViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Paint.objects.all()
    serializer_class = PaintSerializer

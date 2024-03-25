from django.contrib.auth.models import User, Group
from paint.models import Paint
from rest_framework import serializers, mixins, viewsets
from datetime import datetime


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


# Restirct to Read-Only
class GroupViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Group.objects.all().order_by("id")
    serializer_class = GroupSerializer


class UserSerializer(serializers.ModelSerializer):
    group_names = serializers.SerializerMethodField("get_group_names")

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "groups",
            "group_names",
        ]

    # return id and names so FE can show role names
    def get_group_names(self, obj):
        group_name_list = [
            {"id": group.id, "name": group.name} for group in obj.groups.all()
        ]
        return group_name_list


# Restrict to view, update/edit, disable/enable operations
class UserViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    # exclude superuser and default user
    queryset = User.objects.filter(is_superuser=False).exclude(username="default").order_by("username")
    serializer_class = UserSerializer


class PaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paint
        fields = ["id", "colour", "status", "rgb"]
        read_only_fields = ["id", "colour", "rgb"]


# Restrict to view, update/edit operations
class PaintViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Paint.objects.all()
    serializer_class = PaintSerializer

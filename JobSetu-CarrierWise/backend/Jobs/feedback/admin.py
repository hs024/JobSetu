from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_username', 'user_id', 'rating', 'text_short', 'created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('text', 'user__username')

    def user_username(self, obj):
        return obj.user.username
    user_username.short_description = 'Username'

    def user_id(self, obj):
        return obj.user.id
    user_id.short_description = 'User ID'

    def text_short(self, obj):
        return (obj.text[:50] + '...') if len(obj.text) > 50 else obj.text
    text_short.short_description = 'Feedback Text'

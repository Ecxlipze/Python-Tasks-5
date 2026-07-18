from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.jobs.urls")),
    path("api/v1/", include("apps.candidates.urls")),
    path("api/v1/", include("apps.jobs.urls")),
    path("api/v1/", include("apps.candidates.urls")),
    path("api/v1/", include("apps.resumes.urls")),
    path("api/v1/", include("apps.analysis.urls")),
    path(
        "api/v1/auth/login/",
        TokenObtainPairView.as_view(),
    ),
    path(
        "api/v1/auth/refresh/",
        TokenRefreshView.as_view(),
    ),
    path("api/v1/auth/", include("apps.accounts.urls")),
    
]
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT,
    )
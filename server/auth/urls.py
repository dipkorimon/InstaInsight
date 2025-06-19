from django.urls import path

from auth.views import RegisterView, LoginView, LogoutView, RequestPasswordResetView, ConfirmPasswordResetView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('password-reset/', RequestPasswordResetView.as_view(), name='password_reset'),
    path('password-reset-confirm/', ConfirmPasswordResetView.as_view(), name='password_reset_confirm'),
]

from django.urls import path
from kfc import views

app_name = 'kfc'

urlpatterns = [
    path('get_categories/', views.get_categories),
    path('category_items/<int:category_id>/', views.category_items),
    path('item_images/<int:item_id>/', views.item_images),
    path('dish_items/<int:dish_id>/', views.dish_items),
    path('get_deals/', views.get_deals),
    path('register/', views.register),
    path('current_user/', views.current_user),
    path('order/', views.order),
]

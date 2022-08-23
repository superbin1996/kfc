from django.urls import path, include
from capstone import views

app_name = 'capstone'

urlpatterns = [
    path('get_categories', views.get_categories),
    path('category_items/<int:category_id>', views.category_items),
    path('item_images/<int:item_id>', views.item_images),
    path('dish_items/<int:dish_id>', views.dish_items),
    path('get_deals', views.get_deals),
    path('register', views.register),
    path('current_user', views.current_user),
    # path('login', views.login),
    # path('logout/blacklist', views.BlacklistTokenView.as_view())
    path('order', views.order),
]

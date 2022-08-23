from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Category, Item, Picture, Dish, Voucher, Order, Selection, Deal


class UserAdmin(UserAdmin):
    list_display = ("id", "username")


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("id", "field")


class PictureAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category")


class ItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price')


class SelectionAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'default')


class DishAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price')


class VoucherAdmin(admin.ModelAdmin):
    list_display = ('name', 'discount')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'order_id', 'user', 'dish', 'amount',
                    'timestamp', 'discount', 'price')


class DealAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'dish', 'start', 'end')


# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Selection, SelectionAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Picture, PictureAdmin)
admin.site.register(Voucher, VoucherAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Deal, DealAdmin)

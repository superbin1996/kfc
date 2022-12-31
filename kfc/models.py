from django.db import models
# from django.conf import settings
from django.contrib.auth.models import AbstractUser
# from django.utils import timezone
from datetime import datetime
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  """
  Create token for created user
  """
  if created:
    Token.objects.create(user=instance)

class User(AbstractUser):
    pass


class Category(models.Model):
    field = models.CharField(max_length=100)
    image = models.ImageField(
        default='default/imagenotfound.png', upload_to='singleItemsCategory/')
    image_url = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.id}, {self.field}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.image_url = self.image.url
        super().save(*args, **kwargs)


class Picture(models.Model):

    name = models.CharField(max_length=300)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='pictures')
    image = models.ImageField(
        default='default/imagenotfound.png', upload_to='dishes/')
    image_url = models.TextField(null=True, blank=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return f"{self.id}, name: {self.name}, category: {self.category}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.image_url = self.image.url
        super().save(*args, **kwargs)


class Item(models.Model):
    name = models.CharField(max_length=300)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='items')
    # type = models.CharField(max_length=100, blank=True)
    price = models.IntegerField()
    image = models.ForeignKey(
        Picture, on_delete=models.SET_NULL, null=True, blank=True, related_name='items')
    image_url = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.id}, name: {self.name}, price: {self.price}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.image_url = self.image.url
        super().save(*args, **kwargs)


class Selection(models.Model):
    name = models.CharField(max_length=300)
    default = models.ForeignKey(
        Item, on_delete=models.CASCADE, related_name='replacedItem')
    choices = models.ManyToManyField(
        Item, blank=True, related_name='choices')
    amount = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.id}, name: {self.name}, item: {self.default}"


class Dish(models.Model):
    name = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='dishes')
    single_items = models.ManyToManyField(
        Item, blank=True, related_name='dishSingleItems')
    selections = models.ManyToManyField(
        Selection, blank=True, related_name='dishSelections')
    images = models.ManyToManyField(
        Picture, blank=True, related_name='dishes')
    image_url = models.TextField(null=True, blank=True)
    price = models.IntegerField()

    def __str__(self):
        return f"{self.id}, name: {self.name}, category: {self.category}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.image_url = self.image.url
        super().save(*args, **kwargs)


class Voucher(models.Model):
    name = models.CharField(max_length=300)
    discount = models.FloatField()

    def __str__(self):
        return f"id: {self.id}, name: {self.name}, discount: {self.discount}"


class Order(models.Model):
    order_id = models.IntegerField()
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='orders')
    dish = models.ForeignKey(
        Dish, on_delete=models.SET_NULL, null=True, related_name='orders')
    details = models.JSONField(null=True)
    orders = models.JSONField(null=True)
    amount = models.IntegerField(default=1)
    timestamp = models.DateTimeField(auto_now_add=True)
    discount = models.ForeignKey(
        Voucher, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    price = models.IntegerField()

    def __str__(self):
        return f"id: {self.id}, order_id: {self.order_id}, user: {self.user}, dish: {self.dish}, amount: {self.amount}"


class Deal(models.Model):
    title = models.CharField(max_length=300)
    image = models.ImageField(
        default='default/imagenotfound.png', upload_to='deals/')
    image_url = models.TextField(null=True, blank=True)
    description = models.TextField(blank=True)
    dish = models.ForeignKey(
        Dish, on_delete=models.CASCADE)
    start = models.DateTimeField(default=datetime.now)
    end = models.DateTimeField(default=datetime.now)
    hashtag = models.CharField(max_length=300, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.image_url = self.image.url
        super().save(*args, **kwargs)

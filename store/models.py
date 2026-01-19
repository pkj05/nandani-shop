from django.db import models

# Create your models here.
class Product(models.Model):
    CATEGORY_CHOICES = [('Party', 'Party Wear'), ('Daily', 'Daily Wear'), ('Cotton', 'Cotton Suits'),]
    name = models.CharField(max_length=200)
    price =  models.IntegerField()
    description = models.TextField()
    stock = models.IntegerField(default=1)  
    image = models.ImageField(upload_to='uploads/products/')  
    category = models.CharField(max_length=50, choices = CATEGORY_CHOICES, default='Daily')
    is_sold = models.BooleanField(default=False)
    def __str__(self):
        return self.name


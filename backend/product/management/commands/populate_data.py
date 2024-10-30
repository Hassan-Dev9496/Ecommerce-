from django.core.management.base import BaseCommand
from product.models import Shirt, Size, Image

class Command(BaseCommand):
    help = 'Populate the database with initial shirt data'

    def handle(self, *args, **kwargs):
        products = [
            {
                "title": "Barca 2015 Final Messi Shirt",
                "actual_prize": "2500",
                "sale_prize": "2000", 
                "category": "shirt",
                "size": [
                    {"name": "small", "quantity": "5"},
                    {"name": "medium", "quantity": "10"},
                    {"name": "large", "quantity": "2"}
                ],
                "images": [
                    {"img": "/Images/barca-15-1.png"}, 
                    {"img": "/Images/barca-15-2.png"}, 
                ]
            },
              {
                "title": "Barca Trouser",
                "actual_prize": "2500",
                "sale_prize": "2000", 
                "category": "trouser",
                "size": [
                    {"name": "small", "quantity": "5"},
                    {"name": "medium", "quantity": "10"},
                    {"name": "large", "quantity": "2"}
                ],
                "images": [
                    {"img": "/Images/barca-15-1.png"}, 
                    {"img": "/Images/barca-15-2.png"}, 
                ]
            }
        ]

        for shirt_data in products:
            shirt, created = Shirt.objects.get_or_create(
                title=shirt_data['title'],
                defaults={
                    'actual_prize': shirt_data['actual_prize'],
                    'sale_prize': shirt_data['sale_prize'],
                    'category': shirt_data['category']
                }
            )

            if created:
                self.stdout.write(f"Created new shirt: {shirt.title}")
            else:
                self.stdout.write(f"Shirt already exists: {shirt.title}")

  
            for size_data in shirt_data['size']:
                Size.objects.get_or_create(
                    shirt=shirt,
                    name=size_data['name'],
                    defaults={'quantity': size_data['quantity']}
                )


            for image_data in shirt_data['images']:
                Image.objects.get_or_create(
                    shirt=shirt,
                    img=image_data['img']
                )

        self.stdout.write(self.style.SUCCESS('Database populated successfully without duplicates!'))

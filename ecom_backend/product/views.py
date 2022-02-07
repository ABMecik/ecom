from itertools import product
from urllib import response
from django.db.models import Q
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import status, authentication, permissions
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from .models import Product, Category
from django.contrib.auth.models import User
from .serializers import ProductSerializer, CategorySerializer, CategoryListSerializer

class LatestProducts(APIView):
    def get(self, request, format=None):
        products = Product.objects.all()[0:4]
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
class ProductDetail(APIView):
    def get_object(self, product_id):
        try:
            return Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise Http404
        
    def get(self, request, product_id, format=None):
        product = self.get_object(product_id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

class CategoryDetail(APIView):
    def get_object(self, category_id):
        try:
            return Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            raise Http404
    
    def get(self, request, category_id, format=None):
        category = self.get_object(category_id)
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    
class GetAllCategories(APIView):
    def get(self, request, format=None):
        categories = Category.objects.all()
        serializer = CategoryListSerializer(categories, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])    
def myFavorites(request):
    user = request.user
    products = Product.objects.filter(picker=user)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])    
def addToFavorites(request):
    productId = request.data.get('productId', '')
    user = request.user
    product = Product.objects.get(id=productId)
    product.picker.add(user)
    product.save()
    return Response()
    
@api_view(['POST']) 
@authentication_classes([authentication.TokenAuthentication])
@permission_classes([permissions.IsAuthenticated])   
def removeFromFavorites(request):
    productId = request.data.get('productId', '')
    user = request.user
    product = Product.objects.get(id=productId)
    product.picker.remove(user)
    product.save()
    return Response()
    
    
@api_view(['POST'])
def search(request):
    query = request.data.get('query', '')
    if query:
        products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query))
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    else:
        return Response({"products": []})
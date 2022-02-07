from django.urls import path, include

from product import views

urlpatterns = [
    path('latest-products/', views.LatestProducts.as_view()),
    path('products/<int:product_id>', views.ProductDetail.as_view()),
    path('products/search/', views.search),
    path('categories/<int:category_id>/', views.CategoryDetail.as_view()),
    path('getAllCategories/', views.GetAllCategories.as_view()),
    path('myFavorites/', views.myFavorites),
    path('addToFavorites/', views.addToFavorites),
    path('removeFromFavorites/', views.removeFromFavorites),
]

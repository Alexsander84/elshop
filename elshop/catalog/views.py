from django.http import HttpResponse
from django.shortcuts import render
from .models import *

import json
from django.core.serializers import serialize


def index(request):
    categories = Category.objects.all()
    context = {'categories': categories}
    return render(request, 'catalog/index.html', context)


def detail_products(request, category):
    products_list = Product.objects.filter(category__slug=category)
    context = {'products': products_list}
    return render(request, 'catalog/products.html', context)


def filter_view(request):
    category = request.GET['category']
    if request.GET['direction'] == 'up':
        products_list = Product.objects.filter(category__slug=category).order_by('-name')

    else:
        products_list = Product.objects.filter(category__slug=category).order_by('name')
    return HttpResponse(serialize('json', products_list))

from django.contrib import messages
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.urls import reverse

from categories.forms import CategoryEditForm
from .models import Category


# Create your views here.

def categories(request):
    categories_all = Category.objects.all()

    return render(request, 'categories/categories.html', {'categories_all': categories_all})


def add_category(request):
    if request.method == 'POST':
        category_type = request.POST.get('categoryType')
        name = request.POST.get('name')
        description = request.POST.get('description')

        category_type_id = 1 if category_type == 'expense' else 2

        new_category = Category(
            name=name,
            description=description,
            category_type_id=category_type_id
        )
        new_category.save()

        messages.success(request, f'категория: {new_category.name} - успешно добавлена')
        return HttpResponseRedirect(reverse('categories:categories'))

    return HttpResponse(status=400)


def edit_category(request, id_category):
    category = Category.objects.get(id=id_category)
    if request.method == 'POST':
        form = CategoryEditForm(request.POST, instance=category)
        if form.is_valid():
            form.save()
            messages.success(request, f'категория: {category.name} - успешно обновлена')
            return HttpResponseRedirect(reverse('categories:categories'))

    return HttpResponse(status=400)


def deleted_category(request, id_category):
    category = Category.objects.get(id=id_category)
    category_name = category.name
    category.delete()
    messages.success(request, f'категория: {category_name} - успешно удалена')

    return HttpResponseRedirect(reverse('categories:categories'))


//  ФУНКЦИИ ДЛЯ УПРАВЛЕНИЯ КАТЕГОРИЯМИ МОДАЛЬНОГО ОКНА

// Получаем элементы модального окна и кнопки
var modal = document.getElementById("addCategoryModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeBtns = document.querySelectorAll(".close, .close-modal");

// Открываем модальное окно при нажатии кнопки
openModalBtn.onclick = function () {
    modal.style.display = "block";
}

// Закрываем модальное окно при нажатии кнопок закрытия
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        modal.style.display = "none";
    }
});

// Закрываем модальное окно при нажатии вне его границ
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Этот код можно добавить, если хотите управлять классом скрытия
setTimeout(function() {
    var messageBox = document.getElementById("message-box");
    if (messageBox) {
        messageBox.style.display = 'none';
    }
}, 10000); // Скрыть через 10 секунд


// ФУНКЦИИ ДЛЯ ПЕРЕКЛЮЧЕНИЯ МЕЖДУ КАТЕГОРИЯМИ ДОХОДОВ И РАСХОДОВ В КАТЕГОРИЯХ

document.getElementById('expense-btn').onclick = function() {
    document.querySelector('.expense-categories').style.display = 'grid';
    document.querySelector('.income-categories').style.display = 'none';
    this.classList.add('active');
    document.getElementById('income-btn').classList.remove('active');
};

document.getElementById('income-btn').onclick = function() {
    document.querySelector('.income-categories').style.display = 'grid';
    document.querySelector('.expense-categories').style.display = 'none';
    this.classList.add('active');
    document.getElementById('expense-btn').classList.remove('active');
};

// Установите видимость для категорий расходов по умолчанию
document.querySelector('.expense-categories').style.display = 'grid';

// ФУНКЦИИ ДЛЯ КНОПКИ РЕДАКТИРОВАНИЯ И ИЗМЕНЕНИЯ ВИЗУАЛЬНОГО ОТОБРАЖЕНИЯ


function editCategory(button) {
    // Найдем родительский блок category-item
    var categoryItem = button.parentElement;

    // Скрываем текстовые элементы
    var titleElement = categoryItem.querySelector('.category-title');
    var descriptionElement = categoryItem.querySelector('.category-description');

    // Показываем поля ввода
    var titleInput = categoryItem.querySelector('.category-title-input');
    var descriptionInput = categoryItem.querySelector('.category-description-input');

    titleElement.style.display = 'none';
    descriptionElement.style.display = 'none';

    titleInput.style.display = 'block'; // Изменяем на block для отображения
    descriptionInput.style.display = 'block'; // Изменяем на block для отображения

    // Скрываем кнопки редактирования и статистики
    button.style.display = 'none'; // Скрыть текущую кнопку редактирования
    categoryItem.querySelector('.view-btn').style.display = 'none'; // Скрыть кнопку статистики

    // Показываем кнопки сохранить и отмена
    categoryItem.querySelector('.save-btn').style.display = 'inline'; // Показать кнопку сохранить
    categoryItem.querySelector('.cancel-btn').style.display = 'inline'; // Показать кнопку отмены

    // Показываем значок корзины
    var basketIcon = categoryItem.querySelector('.basket-icon');
    basketIcon.style.display = 'inline'; // Отображаем значок корзины
}

function saveCategory(button) {
    // Логика для сохранения
    var categoryItem = button.parentElement;
    var titleInput = categoryItem.querySelector('.category-title-input');
    var descriptionInput = categoryItem.querySelector('.category-description-input');

    // Обновляем текстовые элементы с новыми значениями
    categoryItem.querySelector('.category-title').textContent = titleInput.value;
    categoryItem.querySelector('.category-description').textContent = descriptionInput.value;

    // Скрываем поля ввода
    titleInput.style.display = 'none';
    descriptionInput.style.display = 'none';

    // Показываем текстовые элементы
    categoryItem.querySelector('.category-title').style.display = 'inline'; // Отобразить название
    categoryItem.querySelector('.category-description').style.display = 'block'; // Отобразить описание

    // Скрываем кнопки сохранить и отмена
    button.style.display = 'none'; // Скрыть кнопку сохранить
    categoryItem.querySelector('.cancel-btn').style.display = 'none'; // Скрыть кнопку отмены

    // Показываем кнопки редактирования и статистики
    categoryItem.querySelector('.edit-btn').style.display = 'inline'; // Показать кнопку редактирования
    categoryItem.querySelector('.view-btn').style.display = 'inline'; // Показать кнопку статистики

    categoryItem.querySelector('.basket-icon').style.display = 'none';
}

function cancelEdit(button) {
    // Найдем родительский блок category-item
    var categoryItem = button.parentElement;

    // Скрываем поля ввода
    var titleInput = categoryItem.querySelector('.category-title-input');
    var descriptionInput = categoryItem.querySelector('.category-description-input');

    titleInput.style.display = 'none'; // Скрыть поле ввода названия
    descriptionInput.style.display = 'none'; // Скрыть поле ввода описания

    // Покажем текстовые элементы
    categoryItem.querySelector('.category-title').style.display = 'inline'; // Отобразить название
    categoryItem.querySelector('.category-description').style.display = 'block'; // Отобразить описание

    // Скрываем кнопки сохранить и отмена
    button.style.display = 'none'; // Скрыть кнопку отмены
    categoryItem.querySelector('.save-btn').style.display = 'none'; // Скрыть кнопку сохранить

    // Показываем кнопки редактирования и статистики
    categoryItem.querySelector('.edit-btn').style.display = 'inline'; // Показать кнопку редактирования
    categoryItem.querySelector('.view-btn').style.display = 'inline'; // Показать кнопку статистики

    categoryItem.querySelector('.basket-icon').style.display = 'none';
}


// ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ И ЗАКРЫТИЯ МОДАЛЬНОГО ОКНА СТАТИСТИКИ КАТЕГОРИИ

function viewCategory(button) {
    // Получаем родительский элемент category-item
    var categoryItem = button.closest('.category-item');

    // Получаем название категории из текста
    var categoryTitle = categoryItem.querySelector('.category-title').textContent;

    // Устанавливаем название в заголовок модального окна
    document.getElementById('modal-title').textContent = 'Статистика категории: ' + categoryTitle;

    // Устанавливаем сумму затрат, здесь можно использовать динамическое значение
    document.getElementById('monthly-expense').textContent = '5000'; // Пример значения

    // Показываем модальное окно
    document.getElementById('statisticsModal').style.display = 'flex'; // Показываем окно
}

// Закрытие модального окна
document.querySelector('.close-statistics-modal').onclick = function() {
    document.getElementById('statisticsModal').style.display = 'none';
};

// Закрытие при клике вне модального окна
window.onclick = function(event) {
    var modal = document.getElementById('statisticsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

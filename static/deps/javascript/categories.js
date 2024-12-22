//  ФУНКЦИИ ДЛЯ УПРАВЛЕНИЯ КАТЕГОРИЯМИ МОДАЛЬНОГО ОКНА

// Получаем элементы модального окна и кнопки
// Получаем элементы модальных окон
var addCategoryModal = document.getElementById("addCategoryModal");
var confirmDeleteModal = document.getElementById("confirmDeleteModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeBtns = document.querySelectorAll(".close, .close-modal");

// Открываем модальное окно при нажатии кнопки
openModalBtn.onclick = function () {
    addCategoryModal.style.display = "block";
}

// Закрываем модальное окно при нажатии кнопок закрытия
closeBtns.forEach(function (btn) {
    btn.onclick = function () {
        addCategoryModal.style.display = "none";
    }
});

// Закрываем модальное окно подтверждения удаления
document.querySelector(".confirm-close").onclick = function () {
    closeModal();
};

// Закрываем модальное окно при нажатии вне его границ
window.onclick = function (event) {
    if (event.target === addCategoryModal) {
        addCategoryModal.style.display = "none";
    } else if (event.target === confirmDeleteModal) {
        closeModal();
    }
}

// Этот код можно добавить, если хотите управлять классом скрытия
setTimeout(function() {
    var messageBox = document.getElementById("message-box");
    if (messageBox) {
        messageBox.style.display = 'none';
    }
}, 10000); // Скрыть через 10 секунд



// ФУНКЦИИ ЗАКРИТИЯ И ОТКРЫТИЯ МОДАЛЬНОГООКНА ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАТЕГОРИИ

function openDeleteModal(action) {
    confirmDeleteModal.style.display = 'block';
    document.getElementById('deleteForm').action = action;
}

function closeModal() {
    confirmDeleteModal.style.display = 'none';
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
        var categoryItem = button.closest('.category-item');
        categoryItem.querySelector('.category-title').style.display = 'none';
        categoryItem.querySelector('.category-description').style.display = 'none';
        categoryItem.querySelector('.edit-form').style.display = 'block';

        button.style.display = 'none';
        categoryItem.querySelector('.view-btn').style.display = 'none';

        // Отображение кнопок "Сохранить" и "Отмена"
        categoryItem.querySelector('.save-btn').style.display = 'inline';
        categoryItem.querySelector('.cancel-btn').style.display = 'inline';
    }

    function cancelEdit(button) {
        var categoryItem = button.closest('.category-item');
        categoryItem.querySelector('.category-title').style.display = 'inline';
        categoryItem.querySelector('.category-description').style.display = 'block';
        categoryItem.querySelector('.edit-form').style.display = 'none';

        button.style.display = 'none';
        categoryItem.querySelector('.save-btn').style.display = 'none';
        categoryItem.querySelector('.edit-btn').style.display = 'inline';
        categoryItem.querySelector('.view-btn').style.display = 'inline';
    }

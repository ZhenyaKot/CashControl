let transactions = [];
let currentTransactionType = 'expense'; // По умолчанию 'расход'

// Функция для отображения модального окна
function showAddTransactionForm() {
    document.getElementById('modal').style.display = 'block';
    selectTransactionType(currentTransactionType); // Устанавливаем тип транзакции
}

// Функция для скрытия модального окна
function hideAddTransactionForm() {
    document.getElementById('modal').style.display = 'none';
    clearTransactionForm();
}

// Функция для выбора типа транзакции
function selectTransactionType(type) {
    currentTransactionType = type;
    const header = document.getElementById('transaction-type-header');
    const expenseTab = document.getElementById('expense-tab');
    const incomeTab = document.getElementById('income-tab');
    const expenseContent = document.getElementById('expense');
    const incomeContent = document.getElementById('income');

    // Обновляем заголовок
    if (type === 'expense') {
        header.innerText = 'Добавить расход';
        expenseTab.classList.add('active');
        incomeTab.classList.remove('active');
        expenseContent.style.display = 'block';  // Показываем форму расхода
        incomeContent.style.display = 'none';     // Скрываем форму дохода
    } else {
        header.innerText = 'Добавить доход';
        incomeTab.classList.add('active');
        expenseTab.classList.remove('active');
        incomeContent.style.display = 'block';    // Показываем форму дохода
        expenseContent.style.display = 'none';     // Скрываем форму расхода
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = today.toLocaleDateString('en-CA', options); // Формат: YYYY-MM-DD (Канада)
    document.getElementById('transaction_date').value = formattedDate;

    const formattedIncomeDate = today.toLocaleDateString('en-CA', options);
    document.getElementById('income_transaction_date').value = formattedIncomeDate;
});

setTimeout(function() {
    var messageBox = document.getElementById("message-box");
    if (messageBox) {
        messageBox.style.display = 'none';
    }
}, 10000); // Скрыть через 10 секунд




// ОКНО ОТКРЫТИЯ ВЫБОРА ВАРИАНТОВ СОРТИРОВКИ
function toggleSortOptions() {
    const sortOptions = document.getElementById('sort-options');
    if (sortOptions.style.display === 'none') {
        sortOptions.style.display = 'block'; // Показываем меню
    } else {
        sortOptions.style.display = 'none'; // Скрываем меню
    }
}

// КОД ДЛЯ СОРТИРОВКИ ТРАНЗАКЦИЯ С ПОМОЩЬЮ AJAX
function sortTransactions(order) {
    const transactionType = document.getElementById('filter-transaction-type').value;
    const startDate = document.getElementById('filter-start-date').value;
    const endDate = document.getElementById('filter-end-date').value;
    const amountFrom = document.getElementById('filter-amount-from').value;
    const amountTo = document.getElementById('filter-amount-to').value;

    const url = `${window.location.origin}/transactions/filter-sort-transactions/?transactions_type=${transactionType}&start_date=${startDate}&end_date=${endDate}&amount_from=${amountFrom}&amount_to=${amountTo}&sort_order=${order}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => {
        console.log(response); // Логируем ответ
        return response.json();
    })
    .then(data => {
        if (data.html) {
            document.getElementById('transactions-list').innerHTML = data.html;

            // Удаляем класс active у всех кнопок сортировки
            const sortButtons = document.querySelectorAll('.sort-options button');
            sortButtons.forEach(button => {
                button.classList.remove('active');
            });

            // Добавляем класс active выбранной кнопке
            if (order === 'asc') {
                const activeButton = Array.from(sortButtons).find(button => {
                    return button.textContent.trim() === "От ранней к поздней";
                });
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            } else {
                const activeButton = Array.from(sortButtons).find(button => {
                    return button.textContent.trim() === "От поздней к ранней";
                });
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }

            // Скрываем меню сортировки после выбора метода
            document.getElementById('sort-options').style.display = 'none';
        } else {
            console.error('Ошибка получения данных:', data.error);
        }
    })
    .catch(error => console.error('Ошибка:', error));
}


// ФУНКЦИЯЯ ОТКЫТИЯ И ЗАКРЫТИЯ ОКНА ФИЛЬТРАЦИИ

function toggleFilterModal() {
    const modal = document.getElementById('filterModal');
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block'; // Показываем модальное окно
    } else {
        modal.style.display = 'none'; // Скрываем модальное окно
    }
}

// Закрытие модального окна по клику вне окна
window.onclick = function(event) {
    const modal = document.getElementById('filterModal');
    if (event.target === modal) {
        toggleFilterModal();
    }
};


// КОД ДЛЯ ФИЛЬТРАЦИИ ТРАНЗАКЦИЙ С ПОМОЩЬЮ AJAX

function applyFilters() {
    const transactionType = document.getElementById('filter-transaction-type').value;
    const startDate = document.getElementById('filter-start-date').value;
    const endDate = document.getElementById('filter-end-date').value;
    const amountFrom = document.getElementById('filter-amount-from').value;
    const amountTo = document.getElementById('filter-amount-to').value;

    const url = `${window.location.origin}/transactions/filter-sort-transactions/?transactions_type=${transactionType}&start_date=${startDate}&end_date=${endDate}&amount_from=${amountFrom}&amount_to=${amountTo}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.html) {
            document.getElementById('transactions-list').innerHTML = data.html;
            toggleFilterModal(); // Закрываем модальное окно после применения фильтров
        } else {
            console.error('Ошибка получения данных:', data.error);
        }
    })
    .catch(error => console.error('Ошибка:', error));
}


// КНОПКА СБРОСА ФИЛЬТРОВ
function clearFilters() {
    // Установите значения фильтров по умолчанию
    document.getElementById('filter-transaction-type').value = 'all_type';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';
    document.getElementById('filter-amount-from').value = '';
    document.getElementById('filter-amount-to').value = '';

    // После сброса примените фильтры
    applyFilters();
}


function setDatesFromPeriodAndToggle() {
    const timePeriod = document.getElementById('filter-time-period').value;

    // Отправляем AJAX запрос к серверу для получения значений дат
    fetch(`/transactions/get-dates-for-period/?time_period=${timePeriod}`, {
    method: 'GET',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Сетевой ответ не в порядке');
        }
        return response.json();
    })
    .then(data => {
        console.log("Полученные данные:", data); // Отладка
        // Устанавливаем значения в поля даты на основе ответа сервера
        document.getElementById('filter-start-date').value = data.start_date;
        document.getElementById('filter-end-date').value = data.end_date;

        // Открываем модальное окно
        toggleFilterModal();
    })
    .catch(error => console.error('Ошибка:', error));
}

// Функция для форматирования даты в формате YYYY-MM-DD (можно убрать, если используется только сервер)
function formatDate(date) {
    if (!(date instanceof Date)) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}



// ФУНКЦИИ ДЛЯ УДАЛЕНИЯ ТРАНЗАКЦИИ

document.addEventListener('DOMContentLoaded', function() {
    const transactionsList = document.getElementById('transactions-list');

    // Обработчик клика на кнопки удаления
    transactionsList.addEventListener('click', function(event) {
        if (event.target.closest('.delete-transaction-button')) {
            const button = event.target.closest('.delete-transaction-button');
            const transactionId = button.getAttribute('data-id');
            openDeleteModal(transactionId);
        }
    });
});

function openDeleteModal(transactionId) {
    console.log("Opening delete modal for transaction ID:", transactionId); // Для отладки
    const modal = document.getElementById('confirmDeleteModal');
    modal.style.display = 'flex'; // Центрируем модал
    document.getElementById('confirmDeleteBtn').onclick = function() {
        console.log("Attempting to delete transaction with ID:", transactionId); // Для отладки
        deleteTransaction(transactionId);
    };
}

function closeModal() {
    document.getElementById('confirmDeleteModal').style.display = 'none';
}

function deleteTransaction(id) {
    const url = `${window.location.origin}/transactions/deleted-transactions/${id}/`; // Формируем URL
    fetch(url, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'), // Получите CSRF токен из cookie
        }
    })
    .then(response => {
        if (response.ok) { // Проверяем, что ответ успешный
            return response.json(); // Прочитаем JSON только если статус успешный
        } else {
            // Если статус не успешный, обрабатываем ошибку
            return response.json().then(data => {
                console.error('Error response:', data);
                throw new Error(data.message || 'Неизвестная ошибка.'); // Генерируем ошибку для блока catch
            });
        }
    })
    .then(data => {
        // Успешное удаление: удаляем элемент из интерфейса и показываем сообщение
        document.querySelector(`button[data-id="${id}"]`).closest('.transaction-item').remove();
        showMessage(data.message); // Показываем сообщение об успешном удалении
        closeModal(); // Закрываем модальное окно
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при удалении транзакции: ' + error.message);
    });
}

function showMessage(message) {
    const messageContainer = document.getElementById('message-container'); // Контейнер для сообщения
    const messageElement = document.createElement('div');
    messageElement.className = 'success-message'; // Название класса для стилей
    messageElement.innerText = message;

    // Добавляем сообщение в контейнер
    messageContainer.appendChild(messageElement);

    // Удаляем сообщение через 10 секунд
    setTimeout(() => {
        messageElement.remove(); // Удаляем элемент после анимации
    }, 5000);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


// КОД ДЛЯ РЕДАКТИРОВАНИЯ ТРАНЗАКЦИИ

document.addEventListener('DOMContentLoaded', function() {
    const transactionList = document.getElementById('transactions-list');

    // Получаем CSRF-токен из мета-тега
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Обработчик событий нажатия на кнопки
    transactionList.addEventListener('click', function(event) {
        // Проверка нажатия на кнопку редактирования
        const editButton = event.target.closest('.edit-transaction-button');
        if (editButton) {
            const transactionItem = editButton.closest('.transaction-item');
            const dateInput = transactionItem.querySelector('.transaction-date-input');
            const descriptionInput = transactionItem.querySelector('.transaction-description-input');
            const sumInput = transactionItem.querySelector('.transaction-sum-input');

            // Получаем текущее значение даты и форматируем его
            const currentDate = transactionItem.querySelector('.transaction-date').innerText;
            const [day, month, year] = currentDate.split('-');
            const formattedDate = `${year}-${month}-${day}`;
            dateInput.value = formattedDate;

            // Показываем поля для ввода
            dateInput.style.display = 'block';
            descriptionInput.style.display = 'block';
            sumInput.style.display = 'block';
            transactionItem.querySelector('.transaction-date').style.display = 'none';
            transactionItem.querySelector('.transaction-description').style.display = 'none';
            transactionItem.querySelector('.transaction-amount').style.display = 'none';

            // Скрываем кнопку редактирования и показываем кнопки "Сохранить" и "Отмена"
            editButton.style.display = 'none';
            transactionItem.querySelector('.delete-transaction-button').style.display = 'none';
            transactionItem.querySelector('.save-transaction-button').style.display = 'inline-block';
            transactionItem.querySelector('.cancel-transaction-button').style.display = 'inline-block';
        }

        // Проверка нажатия на кнопку "Сохранить"
        const saveButton = event.target.closest('.save-transaction-button');
        if (saveButton) {
            const transactionItem = saveButton.closest('.transaction-item');
            const dateInput = transactionItem.querySelector('.transaction-date-input');
            const descriptionInput = transactionItem.querySelector('.transaction-description-input');
            const sumInput = transactionItem.querySelector('.transaction-sum-input');

            // Получаем данные для отправки
            const transactionId = saveButton.dataset.id;
            const newDate = dateInput.value;
            const newDescription = descriptionInput.value;
            const newSum = sumInput.value;

            // Отправляем данные на сервер через AJAX (fetch)
            fetch(`edit_transaction/${transactionId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Добавление CSRF-токена
                },
                body: JSON.stringify({
                    date: newDate,
                    description: newDescription,
                    sum: newSum
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось обновить транзакцию');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    // Обновляем отображаемые элементы
                    transactionItem.querySelector('.transaction-date').innerText = newDate.split('-').reverse().join('-'); // Возвращаем в формат DD-MM-YYYY
                    transactionItem.querySelector('.transaction-description').innerText = newDescription;
                    transactionItem.querySelector('.transaction-sum').innerText = Math.abs(newSum);

                    // Скрываем поля ввода и показываем обновленные данные
                    dateInput.style.display = 'none';
                    descriptionInput.style.display = 'none';
                    sumInput.style.display = 'none';
                    transactionItem.querySelector('.transaction-date').style.display = 'block';
                    transactionItem.querySelector('.transaction-description').style.display = 'block';
                    transactionItem.querySelector('.transaction-amount').style.display = 'block';

                    // Скрываем кнопки "Сохранить" и "Отмена", показываем "Редактировать"
                    saveButton.style.display = 'none';
                    transactionItem.querySelector('.cancel-transaction-button').style.display = 'none';
                    transactionItem.querySelector('.edit-transaction-button').style.display = 'inline-block';
                    transactionItem.querySelector('.delete-transaction-button').style.display = 'inline-block';
                } else {
                    alert("Ошибка при обновлении транзакции: " + data.error);
                }
            })
            .catch(error => {
                alert("Ошибка при соединении с сервером: " + error.message);
            });
        }

        // Проверка нажатия на кнопку "Отмена"
        const cancelButton = event.target.closest('.cancel-transaction-button');
        if (cancelButton) {
            const transactionItem = cancelButton.closest('.transaction-item');
            const dateInput = transactionItem.querySelector('.transaction-date-input');
            const descriptionInput = transactionItem.querySelector('.transaction-description-input');
            const sumInput = transactionItem.querySelector('.transaction-sum-input');

            // Скрываем поля ввода
            dateInput.style.display = 'none';
            descriptionInput.style.display = 'none';
            sumInput.style.display = 'none';
            transactionItem.querySelector('.transaction-date').style.display = 'block';
            transactionItem.querySelector('.transaction-description').style.display = 'block';
            transactionItem.querySelector('.transaction-amount').style.display = 'block';

            // Возвращаем кнопки редактирования
            cancelButton.style.display = 'none';
            transactionItem.querySelector('.save-transaction-button').style.display = 'none';
            transactionItem.querySelector('.edit-transaction-button').style.display = 'inline-block';
            transactionItem.querySelector('.delete-transaction-button').style.display = 'inline-block';
        }
    });
});







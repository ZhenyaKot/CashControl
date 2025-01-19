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
    console.log(`Сортировка по: ${order}`);
    const url = `${window.location.origin}/transactions/sort-transactions/?order=${order}`;
    console.log(`URL запроса: ${url}`);

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



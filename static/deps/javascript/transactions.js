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

// Функция для очистки полей формы
function clearTransactionForm() {
    document.getElementById('transaction-date').value = '';
    document.getElementById('transaction-amount').value = '';
    document.getElementById('transaction-description').value = '';
    document.getElementById('transaction-category').value = 'food'; // Сброс категории
}

// Функция для выбора типа транзакции
function selectTransactionType(type) {
    currentTransactionType = type;
    const header = document.getElementById('transaction-type-header');
    const expenseTab = document.getElementById('expense-tab');
    const incomeTab = document.getElementById('income-tab');
    const categorySelect = document.getElementById('transaction-category');

    if (type === 'expense') {
        header.innerText = 'Добавить расход';
        categorySelect.style.display = 'block'; // Показываем выбор категории
        expenseTab.classList.add('active');
        incomeTab.classList.remove('active');
    } else {
        header.innerText = 'Добавить доход';
        categorySelect.style.display = 'block'; // Показываем выбор категории
        incomeTab.classList.add('active');
        expenseTab.classList.remove('active');
    }
}

// Функция для добавления транзакции
function addTransaction(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const date = document.getElementById('transaction-date').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const description = document.getElementById('transaction-description').value;
    const category = document.getElementById('transaction-category').value;

    // Добавляем новую транзакцию в массив
    transactions.push({ date, amount, description, type: currentTransactionType, category });
    updateTransactionList(); // Обновляем список транзакций
    hideAddTransactionForm(); // Скрываем форму
}

// Функция для обновления списка транзакций
function updateTransactionList() {
    const transactionsList = document.getElementById('transactions-list');
    transactionsList.innerHTML = ''; // Очищаем текущий список

    // Обновляем список транзакций
    transactions.forEach((transaction, index) => {
        const listItem = document.createElement('div');
        listItem.innerText = `${transaction.date} - ${transaction.description} - ${transaction.amount} ₽ (${transaction.category})`;

        // Кнопка редактирования
        const editButton = document.createElement('button');
        editButton.innerHTML = '✏️'; // Смайлик для редактирования
        editButton.className = 'edit-button';
        editButton.onclick = () => editTransaction(index);

        // Кнопка удаления
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '❌'; // Смайлик для удаления
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deleteTransaction(index);

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        transactionsList.appendChild(listItem);
    });
}

// Функция для редактирования транзакции
function editTransaction(index) {
    const transaction = transactions[index];
    document.getElementById('transaction-date').value = transaction.date;
    document.getElementById('transaction-amount').value = transaction.amount;
    document.getElementById('transaction-description').value = transaction.description;
    document.getElementById('transaction-category').value = transaction.category;
    currentTransactionType = transaction.type;
    showAddTransactionForm(); // Показать форму для редактирования
}

// Функция для удаления транзакции
function deleteTransaction(index) {
    transactions.splice(index, 1); // Удаляем транзакцию из массива
    updateTransactionList(); // Обновляем список транзакций
}

// Функции для импорта и экспорта (пока заглушки)
function importTransactions() {
    alert('Импорт транзакций (функция не реализована)');
}

function exportTransactions() {
    alert('Экспорт транзакций (функция не реализована)');
}

function addTransaction(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const date = document.getElementById('transaction-date').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);
    const description = document.getElementById('transaction-description').value;
    const category = document.getElementById('transaction-category').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Получаем загруженный файл
    const receiptUpload = document.getElementById('receipt-upload').files[0]; // Получаем файл (если загружен)

    // Добавляем новую транзакцию в массив
    const transaction = {
        date,
        amount,
        description,
        type: currentTransactionType,
        category,
        paymentMethod,
        receipt: receiptUpload ? receiptUpload.name : null // Можно сохранить имя файла
    };

    transactions.push(transaction);
    updateTransactionList(); // Обновляем список транзакций
    hideAddTransactionForm(); // Скрываем форму
}

// код для отчета по месяцам в отчетах

function showCategoryExpenses(category) {
    // Получаем данные о тратах по выбранной категории
    document.getElementById("modal-title").innerText = `Затраты по категории: ${category}`;

    // Здесь вы можете добавить логику для загрузки данных о расходах по дням
    const dailyExpensesData = {
        food: [
            { day: "01.01", amount: 500 },
            { day: "02.01", amount: 700 },
            { day: "03.01", amount: 400 },
            { day: "04.01", amount: 600 },
            { day: "05.01", amount: 300 },
        ],
        transportation: [
            { day: "01.01", amount: 200 },
            { day: "02.01", amount: 300 },
            { day: "03.01", amount: 150 },
        ],
        utilities: [
            { day: "01.01", amount: 300 },
        ],
        entertainment: [
            { day: "01.01", amount: 500 },
        ],
        other: [
            { day: "01.01", amount: 200 },
        ],
    };

    // Заполняем список ежедневных расходов
    const dailyList = document.getElementById("daily-expenses-list");
    dailyList.innerHTML = ""; // Очищаем предыдущий список

    dailyExpensesData[category].forEach(expense => {
        const li = document.createElement("li");
        li.className = "daily-expense-item"; // Добавляем класс для стилизации
        li.innerHTML = `<span>${expense.day}</span> <strong>${expense.amount} руб.</strong>`;
        dailyList.appendChild(li);
    });

    document.getElementById("expenses-modal").style.display = "block"; // Показываем модальное окно
}

function closeExpensesModal() {
    document.getElementById("expenses-modal").style.display = "none"; // Скрываем модальное окно
}


// код для отчета по категориям в отчетах

function showCategoryDetails(category) {
    alert(`Показать детали расходов для категории: ${category}`);
    // Здесь вы могли бы открывать модальное окно или обновлять данные в соответствующем разделе
}

// Дополнительная логика для построения графика по категориям при загрузке или по выбору определенной категории
function drawCategoryExpensesChart() {
    // Здесь добавьте логику для построения графика
}


// ФУНКЦИИ ДЛЯ МОДАЛЬНОГО ОКНА В ОТЧЕТАХ В ОТЧЕТАХ ПО КАТЕГОРИЯМ

function openTab(tabName) {
    // Скрываем все вкладки
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Убираем класс active у всех кнопок вкладок
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Показываем выбранную вкладку и добавляем класс active к её кнопке
    document.getElementById(tabName).classList.add('active');
    const activeButton = Array.from(buttons).find(button => button.textContent.includes(tabName === 'expensesTab' ? 'Расходы' : 'Графики'));
    activeButton.classList.add('active');
}



// ФУНКЦИИ ДЛЯ МОДАЛЬНОГО ОКНА В ОТЧЕТАХ В ОТЧЕТАХ ПО ДОХОДУ

function openIncomeReportsModal() {
    const modal = document.getElementById('income-reports-modal');
    modal.style.display = 'block'; // Открываем модальное окно

    // Можно также сделать дополнительную логику, если нужно
    // Например, если нужно загружать данные по выбранному месяцу в модальное окно
}

function closeIncomeReportsModal() {
    const modal = document.getElementById('income-reports-modal');
    modal.style.display = 'none'; // Закрываем модальное окно
}



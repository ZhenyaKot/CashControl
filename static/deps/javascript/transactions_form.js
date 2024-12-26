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
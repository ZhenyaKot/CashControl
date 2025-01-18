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
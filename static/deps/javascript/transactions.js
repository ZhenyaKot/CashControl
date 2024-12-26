

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



const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_shqYtPTDHGPLF-y2WA_jM_yBnBEXyS8KBxiAkYLKJkntvtWnwp4fCp8amBksU6cN/exec";

// ===== ЗАЩИТА =====
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 85 || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 83)) {
        e.preventDefault();
        return false;
    }
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
});

// ===== НАСТРОЙКИ TELEGRAM =====
const TG_TOKEN = "8309830318:AAHoIi3Uc6FHQMTPi1lMLh0WfRzkxwtAARY"; 
const TG_CHAT_ID = "6095101762";

// Переменные для хранения состояния сессии
let currentMessageId = null; // ID сообщения в ТГ
let reportText = "";         // Накопленный текст отчета
let currentUserName = "Аноним"; // Имя пользователя

// ===== ОБНОВЛЕНИЕ ОЦЕНКИ В ИНТЕРФЕЙСЕ =====
function updateRating(el, targetId) {
    document.getElementById(targetId).innerText = el.value + "/10";
}

// ===== ГЕНЕРАЦИЯ ID (С АВТО-ДАТОЙ) =====
function getUserId() {
    let count = localStorage.getItem('lavka_user_count') || "0001";
    let date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    // Каждый раз формируем актуальный ID с текущей датой
    return `${count}_${day}_${month}_${year}`;
}

function getDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? "телефон" : "ПК";
}

// ===== УМНАЯ ОТПРАВКА/РЕДАКТИРОВАНИЕ В TELEGRAM =====
async function sendOrEditTelegram(newAction) {
    // Добавляем действие к общему тексту отчета
    reportText += `\n📍 ${newAction}`;
     
    // Добавляем имя пользователя в заголовок сообщения
    const fullMessage = `📩 <b>Прохождение LavkaDor</b>\n\n👤 Имя: <b>${currentUserName}</b>\n🆔 ID: ${getUserId()}\n📱 Устройство: ${getDevice()}\n\n<b>История действий:</b>${reportText}`;

    let url = "";
    let body = {};

    if (!currentMessageId) {
        // Если сообщения еще нет — отправляем новое
        url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
        body = {
            chat_id: TG_CHAT_ID,
            text: fullMessage,
            parse_mode: 'HTML'
        };
    } else {
        // Если сообщение уже есть — редактируем его
        url = `https://api.telegram.org/bot${TG_TOKEN}/editMessageText`;
        body = {
            chat_id: TG_CHAT_ID,
            message_id: currentMessageId,
            text: fullMessage,
            parse_mode: 'HTML'
        };
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const result = await response.json();
        if (result.ok && !currentMessageId) {
            currentMessageId = result.result.message_id; // Запоминаем ID сообщения
        }
    } catch (e) { console.error("Ошибка ТГ", e); }
}

// ===== СОБЫТИЯ =====

function goDoramas() { 
    // Получаем имя из поля ввода
    const nameInput = document.getElementById('usernameInput');
    const name = nameInput.value.trim();

    // ПРОВЕРКА ИМЕНИ (не менее 3 букв)
    if (name.length < 3) {
        // Эффект ошибки
        nameInput.classList.add('input-error');
        nameInput.placeholder = "Минимум 3 буквы! 🥺";
        // Убираем эффект через 0.5 сек
        setTimeout(() => {
            nameInput.classList.remove('input-error');
        }, 500);
        return; // Останавливаем выполнение
    }

    currentUserName = name;
     
    showScreen('doramas'); 
    sendOrEditTelegram("Нажал «Начать»");
}

function sendInstantRating(dorama, value) {
    sendOrEditTelegram(`Поставил оценку дораме "${dorama}": ${value}/10`);
}

function startQuiz(dorama, url, ratingId) {
    const ratingValue = document.getElementById(ratingId).innerText;
    sendOrEditTelegram(`Начал викторину по "${dorama}" (Оценка: ${ratingValue})`);
    if(url !== '#') {
        setTimeout(() => { window.location.href = url; }, 500);
    }
}

function sendSuggestion() {
    const dorama = document.getElementById('suggestDorama').value;
    const ep = document.getElementById('suggestEpisode').value;
    const time = document.getElementById('suggestTime').value;
    const desc = document.getElementById('suggestDesc').value;

    sendOrEditTelegram(`Предложил момент: ${dorama}, ${ep} сер., время ${time}. Описание: ${desc}`);
    alert("Спасибо! Предложение добавлено в ваш отчет.");
    toggleSuggestion();
}

// Остальные функции без изменений логики отправки
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(id === 'doramas') {
      setTimeout(animateCards, 100);
  }
}

function backHome() { showScreen('home'); }

function toggleSuggestion() {
    const box = document.getElementById('suggestionBox');
    box.style.display = (box.style.display === 'block') ? 'none' : 'block';
}

function animateCards() {
    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => card.classList.add('visible'), index * 100);
    });
}

function openModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}
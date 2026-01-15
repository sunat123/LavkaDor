// ===== ТЕЛЕГРАМ НАСТРОЙКИ =====
const TG_TOKEN = "8309830318:AAHoIi3Uc6FHQMTPi1lMLh0WfRzkxwtAARY";
const TG_CHAT_ID = "6095101762";

// ===== ГЕНЕРАЦИЯ ID (Ваш формат) =====
function getUserId() {
    let id = localStorage.getItem('lavka_user_id');
    if (!id) {
        let count = localStorage.getItem('lavka_user_count') || "0001";
        let date = new Date();
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let year = date.getFullYear();
        id = `${count}_${day}_${month}_${year}`;
        localStorage.setItem('lavka_user_id', id);
        let nextCount = String(parseInt(count) + 1).padStart(4, '0');
        localStorage.setItem('lavka_user_count', nextCount);
    }
    return id;
}

// ===== ОТПРАВКА ДАННЫХ =====
async function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: text,
                parse_mode: 'HTML'
            })
        });
    } catch (e) {}
}

const originalQuizData = [
  { question: "Как зовут главного героя, короля?", options:["Ли Ган","Ли Хё","Чон Вон","Ким Су Хо"], correct:0 },
  { question: "Кто главная женская героиня?", options:["Чха Ён","Ким Со Ён","Хан Со Рин","Чо Хё"], correct:0 },
  { question: "Какой секрет скрывает Ли Ган?", options:["Своё происхождение","Тайный план свержения","Болезнь","Отношения"], correct:1 },
  { question: "Почему король Ли Ган хочет реформировать страну?", options:["Из-за любви","Из-за амбиций","Из-за народа","Из-за врагов"], correct:2 },
  { question: "Кто является главным врагом Ли Гана?", options:["Дворцовые министры","Иностранные силы","Его брат","Соседи"], correct:0 },
  { question: "Какая черта отличает Ли Гана?", options:["Жестокость","Справедливость и решимость","Лень","Равнодушие"], correct:1 },
  { question: "Кто поддерживает Ли Гана в дворце?", options:["Министры","Дворцовые слуги","Воины и верные друзья","Никто"], correct:2 },
  { question: "Чем опасен соперник Ли Гана?", options:["Интригами","Силой","Деньгами","Поддержкой народа"], correct:0 },
  { question: "Как Ли Ган показывает свою власть?", options:["Через страх","Через справедливость","Через богатство","Через тайны"], correct:1 },
  { question: "Как Чха Ён относится к Ли Гану в начале?", options:["С подозрением","С любовью","С равнодушием","С ненавистью"], correct:0 },
  { question: "Что объединяет героев?", options:["Любовь и доверие","Политика","Деньги","Интриги"], correct:0 },
  { question: "Какую роль играет дворцовая интрига?", options:["Фон","Главную","Риск","Поддержку"], correct:1 },
  { question: "Как Ли Ган справляется с заговором?", options:["Через хитрость","Через силу","Через дипломатию","Через уход"], correct:0 },
  { question: "Какая главная тема дорамы?", options:["Любовь и власть","Деньги","Магия","Путешествия"], correct:0 },
  { question: "Кто является самым опасным советником?", options:["Министр Чон","Министр Ли","Министр Ким","Министр Хан"], correct:0 },
  { question: "Как Ли Ган относится к своим врагам?", options:["С жалостью","С холодным расчетом","С насмешкой","С равнодушием"], correct:1 },
  { question: "Что делает Чха Ён для защиты Ли Гана?", options:["Ведет переговоры","Раскрывает заговор","Сражается сама","Скрывается"], correct:1 },
  { question: "Как дворцовая политика влияет на отношения героев?", options:["Усиливает доверие","Создает препятствия","Не влияет","Делает союз"], correct:1 },
  { question: "Почему Ли Ган доверяет Чха Ён?", options:["Из-за любви","Из-за преданности","Из-за ума","Все перечисленное"], correct:3 },
  { question: "Какой главный конфликт сезона?", options:["Любовный треугольник","Борьба за власть","Борьба за деньги","Семейные разногласия"], correct:1 },
  { question: "Чем опасен главный антагонист?", options:["Силой","Интригами","Подкупом","Все вышеперечисленное"], correct:3 },
  { question: "Как Ли Ган относится к реформам?", options:["Против","Сомневается","Поддерживает","Игнорирует"], correct:2 },
  { question: "Как Чха Ён проявляет смелость?", options:["В боях","В словах","В действиях и интригах","В совете"], correct:2 },
  { question: "Какова судьба верных друзей Ли Гана?", options:["Живы","Предают","Рискуют жизнями","Теряют статус"], correct:2 },
  { question: "Как Ли Ган показывает справедливость?", options:["Наказанием","Судом и законами","Советами","Насилием"], correct:1 },
  { question: "Кто помогает раскрывать заговоры?", options:["Чха Ён","Министры","Слуги","Народ"], correct:0 },
  { question: "Как Ли Ган относится к народу?", options:["С презрением","С заботой","Равнодушно","С интересом"], correct:1 },
  { question: "Как изменяется Чха Ён в течение сюжета?", options:["Становится слабее","Становится сильнее","Не меняется","Становится равнодушной"], correct:1 },
  { question: "Что символизирует «алые сердца»?", options:["Любовь","Верность и жертву","Кровь","Мечты"], correct:1 },
  { question: "Какой жанр дорамы?", options:["Историческая драма","Романтика","Фэнтези","Комедия"], correct:0 },
  { question: "Что делает дворцовые интриги напряжённым?", options:["Тайны","Сила","Любовь","Заговоры"], correct:3 },
  { question: "Как Ли Ган принимает решения?", options:["Импульсивно","Хладнокровно и стратегически","Слухами","С помощью советников"], correct:1 },
  { question: "Каково отношение народа к королю?", options:["Презрение","Любовь и уважение","Безразличие","Страх"], correct:1 },
  { question: "Кто становится ключевым союзником в битве за власть?", options:["Министры","Воины","Чха Ён","Брат"], correct:2 },
  { question: "Как Ли Ган проявляет лидерство?", options:["Через страх","Через пример и мудрость","Через деньги","Через хитрость"], correct:1 },
  { question: "Что Чха Ён рискует ради короля?", options:["Статус","Жизнь","Дружбу","Деньги"], correct:1 },
  { question: "Как заканчивается основной конфликт?", options:["Победой врагов","Победой Ли Гана","Примирением","Без изменений"], correct:1 },
  { question: "Как сериал раскрывает тему власти?", options:["Как наказание","Как ответственность","Как игру","Как случайность"], correct:1 },
  { question: "Как герои справляются с предательством?", options:["Прощают","Наказывают","Игнорируют","Теряют доверие"], correct:1 },
  { question: "Главный посыл «Алых сердец»?", options:["Власть решает всё","Любовь сильнее интриг","Верность и жертва меняют историю","Слабость приводит к падению"], correct:2 }
];

let quiz = [];
let currentQuestion = 0, time = 30, timerInterval, score = 0, quizStartTime;
let typingTimer;

function shuffleArray(array) {
    let cur = [...array];
    for (let i = cur.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cur[i], cur[j]] = [cur[j], cur[i]];
    }
    return cur;
}

function getQuizQuestions(original) {
    let shownIndices = JSON.parse(localStorage.getItem("shownQuestions") || "[]");
    if (shownIndices.length >= original.length) shownIndices = [];
    let remaining = original.filter((_, i) => !shownIndices.includes(i));
    let selected = [];
    if (remaining.length >= 20) {
        selected = shuffleArray(remaining).slice(0, 20);
    } else {
        selected = shuffleArray(original).slice(0, 20);
    }
    const newShownIndices = selected.map(q => original.indexOf(q));
    localStorage.setItem("shownQuestions", JSON.stringify([...shownIndices, ...newShownIndices]));
    let finalQuestions = selected.map(q => {
        let newQ = { ...q, options: [...q.options] };
        const correctText = newQ.options[newQ.correct];
        newQ.options = shuffleArray(newQ.options);
        newQ.correct = newQ.options.indexOf(correctText);
        return newQ;
    });
    return finalQuestions;
}

function typeWriter(text, i, fnCallback) {
    const qEl = document.getElementById("question");
    if (i < text.length) {
        qEl.innerHTML = text.substring(0, i + 1);
        typingTimer = setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 40);
    } else if (typeof fnCallback == 'function') {
        qEl.classList.remove("is-typing");
        fnCallback();
    }
}

function loadQuestion() {
    if(currentQuestion === 0) {
        quiz = getQuizQuestions(originalQuizData);
        quizStartTime = Date.now();
        document.getElementById("question").style.display = "block";
        
        sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Алые сердца\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
    }
    clearTimeout(typingTimer);
    clearInterval(timerInterval);
    time = 30;
    updateTimerUI();
    document.getElementById("timer").classList.remove("low-time-pulse");
    document.getElementById("timer").style.display = "flex";
    document.getElementById("qNumber").style.display = "block";
    document.getElementById("answers").style.display = "flex";
    document.getElementById("results").style.display = "none";
    document.getElementById("answersContainer").style.display = "none";

    const q = quiz[currentQuestion];
    document.getElementById("qNumber").innerText = `${currentQuestion + 1}/${quiz.length}`;
    
    const qEl = document.getElementById("question");
    qEl.innerHTML = "";
    qEl.classList.add("is-typing");

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";
    
    typeWriter(q.question, 0, function() {
        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.className = "answer";
            btn.innerText = opt;
            btn.onclick = () => selectAnswer(btn, i === q.correct, i);
            answersDiv.appendChild(btn);
            setTimeout(() => {
                btn.style.animation = `softBounce 0.6s ease-out forwards`;
            }, i * 150);
        });

        timerInterval = setInterval(() => { 
            time--; 
            updateTimerUI();
            if(time <= 5) {
                document.getElementById("timer").classList.add("low-time-pulse");
            }
            if(time <= 0) nextQuestion(); 
        }, 1000);
    });
    document.getElementById("progressFill").style.width = `${(currentQuestion / quiz.length) * 100}%`;
}

function updateTimerUI() {
    const maxTime = 30;
    const progress = 1 - time / maxTime;
    const redDeg = progress * 360;
    document.getElementById("timeText").innerText = time;
    document.getElementById("timer").style.background = `conic-gradient(#ff6aa2 0deg ${redDeg}deg, #b36bff ${redDeg}deg 360deg)`;
}

function selectAnswer(btn, correct, index) {
    clearInterval(timerInterval);
    document.getElementById("timer").classList.remove("low-time-pulse");
    document.querySelectorAll(".answer").forEach(b => b.disabled = true);
    quiz[currentQuestion].userChoice = index;
    
    if(correct) {
        score++;
        btn.classList.add("correct");
    } else {
        btn.classList.add("wrong");
        document.querySelectorAll(".answer")[quiz[currentQuestion].correct].classList.add("correct");
    }
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() { 
    currentQuestion++; 
    if(currentQuestion >= quiz.length) showResults(); 
    else loadQuestion(); 
}

function showResults() {
    document.getElementById("results").style.display = "flex";
    document.getElementById("timer").style.display = "none";
    document.getElementById("question").style.display = "none";
    document.getElementById("qNumber").style.display = "none";
    document.getElementById("answers").style.display = "none";
    
    document.getElementById("scoreText").innerText = `${score}/${quiz.length}`;
    document.getElementById("resultProgressFill").style.width = `${(score / quiz.length) * 100}%`;
    
    const percent = (score / quiz.length) * 100;
    let rank = "";
    if(percent <= 30) rank = "Подданный";
    else if(percent <= 60) rank = "Советник";
    else if(percent <= 85) rank = "Принц";
    else rank = "Великий Король ❤️";
    
    document.getElementById("userLevel").innerText = `Ранг: ${rank}`;
    
    const totalSeconds = Math.round((Date.now() - quizStartTime) / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const timeTakenStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    document.getElementById("timeTaken").innerText = timeTakenStr;

    // Сохранение рекордов
    const best = parseInt(localStorage.getItem('bestScore') || 0);
    if (score > best) localStorage.setItem('bestScore', score);
    
    const totalAtt = parseInt(localStorage.getItem('totalAttempts') || 0);
    localStorage.setItem('totalAttempts', totalAtt + 1);
    
    const currentBestTime = localStorage.getItem('bestTime') || "99:99";
    if (score >= best && timeTakenStr < currentBestTime) localStorage.setItem('bestTime', timeTakenStr);

    const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Алые сердца\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
    sendToTelegram(finalMsg);
}

// ФУНКЦИЯ ДЛЯ КНОПКИ "РАНГ"
function openRankModal() {
    const percent = (score / quiz.length) * 100;
    const modal = document.getElementById('rankModal');
    const badge = document.getElementById('modalBadge');
    const name = document.getElementById('modalRankName');
    const desc = document.getElementById('modalRankDesc');

    if(percent <= 30) {
        badge.innerText = "⚔️"; name.innerText = "Подданный"; desc.innerText = "Вы только прибыли ко двору. До Советника нужно еще " + (Math.ceil(quiz.length*0.31) - score) + " отв.";
    } else if(percent <= 60) {
        badge.innerText = "📜"; name.innerText = "Советник"; desc.innerText = "Ваши знания помогают королю! До Принца осталось " + (Math.ceil(quiz.length*0.61) - score) + " отв.";
    } else if(percent <= 85) {
        badge.innerText = "👑"; name.innerText = "Принц"; desc.innerText = "Вы в шаге от трона! Почти Легенда Корё!";
    } else {
        badge.innerText = "❤️"; name.innerText = "Король"; desc.innerText = "Вы истинный правитель! Ваше сердце алое!";
    }

    document.getElementById('bestScore').innerText = (localStorage.getItem('bestScore') || 0) + "/20";
    document.getElementById('bestTime').innerText = localStorage.getItem('bestTime') || "--:--";
    document.getElementById('totalAttempts').innerText = localStorage.getItem('totalAttempts') || 0;
    
    modal.style.display = "flex";
}

function showAnswers() {
    document.getElementById("results").style.display = "none";
    const container = document.getElementById("answersContainer");
    container.innerHTML = "<h3 style='color:#ff3cac'>Проверка ответов</h3>";
    container.style.display = "flex";
    
    quiz.forEach((q, i) => {
        const block = document.createElement("div");
        block.className = "answer-block";
        const isCorrect = q.userChoice === q.correct;
        block.innerHTML = `
          <p><b>${i+1}/${quiz.length} ${q.question}</b></p>
          <p>Ваш ответ: <span class="${isCorrect?'correct-answer':'wrong-answer'}">${q.userChoice !== undefined ? q.options[q.userChoice] : 'Пропущено'}</span></p>
          <p>Верно: <span class="correct-answer">${q.options[q.correct]}</span></p>
        `;
        container.appendChild(block);
        setTimeout(() => { block.classList.add('show-block'); }, i * 200);
    });
    
    setTimeout(() => {
        const rb = document.createElement("button");
        rb.innerText = "Начать заново";
        rb.className = "answer";
        rb.style.opacity = "1";
        rb.style.transform = "none";
        rb.style.background = "#ff3cac";
        rb.style.color = "#fff";
        rb.style.marginTop = "20px";
        rb.onclick = restartQuiz;
        container.appendChild(rb);
    }, quiz.length * 200);
}

function shareResult() {
    const rankName = document.getElementById("userLevel").innerText.replace("Ранг: ", "");
    const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Алые сердца»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
    
    if(navigator.share) {
        navigator.share({ title: 'Мой результат', text: text });
    } else {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        alert("Результат скопирован! Отправь его друзьям.");
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

window.onload = loadQuestion;
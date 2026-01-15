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
  { question: "Как зовут главную героиню дорамы?", options:["Со Ён","Хи Су","Пэк А Джин","Ли Ён Хи"], correct:2 },
  { question: "Чем занимается Пэк А Джин?", options:["Актриса","Писательница","Студентка и автор песен","Журналист"], correct:2 },
  { question: "Какой предмет связан с мистикой в дораме?", options:["Кольцо","Книга","Тетрадь","Ожерелье"], correct:2 },
  { question: "Что происходит, если А Джин записывает имя человека в тетрадь?", options:["Он исчезает","Он начинает её любить","Он заболевает","Он забывает её"], correct:1 },
  { question: "Как зовут парня, который искренне заботится об А Джин с самого начала?", options:["Ким Дон Гю","Чон Си Хо","Пак Ён Су","Кан Джун"], correct:1 },
  { question: "Какой характер у Чон Си Хо?", options:["Холодный","Агрессивный","Тёплый и заботливый","Высокомерный"], correct:2 },
  { question: "Почему А Джин не верит в любовь?", options:["Из-за семьи","Из-за прошлого опыта","Из-за болезни","Из-за учёбы"], correct:1 },
  { question: "Что чувствует А Джин, используя тетрадь?", options:["Радость","Уверенность","Пустоту и вину","Гордость"], correct:2 },
  { question: "Как меняется поведение людей, чьи имена записаны?", options:["Они становятся злыми","Они теряют память","Они начинают навязчиво любить","Они игнорируют А Джин"], correct:2 },
  { question: "Что больше всего пугает А Джин?", options:["Одиночество","Смерть","Правда","Потеря тетради"], correct:0 },
  { question: "Как Чон Си Хо относится к тетради?", options:["Использует её","Боится","Не знает о ней долгое время","Хочет продать"], correct:2 },
  { question: "Что происходит с чувствами, вызванными тетрадью?", options:["Они вечны","Они исчезают со временем","Они усиливаются","Они становятся ненавистью"], correct:1 },
  { question: "Почему А Джин продолжает пользоваться тетрадью?", options:["Ради интереса","Ради популярности","Ради любви и признания","Ради денег"], correct:2 },
  { question: "Как окружающие воспринимают А Джин?", options:["Незаметную","Загадочную","Холодную","Популярную"], correct:1 },
  { question: "Какую цену платит А Джин за использование тетради?", options:["Деньги","Здоровье","Эмоциональную боль","Друзей"], correct:2 },
  { question: "Как Чон Си Хо поддерживает А Джин?", options:["Осуждает","Уходит","Принимает её выбор","Манипулирует"], correct:2 },
  { question: "Что символизирует тетрадь?", options:["Судьбу","Иллюзию любви","Счастье","Мечты"], correct:1 },
  { question: "Почему тетрадь кажется А Джин спасением?", options:["Она даёт контроль","Она приносит деньги","Она защищает","Она лечит"], correct:0 },
  { question: "Какой жанр у дорамы?", options:["Детектив","Триллер","Романтика с мистикой","Комедия"], correct:2 },
  { question: "Что начинает осознавать А Джин со временем?", options:["Любовь нельзя заставить","Все люди лгут","Она сильнее других","Ей не нужны чувства"], correct:0 },
  { question: "Как реагирует Си Хо, узнав правду?", options:["Отворачивается","Злится","Старается понять","Использует тетрадь"], correct:2 },
  { question: "Почему любовь Си Хо отличается от других?", options:["Она навязчивая","Она настоящая","Она выгодная","Она мимолётная"], correct:1 },
  { question: "Что чувствует А Джин к Си Хо в начале?", options:["Любовь","Равнодушие","Недоверие","Страх"], correct:2 },
  { question: "Какое решение становится для А Джин самым трудным?", options:["Уехать","Признаться","Перестать использовать тетрадь","Порвать отношения"], correct:2 },
  { question: "Что происходит, когда имя стирают из тетради?", options:["Чувства усиливаются","Всё возвращается к обычному состоянию","Человек исчезает","Он всё помнит"], correct:1 },
  { question: "Как меняется А Джин к финалу?", options:["Становится холоднее","Принимает себя","Уходит от всех","Остаётся прежней"], correct:1 },
  { question: "Что важнее всего для А Джин в конце?", options:["Популярность","Контроль","Искренность","Деньги"], correct:2 },
  { question: "Кто первым видит настоящую А Джин?", options:["Поклонники","Си Хо","Друзья","Родители"], correct:1 },
  { question: "Какую тему поднимает дорама?", options:["Слава","Манипуляция чувствами","Школа","Семья"], correct:1 },
  { question: "Чем опасна тетрадь?", options:["Она ломает судьбы","Она лишает свободы чувств","Она разрушает дружбу","Всё перечисленное"], correct:3 },
  { question: "Какой главный страх Си Хо?", options:["Быть брошенным","Потерять А Джин","Одиночество","Предательство"], correct:1 },
  { question: "Что отличает Си Хо от других парней?", options:["Внешность","Деньги","Искренность","Статус"], correct:2 },
  { question: "Как А Джин относится к себе в начале дорамы?", options:["Любит себя","Сомневается в себе","Гордая","Безразличная"], correct:1 },
  { question: "Что означает «X» в названии дорамы?", options:["Тайна","Любой человек","Тот, кто не любит искренне","Судьба"], correct:2 },
  { question: "Как заканчивается история?", options:["Трагично","Открытый финал","С надеждой","Без изменений"], correct:2 },
  { question: "Что помогает А Джин измениться?", options:["Боль","Любовь Си Хо","Потеря тетради","Время"], correct:1 },
  { question: "Что важнее магии в дораме?", options:["Слова","Чувства","Поступки","Судьба"], correct:2 },
  { question: "Какой урок несёт дорама?", options:["Любовь можно создать","Настоящие чувства нельзя заставить","Лучше быть любимым, чем любить","Одиночество безопаснее"], correct:1 },
  { question: "Почему А Джин отказывается от тетради?", options:["Боится","Хочет настоящей любви","Она сломалась","Её украли"], correct:1 },
  { question: "Что остаётся у А Джин в финале?", options:["Страх","Одиночество","Надежда и выбор","Магия"], correct:2 }
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
        
        sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Дорогой X\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
    if(percent <= 30) rank = "Новичок";
    else if(percent <= 60) rank = "Фанат";
    else if(percent <= 85) rank = "Эксперт";
    else rank = "Мастер дорам 💖";
    
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

    const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Дорогой\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "🌱"; name.innerText = "Новичок"; desc.innerText = "Ты только начал путь в мир дорам 🌱. До ранга Фанат нужно еще " + (Math.ceil(quiz.length*0.31) - score) + " отв.";
    } else if(percent <= 60) {
        badge.innerText = "👀"; name.innerText = "Фанат"; desc.innerText = "Ты точно смотрел внимательно 👀. До Эксперта осталось " + (Math.ceil(quiz.length*0.61) - score) + " отв.";
    } else if(percent <= 85) {
        badge.innerText = "💜"; name.innerText = "Эксперт"; desc.innerText = "Настоящий знаток этой истории 💜. Еще немного до Максимума!";
    } else {
        badge.innerText = "👑"; name.innerText = "Мастер дорам 👑"; desc.innerText = "Ты прожил эту дораму сердцем. Твой уровень максимальный!";
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
    const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Дорогой X»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
    
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

loadQuestion();
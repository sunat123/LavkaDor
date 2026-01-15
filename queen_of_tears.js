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
  { question: "Кто является главным героем‑юристом, женатым на Хон Хэ Ин?", options:["Юн Ын‑сон","Пэк Хён‑у","Хон Су‑чхоль","Чон Да‑хе"], correct:1 },
  { question: "Откуда родом Пэк Хён‑у?", options:["Сеул","Йонду‑ри","Нью‑Йорк","Пусан"], correct:1 },
  { question: "Чем занимается Хон Хэ Ин в компании Queens Group?", options:["Бухгалтерия","Руководитель департамента","Директор магазинов","Юрист"], correct:2 },
  { question: "Какая компания принадлежит семье Хэ Ин?", options:["Cherry Group","Queens Group","Golden Corp","Sunrise Holdings"], correct:1 },
  { question: "Сколько лет пара Хэ Ин и Хён‑у была жената до кризиса?", options:["1 год","3 года","5 лет","7 лет"], correct:1 },
  { question: "Кто является давним другом Хэ Ин, который также проявляет к ней чувства?", options:["Хон Су‑чхоль","Юн Ын‑сон","Чон Да‑хе","Баек Ми‑сун"], correct:1 },
  { question: "Какое тяжелое заболевание диагностируют у Хэ Ин?", options:["Сердечное","Диабет","Рак мозга","Болезнь печени"], correct:2 },
  { question: "Что провоцирует глубокие изменения в отношениях пары?", options:["Финансовый кризис","Тяжелая болезнь","Измена","Переезд"], correct:1 },
  { question: "Кто является младшим братом Хэ Ин?", options:["Баек Ми‑сун","Хон Су‑чхоль","Юн Ын‑сон","Ли Чжин Ён"], correct:1 },
  { question: "Какую роль играет Юн Ын‑сон?", options:["Бывший аналитик и инвестор","Юрист","Повар","Психолог"], correct:0 },
  { question: "Где происходят основные события дорамы?", options:["Китай","США","Ю. Корея","Япония"], correct:2 },
  { question: "На каком стриминге доступна дорама в мире?", options:["Hulu","Netflix","Disney+","HBO Max"], correct:1 },
  { question: "Кто написал сценарий дорамы?", options:["Пак Чи‑ун","Ли Ён‑джу","Сон Хе‑вон","Чон Мин‑хо"], correct:0 },
  { question: "Что первоначально хотели сделать Хён‑у перед тем, как узнал о болезни Хэ Ин?", options:["Переехать","Развестись","Подарить дом","Пойти в отпуск"], correct:1 },
  { question: "Как называют Хэ Ин в компании?", options:["Тихая королева","Высокомерная королева","Веселая принцесса","Простая девушка"], correct:1 },
  { question: "Кто является CEO Queens Mart?", options:["Пэк Хён‑у","Хон Су‑чхоль","Юн Ын‑сон","Чон Да‑хе"], correct:0 },
  { question: "Чем занимается Пэк Хён‑у по профессии?", options:["Повар","Юрист","Инженер","Журналист"], correct:1 },
  { question: "Какая тема глубоко затрагивается в отношениях пары?", options:["Путешествия","Финансы","Недопонимание и любовь","Семейный бизнес только"], correct:2 },
  { question: "Сколько эпизодов в основном сезоне?", options:["12","16","20","24"], correct:1 },
  { question: "В какой стране были съемки части сериала?", options:["Германия","Франция","Италия","Китай"], correct:0 },
  { question: "Как зовут отца Хон Хэ Ин?", options:["Хон Бом-чжун","Хон Ман-дэ","Пэк Ду-гван","Юн Хви-чхоль"], correct:0 },
  { question: "Какое прозвище Пэк Хён-у получил в своей деревне?", options:["Король юристов","Принц супермаркета","Гордость Йонду-ри","Сеульский зять"], correct:2 },
  { question: "Какое животное Пэк Хён-у пытался выследить в лесу?", options:["Волк","Кабан","Олень","Лиса"], correct:1 },
  { question: "Кто является дедушкой Хэ Ин и основателем Queens?", options:["Хон Ман-дэ","Хон Бом-сок","Пэк Ду-гван","Юн Сон-хо"], correct:0 },
  { question: "В каком университете учился Пэк Хён-у?", options:["Гарвард","СНУ (Seoul National)","Йонсей","Оксфорд"], correct:1 },
  { question: "Какую спортивную дисциплину практиковал Хён-у в юности?", options:["Дзюдо","Бокс","Стрельба из лука","Тхэквондо"], correct:1 },
  { question: "Как называется деревня, где живут родители Хён-у?", options:["Йонду-ри","Чеджу","Инчхон","Сокчхо"], correct:0 },
  { question: "Какую должность занимает Пэк Хён-у в Queens Group?", options:["Директор по маркетингу","Глава юридического отдела","Финансовый директор","Зампредседателя"], correct:1 },
  { question: "Как зовут мать Пэк Хён-у?", options:["Бон Сун-хва","Чон Бон-э","Ким Сон-хва","Ли Хе-сук"], correct:1 },
  { question: "Что Хён-у всегда носит с собой из прошлого?", options:["Старое фото","MP3-плеер","Кольцо","Письмо"], correct:1 },
  { question: "Какое любимое блюдо Хэ Ин в Йонду-ри?", options:["Рамён","Холодная лапша","Суп из мидий","Сушеная хурма"], correct:3 },
  { question: "Кто такая Чон Да-хе?", options:["Сестра Хэ Ин","Жена Су-чхоля","Секретарь Хён-у","Бывшая девушка"], correct:1 },
  { question: "Где Хэ Ин и Хён-у провели медовый месяц?", options:["Париж","Берлин","Лондон","Прага"], correct:1 },
  { question: "Какое лекарство искала Хэ Ин в Германии?", options:["Новая вакцина","Т-клеточная терапия","Витамины","Обезболивающее"], correct:1 },
  { question: "Что было написано на зонтике Хён-у в их первую встречу?", options:["Queens","I Love You","Йонду-ри","Название школы"], correct:2 },
  { question: "Как зовут сестру Пэк Хён-у?", options:["Пэк Ми-сун","Пэк Ха-на","Пэк Чжи-а","Пэк Со-хи"], correct:0 },
  { question: "Чем владеет семья Хён-у в деревне?", options:["Ферма","Супермаркет","Автомастерская","Ресторан"], correct:1 },
  { question: "Какую тайну скрывал Юн Ын-сон о своем детстве?", options:["Он был богат","Он рос в приюте","Он жил в США","Он знал Хён-у"], correct:1 },
  { question: "Кто помогал Юн Ын-сону захватить Queens?", options:["Чон Да-хе","Мо Сыль-хи","Хон Ман-дэ","Пэк Хён-у"], correct:1 },
  { question: "Как называется тайная комната дедушки?", options:["Сейф","Бункер","Паника-рум","Архив"], correct:2 }
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
        
        sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Королева слёз\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
    else rank = "Королева слёз 👑";
    
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

    const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Королева слёз\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "💜"; name.innerText = "Эксперт"; desc.innerText = "Настоящий фанат Королевы слёз 💜. Еще немного до Королевы!";
    } else {
        badge.innerText = "👑"; name.innerText = "Королева слёз 👑"; desc.innerText = "Ты прожил эту дораму сердцем. Твой уровень максимальный!";
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
    const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Королева слёз»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
    
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
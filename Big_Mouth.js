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
  { question: "Как зовут главного героя?", options:["Чхве До Ха","Пак Чхан Хо","Ко Ми Хо","Ян Гён Вон"], correct:1 },
  { question: "Какая профессия у Пак Чхан Хо в начале?", options:["Прокурор","Судья","Адвокат","Журналист"], correct:2 },
  { question: "Какое прозвище получает Чхан Хо?", options:["Большая акула","Большой рот","Большая мышь (Big Mouse)","Чёрный лис"], correct:2 },
  { question: "Кто жена Пак Чхан Хо?", options:["Чхве До Ха","Со Джэ Ён","Ко Ми Хо","Хон Джи Хи"], correct:2 },
  { question: "Где работает Ко Ми Хо?", options:["В суде","В полиции","В больнице","В тюрьме"], correct:2 },
  { question: "Какой город является основным местом действия?", options:["Сеул","Кучхон","Гуми","Пусан"], correct:1 },
  { question: "Почему Чхан Хо оказывается в тюрьме?", options:["Из-за подставы","По собственному желанию","Из-за долгов","Из-за жены"], correct:0 },
  { question: "Как Чхан Хо ведёт себя в тюрьме вначале?", options:["Уверенно","Агрессивно","Напуганно","Хитро"], correct:2 },
  { question: "Что помогает ему выжить в тюрьме?", options:["Сила","Деньги","Ум и притворство","Связи"], correct:2 },
  { question: "Кто такой настоящий Big Mouse?", options:["Пак Чхан Хо","Чхве До Ха","Неизвестный сразу","Ко Ми Хо"], correct:2 },
  { question: "Кто начинает подозревать Чхан Хо?", options:["Жена","Заключённые","Прокурор","Мэр"], correct:3 },
  { question: "Как Чхан Хо меняется в тюрьме?", options:["Становится слабее","Становится хитрее","Теряет рассудок","Сдаётся"], correct:1 },
  { question: "Что символизирует образ Big Mouse?", options:["Страх","Ложь","Власть в тени","Деньги"], correct:2 },
  { question: "Какую роль играет Ми Хо?", options:["Пассивную","Манипулятора","Поддержку и расследование","Антагониста"], correct:2 },
  { question: "Кто такой Чхве До Ха?", options:["Адвокат","Прокурор","Мэр Кучхона","Заключённый"], correct:2 },
  { question: "Чем опасен Чхве До Ха?", options:["Деньгами","Связями и властью","Силой","Интеллектом"], correct:1 },
  { question: "Что объединяет элиту города?", options:["Дружба","Страх разоблачения","Политика","Деньги"], correct:1 },
  { question: "Как Чхан Хо использует слухи?", options:["Боится их","Игнорирует","Управляет ими","Опровергает"], correct:2 },
  { question: "Что происходит с репутацией Чхан Хо?", options:["Она рушится","Она остаётся прежней","Она превращается в легенду","Она исчезает"], correct:2 },
  { question: "Какой главный конфликт дорамы?", options:["Любовный","Политический","Правда против лжи","Деньги против власти"], correct:2 },
  { question: "Как Ми Хо помогает мужу?", options:["Через суд","Через прессу","Через расследования","Через угрозы"], correct:2 },
  { question: "Как Чхан Хо начинает воспринимать Big Mouse?", options:["Как проклятие","Как маску","Как силу","Как ошибку"], correct:2 },
  { question: "Как сериал показывает коррупцию?", options:["Поверхностно","Комедийно","Как систему","Как случайность"], correct:2 },
  { question: "Что становится главным оружием Чхан Хо?", options:["Деньги","Связи","Информация","Сила"], correct:2 },
  { question: "Как меняется Ми Хо за сериал?", options:["Становится слабее","Становится смелее","Теряет надежду","Отстраняется"], correct:1 },
  { question: "Какую цену платит Чхан Хо?", options:["Деньги","Репутацию","Свободу","Всё перечисленное"], correct:3 },
  { question: "Что отличает Чхан Хо от настоящих злодеев?", options:["Хитрость","Цель","Мораль","Сила"], correct:2 },
  { question: "Как тюрьма влияет на сюжет?", options:["Замедляет","Усиливает напряжение","Не влияет","Делает комичным"], correct:1 },
  { question: "Что делает сериал напряжённым?", options:["Романтика","Неопределённость личности Big Mouse","Экшен","Музыка"], correct:1 },
  { question: "Какой жанр у дорамы?", options:["Комедия","Романтика","Триллер","Фантастика"], correct:2 },
  { question: "Как Чхан Хо использует страх?", options:["Избегает","Поддаётся","Превращает в инструмент","Игнорирует"], correct:2 },
  { question: "Что символизирует мышь?", options:["Слабость","Незаметность","Хитрость","Всё перечисленное"], correct:3 },
  { question: "Как Ми Хо относится к правде?", options:["Боится","Скрывает","Ищет любой ценой","Использует"], correct:2 },
  { question: "Как меняется баланс сил?", options:["В пользу элиты","Не меняется","Постепенно в пользу Чхан Хо","В пользу полиции"], correct:2 },
  { question: "Что важнее для Чхан Хо в финале?", options:["Деньги","Власть","Справедливость","Репутация"], correct:2 },
  { question: "Как сериал показывает правду?", options:["Она проста","Она опасна","Она бесполезна","Она второстепенна"], correct:1 },
  { question: "Какую роль играет СМИ?", options:["Фон","Манипулятор","Инструмент давления","Поддержку"], correct:2 },
  { question: "Почему Чхан Хо называют «Болтуном»?", options:["Он много говорит","Он врёт","Он недооценён","Он притворяется слабым"], correct:3 },
  { question: "Как меняется образ героя?", options:["Из жертвы в игрока","Из злодея в героя","Не меняется","Из героя в злодея"], correct:0 },
  { question: "Главный посыл дорамы «Болтун»?", options:["Сила решает всё","Ложь побеждает","Слова могут быть оружием","Правда не нужна"], correct:2 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Болтун\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
  if(percent <= 30) rank = "Заключённый";
  else if(percent <= 60) rank = "Адвокат";
  else if(percent <= 85) rank = "Информатор";
  else rank = "Big Mouse 🐭";
  
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

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Болтун\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "🔗"; name.innerText = "Заключённый"; desc.innerText = "Вы попали в ловушку в тюрьме Кучхон. До Адвоката нужно " + (Math.ceil(quiz.length*0.31) - score) + " отв.";
    } else if(percent <= 60) {
        badge.innerText = "⚖️"; name.innerText = "Адвокат"; desc.innerText = "Вы Пак Чхан Хо в начале пути! До Информатора осталось " + (Math.ceil(quiz.length*0.61) - score) + " отв.";
    } else if(percent <= 85) {
        badge.innerText = "🕵️"; name.innerText = "Информатор"; desc.innerText = "Вы почти раскрыли личность Большой Мыши! Почти Легенда!";
    } else {
        badge.innerText = "🐭"; name.innerText = "Big Mouse"; desc.innerText = "Вы настоящий кукловод Кучхона! Максимальный ранг!";
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
  const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Болтун»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
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
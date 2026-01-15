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
  { question: "Как зовут главную героиню дорамы?", options:["До Хи","До До Хи","Ким До Хи","Чон До Хи"], correct:1 },
  { question: "Кем является Чон Гу Вон на самом деле?", options:["Ангелом","Демоном","Человеком","Жнецом"], correct:1 },
  { question: "Какой у Гу Вона возраст в начале дорамы?", options:["100 лет","200 лет","Более 200 лет","Он бессмертен"], correct:2 },
  { question: "Какую сделку заключает Гу Вон с людьми?", options:["На богатство","На любовь","На успех","На исполнение желаний"], correct:3 },
  { question: "Какую цену платят люди за сделку?", options:["Деньги","Годы жизни","Душу","Память"], correct:2 },
  { question: "Кем работает До До Хи?", options:["Юрист","Директор компании","Прокурор","Судья"], correct:1 },
  { question: "Как называется компания, которой управляет До Хи?", options:["Mirae Group","Future Corp","Mirae F&B","Mirae Holdings"], correct:2 },
  { question: "Что происходит с силами Гу Вона после встречи с До Хи?", options:["Усиливаются","Исчезают","Переходят к До Хи","Он их теряет навсегда"], correct:2 },
  { question: "Почему До Хи становится опасно жить одной?", options:["Из-за преследования","Из-за проклятия","Из-за врагов в компании","Из-за демона"], correct:0 },
  { question: "Какую роль играет фиктивный брак?", options:["Ради денег","Ради защиты","Ради любви","Ради мести"], correct:1 },
  { question: "Как Гу Вон относится к людям в начале?", options:["С сочувствием","С презрением","С интересом","С любовью"], correct:1 },
  { question: "Что отличает До Хи от других людей?", options:["Она не боится демона","Она не поддаётся сделке","Она может управлять силами","Она видит истинную сущность"], correct:1 },
  { question: "Какой предмет связан с силой Гу Вона?", options:["Кольцо","Татуировка","Ожерелье","Книга"], correct:1 },
  { question: "Что символизирует татуировка?", options:["Проклятие","Контракт","Истинную сущность","Силу"], correct:3 },
  { question: "Кто является главной угрозой для До Хи?", options:["Конкуренты","Родственники","Убийца","Демоны"], correct:2 },
  { question: "Как меняется отношение Гу Вона к До Хи?", options:["Остаётся прежним","Становится враждебным","Появляется привязанность","Он её боится"], correct:2 },
  { question: "Что начинает чувствовать До Хи к Гу Вону?", options:["Страх","Равнодушие","Доверие","Ненависть"], correct:2 },
  { question: "Почему Гу Вон не может заключить сделку с До Хи?", options:["Она отказывается","Он теряет силы","Контракт не работает","Она не желает ничего"], correct:2 },
  { question: "Какой жанр у дорамы?", options:["Детектив","Фантастика","Романтическое фэнтези","Триллер"], correct:2 },
  { question: "Что происходит, когда До Хи держит руку Гу Вона?", options:["Он теряет контроль","Силы возвращаются","Время останавливается","Ничего"], correct:1 },
  { question: "Какую роль играет бабушка До Хи?", options:["Враг","Наставник","Защитник","Глава компании"], correct:3 },
  { question: "Почему Гу Вон боится потерять силы?", options:["Из-за бессмертия","Из-за ада","Он станет человеком","Он исчезнет"], correct:2 },
  { question: "Кто помогает До Хи в расследовании?", options:["Юрист","Секретарь","Детектив","Гу Вон"], correct:3 },
  { question: "Что раскрывается о прошлом Гу Вона?", options:["Он был человеком","Он был ангелом","Он был королём","Он был жертвой"], correct:0 },
  { question: "Почему До Хи сложно доверять людям?", options:["Детство","Предательство","Работа","Характер"], correct:1 },
  { question: "Какой внутренний конфликт есть у Гу Вона?", options:["Долг и чувства","Страх и сила","Ад и рай","Жизнь и смерть"], correct:0 },
  { question: "Что для Гу Вона становится новым желанием?", options:["Вернуть силы","Быть с До Хи","Вернуться в ад","Стать человеком"], correct:1 },
  { question: "Что символизирует фиктивный брак?", options:["Ложь","Сделку","Защиту","Путь к настоящей любви"], correct:3 },
  { question: "Как реагирует До Хи, узнав правду о Гу Воне?", options:["Уходит","Боится","Принимает","Отрицает"], correct:2 },
  { question: "Что угрожает контрактам Гу Вона?", options:["Любовь","Время","Люди","Ад"], correct:0 },
  { question: "Какой главный посыл дорамы?", options:["Желания опасны","Любовь сильнее судьбы","Демоны не меняются","Деньги решают всё"], correct:1 },
  { question: "Кто управляет судьбами людей в дораме?", options:["Демоны","Судьба","Люди сами","Контракты"], correct:2 },
  { question: "Как Гу Вон меняется рядом с До Хи?", options:["Становится слабым","Учится чувствовать","Теряет смысл","Хочет уйти"], correct:1 },
  { question: "Что пугает До Хи больше всего?", options:["Демон","Потеря контроля","Одиночество","Смерть"], correct:2 },
  { question: "Какую цену Гу Вон готов заплатить за До Хи?", options:["Силу","Бессмертие","Свободу","Всё"], correct:3 },
  { question: "Чем заканчивается главный конфликт?", options:["Трагедией","Возвращением в ад","Спасением","Любовью"], correct:3 },
  { question: "Что становится истинной силой Гу Вона?", options:["Контракты","Магия","Любовь","Гнев"], correct:2 },
  { question: "Как До Хи влияет на судьбу Гу Вона?", options:["Разрушает","Освобождает","Подчиняет","Меняет прошлое"], correct:1 },
  { question: "Какой выбор делает Гу Вон в финале?", options:["Ад","Контракты","Человечность","Бессмертие"], correct:2 },
  { question: "Что остаётся главным в финале?", options:["Власть","Сила","Любовь","Желания"], correct:2 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Мой демон\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
  else rank = "Высший Судья ⚖️";
  
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

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Мой демон\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "💜"; name.innerText = "Эксперт"; desc.innerText = "Настоящий знаток дорамы Мой демон 💜. Еще немного до Максимума!";
    } else {
        badge.innerText = "⚖️"; name.innerText = "Высший Судья"; desc.innerText = "Ты знаешь о демонах всё! Твой уровень максимальный!";
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
  const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Мой демон»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
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
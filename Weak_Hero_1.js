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
  { question: "Как зовут главного героя?", options:["Ан Су Хо","Ён Си Ын","О Бом Сок","Чон Ён Бин"], correct:1 },
  { question: "Чем Ён Си Ын выделяется среди одноклассников?", options:["Силой","Ростом","Умом","Деньгами"], correct:2 },
  { question: "В какой школе учится Си Ын?", options:["Ёнсун","Бёнмун","Ынсан","Тэхан"], correct:1 },
  { question: "Почему Си Ына начинают задирать?", options:["Он бедный","Он молчаливый отличник","Он дерзкий","Он новенький"], correct:1 },
  { question: "Как Си Ын сражается с противниками?", options:["Грубой силой","Хитростью и расчётом","Оружием","С помощью друзей"], correct:1 },
  { question: "Кто первым становится его союзником?", options:["О Бом Сок","Ан Су Хо","Чон Ён Бин","Кан У"], correct:1 },
  { question: "Какой характер у Ан Су Хо?", options:["Холодный","Агрессивный","Спокойный и добрый","Высокомерный"], correct:2 },
  { question: "Почему Су Хо уважает Си Ына?", options:["За смелость","За ум","За честность","За деньги"], correct:1 },
  { question: "Кто такой О Бом Сок?", options:["Лидер школы","Друг Су Хо","Переведённый ученик","Учитель"], correct:2 },
  { question: "Какое прошлое влияет на поведение Бом Сока?", options:["Травмы в спорте","Жестокий отец","Потеря матери","Бедность"], correct:1 },
  { question: "Как Бом Сок сначала относится к Си Ыну?", options:["Презирает","Боится","Восхищается","Игнорирует"], correct:2 },
  { question: "Что начинает разрушать дружбу троих?", options:["Деньги","Зависть и страх","Учёба","Девушка"], correct:1 },
  { question: "Кто является главным антагонистом первой части?", options:["Ён Бин","Кан У","Сок Дэ","Джин Тэ"], correct:0 },
  { question: "Чем Ён Бин опасен?", options:["Физической силой","Влиянием и жестокостью","Интеллектом","Деньгами"], correct:1 },
  { question: "Как Си Ын готовится к дракам?", options:["Тренируется","Изучает слабости противников","Носит оружие","Прячется"], correct:1 },
  { question: "Что Су Хо ценит больше всего?", options:["Деньги","Силу","Дружбу","Статус"], correct:2 },
  { question: "Почему Бом Сок начинает меняться?", options:["Из-за одиночества","Из-за зависти к Су Хо","Из-за страха потерять друзей","Всё перечисленное"], correct:3 },
  { question: "Как школа реагирует на насилие?", options:["Активно вмешивается","Игнорирует","Наказывает всех","Помогает жертвам"], correct:1 },
  { question: "Какую травму получает Су Хо?", options:["Лёгкую","Серьёзную","Смертельную","Никакую"], correct:1 },
  { question: "Что делает Си Ын после трагедии с Су Хо?", options:["Уходит из школы","Мстит","Замыкается","Сдаётся"], correct:2 },
  { question: "Почему Бом Сок предаёт друзей?", options:["Ради денег","Ради власти","Из-за страха и давления","Из-за мести"], correct:2 },
  { question: "Что символизирует название «Слабый герой»?", options:["Физическую слабость","Ум","Скрытую силу разума","Одиночество"], correct:2 },
  { question: "Какую роль играют учителя?", options:["Активную","Пассивную","Защитную","Враждебную"], correct:1 },
  { question: "Как Си Ын относится к насилию?", options:["Любит его","Использует вынужденно","Боится","Ищет"], correct:1 },
  { question: "Что становится главной ценой драк?", options:["Деньги","Дружба","Здоровье","Репутация"], correct:1 },
  { question: "Как меняется Си Ын к концу сезона?", options:["Становится жестче","Теряет чувства","Остаётся прежним","Уходит"], correct:0 },
  { question: "Какое главное чувство у Си Ына в финале?", options:["Радость","Спокойствие","Пустота","Страх"], correct:2 },
  { question: "Кто по-настоящему понимает Си Ына?", options:["Учителя","Су Хо","Бом Сок","Никто"], correct:1 },
  { question: "Что делает Бом Сок после своего падения?", options:["Просит прощения","Скрывается","Уезжает","Наказывает себя"], correct:2 },
  { question: "Какой жанр у дорамы?", options:["Романтика","Комедия","Школьная драма","Фантастика"], correct:2 },
  { question: "Какой главный конфликт сезона?", options:["Учёба","Борьба за власть","Насилие и выбор","Любовь"], correct:2 },
  { question: "Что показывает сериал о буллинге?", options:["Он редок","Его легко остановить","Он разрушает жизни","Он безобиден"], correct:2 },
  { question: "Что делает Су Хо героем?", options:["Сила","Храбрость","Верность друзьям","Деньги"], correct:2 },
  { question: "Почему Си Ын продолжает бороться?", options:["Ради мести","Ради справедливости","Ради выживания","Ради себя"], correct:2 },
  { question: "Что означает финал сезона?", options:["Победу","Начало новой битвы","Примирение","Конец истории"], correct:1 },
  { question: "Какую цену платит каждый герой?", options:["Деньги","Здоровье","Будущее","Всё перечисленное"], correct:3 },
  { question: "Что важнее силы в сериале?", options:["Статус","Ум","Страх","Деньги"], correct:1 },
  { question: "Как сериал показывает дружбу?", options:["Как слабость","Как риск","Как опору","Как иллюзию"], correct:2 },
  { question: "Что делает Си Ына опасным противником?", options:["Ярость","Планирование","Оружие","Численность"], correct:1 },
  { question: "Какой главный посыл 1 сезона?", options:["Сила решает всё","Молчание — выход","Интеллект может быть оружием","Побеждает жестокость"], correct:2 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Слабый герой 1\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
  else rank = "Сильнейший Интеллект 🧠";
  
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

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Слабый герой 1\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "🌱"; name.innerText = "Новичок"; desc.innerText = "Ты только начал путь в мир дорам. До ранга Фанат нужно еще " + (Math.ceil(quiz.length*0.31) - score) + " отв.";
    } else if(percent <= 60) {
        badge.innerText = "👀"; name.innerText = "Фанат"; desc.innerText = "Ты точно смотрел внимательно. До Эксперта осталось " + (Math.ceil(quiz.length*0.61) - score) + " отв.";
    } else if(percent <= 85) {
        badge.innerText = "🥊"; name.innerText = "Эксперт"; desc.innerText = "Настоящий знаток дорамы Слабый герой 1. Еще немного до Максимума!";
    } else {
        badge.innerText = "🧠"; name.innerText = "Сильнейший Интеллект"; desc.innerText = "Ты используешь ум как оружие! Твой уровень максимальный!";
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
  const text = `🥊 Я получил ранг: ${rankName}\n📺 Викторина «Слабый герой 1 сезон»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
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
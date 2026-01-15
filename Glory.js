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
  { question: "Как зовут главную героиню?", options:["Мун Дон Ён","Ли Со Ён","Пак Со Ён","Чон Ми Хё"], correct:0 },
  { question: "Какая трагедия происходит с Дон Ён в школе?", options:["Потеря друзей","Буллинг и травля","Случайная травма","Финансовые проблемы"], correct:1 },
  { question: "Кто является главным антагонистом в школе?", options:["Ким Хё Чан","Чон Чжин Су","Пак Со Ён","Ли Мин Су"], correct:1 },
  { question: "Почему Дон Ён решает мстить?", options:["За деньги","За друзей","За справедливость","Из-за любви"], correct:2 },
  { question: "Какое оружие Дон Ён использует против обидчиков?", options:["Физическая сила","Слова и хитрость","Оружие","Социальные сети"], correct:1 },
  { question: "Кто поддерживает Дон Ён?", options:["Семья","Учителя","Друг детства","Никто"], correct:2 },
  { question: "Как Дон Ён меняется во время сюжета?", options:["Становится слабее","Становится сильнее и решительнее","Становится равнодушной","Уходит"], correct:1 },
  { question: "Как главный антагонист ведёт себя по отношению к Дон Ён?", options:["Игнорирует","Буллит и унижает","Поддерживает","Дружит"], correct:1 },
  { question: "Почему школьники боятся Чжин Су?", options:["Из-за силы","Из-за статуса","Из-за жестокости","Из-за денег"], correct:2 },
  { question: "Как Дон Ён достигает своих целей?", options:["Силой","Путём хитрости и плана","С помощью родителей","Через случайность"], correct:1 },
  { question: "Что мотивирует Дон Ён?", options:["Деньги","Желание справедливости","Любовь","Уважение"], correct:1 },
  { question: "Кто является близким другом Дон Ён?", options:["Ли Мин Су","Чон Ми Хё","Пак Со Ён","Ким Хё Чан"], correct:0 },
  { question: "Как родители Дон Ён относятся к её планам?", options:["Поддерживают","Не вмешиваются","Не знают","Противятся"], correct:3 },
  { question: "Как школа реагирует на буллинг?", options:["Наказывает","Игнорирует","Поддерживает","Разоблачает"], correct:1 },
  { question: "Чем Дон Ён отличается от других жертв?", options:["Смелостью и расчетливостью","Силой","Популярностью","Красотой"], correct:0 },
  { question: "Кто помогает Дон Ён собирать доказательства?", options:["Друг детства","Учителя","Родители","Никто"], correct:0 },
  { question: "Как Дон Ён показывает свою решимость?", options:["Через конфликты","Через молчание","Через действия и планирование","Через угрозы"], correct:2 },
  { question: "Что становится символом борьбы Дон Ён?", options:["Записи и документы","Физическая сила","Популярность","Слова"], correct:0 },
  { question: "Как антагонист реагирует на действия Дон Ён?", options:["Признаёт поражение","Продолжает насилие","Игнорирует","Становится другом"], correct:1 },
  { question: "Почему дорама показывает последствия буллинга?", options:["Для драмы","Чтобы донести мораль","Для юмора","Для действия"], correct:1 },
  { question: "Как Дон Ён относится к друзьям?", options:["Доверяет","Использует","Предает","Игнорирует"], correct:0 },
  { question: "Что мотивирует Чжин Су?", options:["Деньги","Власть и контроль","Любовь","Учёба"], correct:1 },
  { question: "Как Дон Ён меняет школу?", options:["Делает её справедливее","Делает её опаснее","Не меняет","Покидает"], correct:0 },
  { question: "Какую цену платит Дон Ён?", options:["Здоровье","Отношения","Репутацию","Всё перечисленное"], correct:3 },
  { question: "Кто помогает разоблачить Чжин Су?", options:["Дон Ён","Друг детства","Учителя","Родители"], correct:0 },
  { question: "Какой жанр дорамы?", options:["Школьная драма и триллер","Романтика","Комедия","Фэнтези"], correct:0 },
  { question: "Как Дон Ён справляется с трудностями?", options:["Сдаётся","Продумывает план","Игнорирует","Боится"], correct:1 },
  { question: "Какова роль социальных сетей?", options:["Инструмент разоблачения","Игрушка","Фон","Для юмора"], correct:0 },
  { question: "Как Дон Ён проявляет смелость?", options:["В прямых конфликтах","В планировании и действиях","В словах","В страхе"], correct:1 },
  { question: "Как родители Дон Ён реагируют на разоблачение?", options:["Радуются","Поддерживают","Боятся","Игнорируют"], correct:2 },
  { question: "Какова реакция школьников на разоблачение?", options:["Поддержка","Игнорирование","Страх и уважение","Смешанное"], correct:2 },
  { question: "Как Дон Ён относится к справедливости?", options:["Безразлично","Борется за неё","Применяет частично","Игнорирует"], correct:1 },
  { question: "Как Чжин Су теряет власть?", options:["Через силы","Через разоблачение","Через суд","Через родителей"], correct:1 },
  { question: "Кто является ключевым свидетелем?", options:["Дон Ён","Друг детства","Учителя","Все перечисленные"], correct:1 },
  { question: "Как Дон Ён меняется психологически?", options:["Становится сильнее и решительнее","Становится слабее","Равнодушнее","Легче"], correct:0 },
  { question: "Что является центральной темой дорамы?", options:["Любовь","Месть и справедливость","Деньги","Популярность"], correct:1 },
  { question: "Как дорама показывает последствия травли?", options:["Легко и весело","Глубоко и драматично","Без значимости","Комедийно"], correct:1 },
  { question: "Как Дон Ён достигает цели?", options:["Физической силой","Планированием и смелостью","С помощью родителей","Через удачу"], correct:1 },
  { question: "Как друзья помогают Дон Ён?", options:["Никак","Поддержкой и действиями","Советами","Только морально"], correct:1 },
  { question: "Главный посыл дорамы «Слава»?", options:["Сила побеждает","Месть оправдана","Справедливость требует смелости и плана","Страх решает"], correct:2 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Слава\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
  else if(percent <= 60) rank = "Наблюдатель";
  else if(percent <= 85) rank = "Мститель";
  else rank = "Мастер Стратегии ❤️";
  
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

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Слава\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "⚔️"; name.innerText = "Новичок"; desc.innerText = "Вы только начали путь. До Мстителя нужно еще " + (Math.ceil(quiz.length*0.61) - score) + " отв.";
    } else if(percent <= 60) {
        badge.innerText = "📜"; name.innerText = "Наблюдатель"; desc.innerText = "Вы внимательны! До Мстителя осталось " + (Math.ceil(quiz.length*0.61) - score) + " отв.";
    } else if(percent <= 85) {
        badge.innerText = "👑"; name.innerText = "Мститель"; desc.innerText = "Ваш план почти идеален!";
    } else {
        badge.innerText = "❤️"; name.innerText = "Мастер Стратегии"; desc.innerText = "Вы знаете о 'Славе' всё!";
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
  const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Слава»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
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
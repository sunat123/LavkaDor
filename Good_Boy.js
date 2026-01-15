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
  { question: "Кем является главный герой дорамы?", options:["Адвокатом","Прокурором","Полицейским","Журналистом"], correct:2 },
  { question: "Какое прошлое объединяет главных героев?", options:["Они друзья детства","Они бывшие спортсмены","Они учились за границей","Они родственники"], correct:1 },
  { question: "В каком виде спорта был успешен главный герой?", options:["Футбол","Бокс","Дзюдо","Тхэквондо"], correct:1 },
  { question: "Почему герой уходит из профессионального спорта?", options:["Потерял интерес","Получил травму","Проиграл матч","Из-за возраста"], correct:1 },
  { question: "В какой отдел полиции попадает главный герой?", options:["Киберпреступления","Патруль","Спецотдел","Отдел по борьбе с насильственными преступлениями"], correct:2 },
  { question: "Какая главная цель спецотдела?", options:["Борьба с коррупцией","Поимка серийных преступников","Работа под прикрытием","Защита свидетелей"], correct:2 },
  { question: "Какое качество отличает главного героя?", options:["Хитрость","Честность","Жестокость","Холодность"], correct:1 },
  { question: "Как коллеги сначала относятся к герою?", options:["С уважением","С недоверием","С восхищением","С завистью"], correct:1 },
  { question: "Кто становится наставником главного героя?", options:["Начальник полиции","Опытный детектив","Прокурор","Бывший спортсмен"], correct:1 },
  { question: "Что помогает герою в работе чаще всего?", options:["Связи","Физическая подготовка","Деньги","Случай"], correct:1 },
  { question: "Какой характер у главного героя?", options:["Агрессивный","Спокойный","Упрямый","Искренний"], correct:3 },
  { question: "Какая тема проходит через всю дораму?", options:["Месть","Выбор между прошлым и настоящим","Политика","Семейные тайны"], correct:1 },
  { question: "Почему спецотдел считается рискованным?", options:["Мало финансирования","Частые травмы","Работа под прикрытием","Коррумпированное руководство"], correct:2 },
  { question: "Что герой чаще всего нарушает в начале службы?", options:["Закон","Приказы","Дисциплину","Протокол"], correct:3 },
  { question: "Как спорт влияет на характер героя?", options:["Делает его жестким","Учит самоконтролю","Делает его эгоистом","Ослабляет"], correct:1 },
  { question: "Кто поддерживает героя в трудные моменты?", options:["Семья","Коллеги","Наставник","Все перечисленные"], correct:3 },
  { question: "С какой проблемой сталкивается герой после травмы?", options:["Потеря веры в себя","Финансовые трудности","Давление СМИ","Одиночество"], correct:0 },
  { question: "Как герой реагирует на несправедливость?", options:["Игнорирует","Боится","Не может пройти мимо","Сообщает начальству"], correct:2 },
  { question: "Что символизирует название «Хороший мальчик»?", options:["Послушание","Наивность","Честность и принципы","Слабость"], correct:2 },
  { question: "Какое задание становится поворотным моментом?", options:["Первое задержание","Работа под прикрытием","Провал операции","Повышение"], correct:1 },
  { question: "Как герой относится к насилию?", options:["Использует без раздумий","Избегает, если можно","Получает удовольствие","Боится"], correct:1 },
  { question: "Какой конфликт возникает внутри спецотдела?", options:["Из-за денег","Из-за методов работы","Из-за лидера","Из-за прошлого"], correct:1 },
  { question: "Кто становится главным противником?", options:["Бандит","Коррумпированный чиновник","Бывший спортсмен","Серийный преступник"], correct:3 },
  { question: "Как герой использует спортивные навыки?", options:["Для показухи","Для самообороны","Для поимки преступников","Для тренировок"], correct:2 },
  { question: "Что меняется в отношении коллег к герою?", options:["Становится хуже","Остаётся прежним","Появляется уважение","Возникает страх"], correct:2 },
  { question: "Какая внутренняя дилемма есть у героя?", options:["Закон или чувства","Карьера или семья","Прошлое или будущее","Победа или поражение"], correct:2 },
  { question: "Почему герой не возвращается в спорт?", options:["Потерял форму","Боится","Нашёл новое призвание","Его не берут"], correct:2 },
  { question: "Что показывает дорама через бывших спортсменов?", options:["Славу","Цену побед","Зависть","Деньги"], correct:1 },
  { question: "Какой жанр у дорамы?", options:["Комедия","Романтика","Экшен-драма","Фантастика"], correct:2 },
  { question: "Что объединяет всех членов спецотдела?", options:["Прошлые травмы","Деньги","Слава","Амбиции"], correct:0 },
  { question: "Как герой справляется со страхом?", options:["Убегает","Скрывает","Преодолевает","Игнорирует"], correct:2 },
  { question: "Какую роль играет доверие в команде?", options:["Неважную","Ключевую","Опасную","Формальную"], correct:1 },
  { question: "Что герой ценит больше всего?", options:["Победу","Справедливость","Деньги","Признание"], correct:1 },
  { question: "Как меняется герой к финалу?", options:["Становится жестче","Теряет наивность","Остаётся верен принципам","Уходит"], correct:2 },
  { question: "Что становится его новой «ареной»?", options:["Суд","Улица","Ринг","Отделение полиции"], correct:1 },
  { question: "Как спорт помогает в работе полиции?", options:["Физически","Психологически","Тактически","Всё перечисленное"], correct:3 },
  { question: "Какой посыл у дорамы?", options:["Победа важнее всего","Сила решает","Быть хорошим — это выбор","Мир несправедлив"], correct:2 },
  { question: "Что герой доказывает окружающим?", options:["Что он лучший","Что он сильный","Что он надёжный","Что он «хороший мальчик» не зря"], correct:3 },
  { question: "Какой момент самый эмоциональный?", options:["Первое задание","Провал операции","Столкновение с прошлым","Финальная операция"], correct:3 },
  { question: "Чем заканчивается история героя?", options:["Возвращением в спорт","Повышением","Потерей","Осознанием своего пути"], correct:3 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Хороший мальчик\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
  else rank = "Золотой Призер 🏅";
  
  document.getElementById("userLevel").innerText = `Ранг: ${rank}`;
  
  const totalSeconds = Math.round((Date.now() - quizStartTime) / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const timeTakenStr = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  document.getElementById("timeTaken").innerText = timeTakenStr;

  const best = parseInt(localStorage.getItem('bestScore') || 0);
  if (score > best) localStorage.setItem('bestScore', score);
  
  const totalAtt = parseInt(localStorage.getItem('totalAttempts') || 0);
  localStorage.setItem('totalAttempts', totalAtt + 1);
  
  const currentBestTime = localStorage.getItem('bestTime') || "99:99";
  if (score >= best && timeTakenStr < currentBestTime) localStorage.setItem('bestTime', timeTakenStr);

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Хороший мальчик\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
  sendToTelegram(finalMsg);
}

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
        badge.innerText = "💜"; name.innerText = "Эксперт"; desc.innerText = "Настоящий знаток дорамы Хороший мальчик 💜. Еще немного до Максимума!";
    } else {
        badge.innerText = "🏅"; name.innerText = "Золотой Призер"; desc.innerText = "Ты настоящий чемпион! Твой уровень максимальный!";
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
  const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Хороший мальчик»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
  if(navigator.share) {
    navigator.share({ title: 'Мой результат', text: text });
  } else {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert("Результат скопирован! Отправь друзьям!");
  }
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById("results").style.display = "none";
  document.getElementById("answersContainer").style.display = "none";
  loadQuestion();
}

window.onload = loadQuestion;
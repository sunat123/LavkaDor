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
  { question: "Кто является главной героиней дорамы?", options:["Кан Бит На","Пак Чжэ Ён","Чон Сон Хун","Юн Ми Ра"], correct:0 },
  { question: "Кем Кан Бит На является на самом деле?", options:["Ангелом","Демоном","Человеком","Жнецом"], correct:1 },
  { question: "Какую должность занимает Кан Бит На в мире людей?", options:["Прокурор","Судья","Адвокат","Следователь"], correct:1 },
  { question: "Из какого мира прибыла Бит На?", options:["Рай","Подземный мир","Ад","Чистилище"], correct:2 },
  { question: "В чём состоит её миссия?", options:["Спасать души","Наказывать грешников","Искупать грехи","Защищать людей"], correct:1 },
  { question: "Кто становится напарником Бит На?", options:["Детектив","Прокурор","Адвокат","Полицейский-новичок"], correct:0 },
  { question: "Как зовут детектива, работающего с ней?", options:["Хан Да Он","Ли Джун Сок","Кан Ён Джун","Пак Мин Чхоль"], correct:0 },
  { question: "Как Бит На относится к людям в начале дорамы?", options:["С сочувствием","С любопытством","С презрением","С любовью"], correct:2 },
  { question: "Что происходит с преступниками после суда Бит На?", options:["Их оправдывают","Их сажают в тюрьму","Их души отправляют в ад","Они исчезают"], correct:2 },
  { question: "Почему Бит На начинает сомневаться в своей миссии?", options:["Из-за ошибок","Из-за чувств","Из-за приказов ада","Из-за людей"], correct:1 },
  { question: "Какой характер у детектива Да Она?", options:["Жестокий","Холодный","Справедливый","Коварный"], correct:2 },
  { question: "Что отличает суд Бит На от обычного суда?", options:["Быстрота","Тайные наказания","Абсолютная справедливость","Магия"], correct:2 },
  { question: "Как ад относится к колебаниям Бит На?", options:["Поддерживает","Наказывает","Игнорирует","Поощряет"], correct:1 },
  { question: "Что постепенно пробуждается в Бит На?", options:["Страх","Сомнение","Человечность","Ненависть"], correct:2 },
  { question: "Кто следит за действиями Бит На со стороны ада?", options:["Верховный демон","Ангел","Судья душ","Посланник ада"], correct:3 },
  { question: "Почему детектив начинает доверять Бит На?", options:["Она помогает ему","Он узнаёт правду","Видит результаты","Его заставляют"], correct:2 },
  { question: "Какая главная тема дорамы?", options:["Политика","Возмездие и мораль","Деньги","Любовный треугольник"], correct:1 },
  { question: "Что Бит На считает самым тяжёлым испытанием?", options:["Наказания","Жизнь среди людей","Чувства к детективу","Приказы ада"], correct:2 },
  { question: "Что происходит с теми, кто раскаивается искренне?", options:["Их всё равно наказывают","Их прощают","Их судят иначе","Они исчезают"], correct:2 },
  { question: "Как меняется Бит На со временем?", options:["Становится жестче","Теряет силы","Учится состраданию","Хочет вернуться в ад"], correct:2 },
  { question: "Что символизирует суд Бит На?", options:["Страх","Кару","Абсолютную справедливость","Судьбу"], correct:2 },
  { question: "Почему ад считает Бит На опасной?", options:["Она слишком сильна","Она нарушает правила","Она любит людей","Она хочет сбежать"], correct:1 },
  { question: "Какую роль играет детектив в её изменениях?", options:["Враг","Контроль","Катализатор","Наблюдатель"], correct:2 },
  { question: "Как люди реагируют на решения Бит На?", options:["Поддерживают","Боятся","Не замечают","Протестуют"], correct:1 },
  { question: "Что происходит, когда Бит На проявляет милосердие?", options:["Ад вмешивается","Она теряет силы","Люди меняются","Ничего"], correct:0 },
  { question: "Какая дилемма стоит перед Бит На?", options:["Карьера или семья","Закон или ад","Приказ или совесть","Любовь или долг"], correct:2 },
  { question: "Чем Бит На отличается от других демонов?", options:["Слабостью","Эмоциями","Жестокостью","Амбициями"], correct:1 },
  { question: "Как ад наказывает неповиновение?", options:["Изгнанием","Лишением силы","Пытками","Смертью"], correct:1 },
  { question: "Какое преступление чаще всего рассматривается в дораме?", options:["Кражи","Насилие","Убийства","Коррупция"], correct:2 },
  { question: "Как Бит На относится к справедливости в финале?", options:["Слепо следует аду","Отказывается судить","Создаёт собственные правила","Возвращается в ад"], correct:2 },
  { question: "Что чувствует детектив к Бит На?", options:["Страх","Ненависть","Доверие и симпатию","Равнодушие"], correct:2 },
  { question: "Какую цену платит Бит На за изменения?", options:["Потерю должности","Потерю силы","Наказание ада","Всё перечисленное"], correct:3 },
  { question: "Что показывает дорама через демонический суд?", options:["Закон несовершенен","Люди не меняются","Справедливость сложна","Ад сильнее всех"], correct:2 },
  { question: "Какое качество Бит На развивается сильнее всего?", options:["Гнев","Сострадание","Страх","Холодность"], correct:1 },
  { question: "Что происходит с миссией Бит На в конце?", options:["Она провалена","Она изменена","Она завершена","Она отменена"], correct:1 },
  { question: "Как ад относится к людям?", options:["Защищает","Использует","Презирает","Испытывает"], correct:2 },
  { question: "Что является главным конфликтом дорамы?", options:["Любовь","Борьба миров","Человечность против долга","Власть"], correct:2 },
  { question: "Что даёт Бит На жизнь среди людей?", options:["Слабость","Понимание","Силу","Желание сбежать"], correct:1 },
  { question: "Какое решение Бит На принимает в финале?", options:["Возвращается в ад","Остаётся человеком","Меняет систему суда","Исчезает"], correct:2 },
  { question: "Какой главный посыл дорамы?", options:["Кара важнее всего","Все заслуживают наказания","Справедливость без человечности опасна","Ад — единственный судья"], correct:2 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Судья из ада\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Судья из ада\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "💜"; name.innerText = "Эксперт"; desc.innerText = "Настоящий знаток судьи из ада 💜. Еще немного до Максимума!";
    } else {
        badge.innerText = "⚖️"; name.innerText = "Высший Судья"; desc.innerText = "Ты вершишь правосудие так же метко, как Бит На. Твой уровень максимальный!";
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
  const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Судья из ада»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
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
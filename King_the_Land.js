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
  { question: "Как зовут главного героя-наследника?", options:["Ку Вон","Чан Сон У","Со Чжун Хо","Ли Мин Су"], correct:0 },
  { question: "Где работает главная героиня Чхон Са Ран?", options:["В ресторане","В магазине","В отеле King","В офисе"], correct:2 },
  { question: "Главная черта Са Ран на работе?", options:["Строгость","Искреннюю улыбку","Холодность","Медлительность"], correct:1 },
  { question: "Почему Ку Вон не любит фальшивые улыбки?", options:["Из-за работы","Из-за прошлого","Из-за семьи","Из-за характера"], correct:1 },
  { question: "Кем является Ку Вон в корпорации King Group?", options:["Менеджер","Директор","Наследник","Консультант"], correct:2 },
  { question: "Как сначала Ку Вон относится к Са Ран?", options:["С теплом","С равнодушием","С раздражением","С восхищением"], correct:2 },
  { question: "Что отличает отель King the Land?", options:["Цены","Роскошь и сервис","Размер","Расположение"], correct:1 },
  { question: "Какая мечта у Са Ран?", options:["Стать директором","Работать за границей","Работать в King the Land","Открыть бизнес"], correct:2 },
  { question: "Кто является главным соперником Ку Вона?", options:["Друг","Брат","Сестра","Кузен"], correct:2 },
  { question: "Какой характер у Ку Вона?", options:["Мягкий","Холодный и прямолинейный","Весёлый","Робкий"], correct:1 },
  { question: "Что постепенно меняет Ку Вона?", options:["Деньги","Работа","Са Ран","Соперничество"], correct:2 },
  { question: "Как Са Ран относится к клиентам?", options:["Формально","С заботой","С безразличием","С раздражением"], correct:1 },
  { question: "Что символизирует улыбка Са Ран?", options:["Обман","Профессионализм и доброту","Слабость","Подчинение"], correct:1 },
  { question: "Где часто пересекаются главные герои?", options:["В офисе","В лифте","В King the Land","В ресторане"], correct:2 },
  { question: "Как развивается их отношение?", options:["Быстро","Через конфликты","Без препятствий","Сразу романтично"], correct:1 },
  { question: "Что Ку Вон ценит в Са Ран?", options:["Внешность","Искренность","Статус","Опыт"], correct:1 },
  { question: "Как Са Ран влияет на атмосферу в отеле?", options:["Делает строже","Делает теплее","Не влияет","Ухудшает"], correct:1 },
  { question: "Почему Ку Вон возвращается в Корею?", options:["Учёба","Болезнь","Работа и наследство","Са Ран"], correct:2 },
  { question: "Какую проблему семьи раскрывает сюжет?", options:["Бедность","Недоверие","Борьбу за власть","Тайну прошлого"], correct:2 },
  { question: "Что важнее для Ку Вона в финале?", options:["Деньги","Власть","Люди","Репутация"], correct:2 },
  { question: "Как Са Ран реагирует на трудности?", options:["Сдаётся","Плачет","Работает ещё усерднее","Уходит"], correct:2 },
  { question: "Как сериал показывает мир обслуживания?", options:["Лёгким","Гламурным","Сложным и требовательным","Нереалистичным"], correct:2 },
  { question: "Как меняется Ку Вон как лидер?", options:["Становится жестче","Становится человечнее","Не меняется","Теряет контроль"], correct:1 },
  { question: "Что мешает их отношениям?", options:["Деньги","Социальный статус","Расстояние","Ревность"], correct:1 },
  { question: "Кто поддерживает Са Ран на работе?", options:["Начальство","Клиенты","Подруги","Ку Вон"], correct:2 },
  { question: "Какую ценность подчёркивает дорама?", options:["Карьеру","Честность","Искренние чувства","Конкуренцию"], correct:2 },
  { question: "Как Ку Вон относится к сотрудникам?", options:["С высока","С уважением","Безразлично","Строго"], correct:1 },
  { question: "Что становится поворотным моментом в отношениях?", options:["Ссора","Признание","Разлука","Совместная работа"], correct:3 },
  { question: "Как Са Ран влияет на решения Ку Вона?", options:["Никак","Делает их мягче","Делает рискованнее","Делает эгоистичными"], correct:1 },
  { question: "Чем заканчивается борьба за наследство?", options:["Проигрышем Ку Вона","Компромиссом","Победой Ку Вона","Отказом от власти"], correct:2 },
  { question: "Какой тон у дорамы?", options:["Трагичный","Лёгкий и романтичный","Мрачный","Напряжённый"], correct:1 },
  { question: "Что делает Са Ран сильной героиней?", options:["Характер","Деньги","Поддержка","Статус"], correct:0 },
  { question: "Как сериал показывает любовь?", options:["Как сделку","Как поддержку","Как зависимость","Как слабость"], correct:1 },
  { question: "Что Ку Вон учится принимать?", options:["Прошлое","Чувства","Ответственность","Всё перечисленное"], correct:3 },
  { question: "Какую роль играет отель в сюжете?", options:["Фон","Символ статуса","Место роста героев","Препятствие"], correct:2 },
  { question: "Что Са Ран ценит в работе больше всего?", options:["Деньги","Признание","Искренность","Карьеру"], correct:2 },
  { question: "Какой главный конфликт дорамы?", options:["Любовный треугольник","Работа vs чувства","Власть и человечность","Деньги и статус"], correct:2 },
  { question: "Какой образ жизни выбирает Ку Вон в конце?", options:["Только бизнес","Баланс","Отказ от любви","Уход из компании"], correct:1 },
  { question: "Как сериал относится к улыбке?", options:["Как к маске","Как к профессии","Как к искренности","Как к обязанности"], correct:2 },
  { question: "Главный посыл «Короля земли»?", options:["Деньги важнее всего","Власть решает","Искренность меняет людей","Любовь — слабость"], correct:2 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Король земли\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
  if(percent <= 30) rank = "Гость";
  else if(percent <= 60) rank = "Сотрудник";
  else if(percent <= 85) rank = "VVIP Менеджер";
  else rank = "Король Земли 👑";
  
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

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Король земли\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "🌱"; name.innerText = "Гость"; desc.innerText = "Вы только забронировали номер в King! До Сотрудника нужно " + (Math.ceil(quiz.length*0.31) - score) + " отв.";
    } else if(percent <= 60) {
        badge.innerText = "🏨"; name.innerText = "Сотрудник"; desc.innerText = "Ваша улыбка почти искренняя! До Менеджера осталось " + (Math.ceil(quiz.length*0.61) - score) + " отв.";
    } else if(percent <= 85) {
        badge.innerText = "✨"; name.innerText = "VVIP Менеджер"; desc.innerText = "Вы знаете всё о сервисе в King the Land! Почти Король!";
    } else {
        badge.innerText = "👑"; name.innerText = "Король Земли"; desc.innerText = "Вы владелец отеля и знаток сердец! Максимальный ранг!";
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
  const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Король земли»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
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
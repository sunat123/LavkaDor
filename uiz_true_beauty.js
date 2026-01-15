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
  { question: "Как зовут главную героиню дорамы?", options:["Кан Су-джин","Им Джу-гён","Чу Гён-хи","Ли Со-ён"], correct:1 },
  { question: "Почему Джу-гён меняет школу?", options:["Из-за переезда","Из-за плохих оценок","Из-за травли","Из-за болезни"], correct:2 },
  { question: "Что помогает Джу-гён стать «красивой»?", options:["Диета","Пластическая операция","Макияж","Новая одежда"], correct:2 },
  { question: "Кто первым узнаёт настоящую внешность Джу-гён без макияжа?", options:["Хан Со-джун","Кан Су-джин","Ли Су-хо","Учитель"], correct:2 },
  { question: "Где Су-хо видит Джу-гён без макияжа впервые?", options:["В школе","В кино","В магазине комиксов","В больнице"], correct:2 },
  { question: "Какой жанр музыки любит Хан Со-джун?", options:["Классика","K-pop","Рок","Хип-хоп"], correct:2 },
  { question: "Кем мечтает стать Джу-гён?", options:["Актрисой","Визажистом","Учителем","Моделью"], correct:1 },
  { question: "Какой предмет лучше всего даётся Су-хо?", options:["История","Математика","Физкультура","Литература"], correct:1 },
  { question: "Почему Су-хо замкнутый?", options:["Из-за болезни","Из-за проблем в семье","Из-за переезда","Из-за школы"], correct:1 },
  { question: "Кто является отцом Су-хо?", options:["Учитель","Врач","Известный актёр","Бизнесмен"], correct:2 },
  { question: "Как зовут лучшую подругу Джу-гён в новой школе?", options:["Су-а","Хе-ин","Су-джин","Ми-ён"], correct:0 },
  { question: "Кто раньше был дружил с Су-хо и Со-джуном?", options:["Джу-гён","Сэ-ён","Су-джин","Учитель"], correct:1 },
  { question: "Почему поссорились Су-хо и Со-джун?", options:["Из-за девушки","Из-за денег","Из-за смерти друга","Из-за школы"], correct:2 },
  { question: "Какой страх есть у Джу-гён?", options:["Высоты","Темноты","Быть раскрытой без макияжа","Экзаменов"], correct:2 },
  { question: "Как одноклассники относятся к Джу-гён в новой школе?", options:["Плохо","Нейтрально","Враждебно","С восхищением"], correct:3 },
  { question: "Кто раньше был «королевой красоты» школы?", options:["Джу-гён","Су-джин","Хе-ин","Су-а"], correct:1 },
  { question: "Что скрывает Су-джин от окружающих?", options:["Настоящий характер","Возраст","Семью","Болезнь"], correct:0 },
  { question: "Где Джу-гён чувствует себя по-настоящему спокойно?", options:["В школе","Дома","В магазине комиксов","На улице"], correct:2 },
  { question: "Какой фильм любят смотреть Джу-гён и Су-хо?", options:["Романтический","Ужасы","Комедия","Мультфильм"], correct:1 },
  { question: "Кто помогает Джу-гён с макияжем в начале?", options:["Мама","Подруга","Интернет-уроки","Учитель"], correct:2 },
  { question: "Как Со-джун проявляет заботу о Джу-гён?", options:["Дарит подарки","Защищает её","Игнорирует","Подшучивает"], correct:1 },
  { question: "Какой стиль у Со-джуна?", options:["Классический","Спортивный","Бунтарский","Деловой"], correct:2 },
  { question: "Что случается, когда раскрывается секрет Джу-гён?", options:["Её поддерживают","Её снова начинают травить","Все молчат","Она уезжает"], correct:1 },
  { question: "Кто поддерживает Джу-гён в самый трудный момент?", options:["Су-джин","Со-джун","Су-хо","Учитель"], correct:2 },
  { question: "Почему Су-хо уезжает?", options:["Учёба","Работа","Болезнь отца","Из-за Джу-гён"], correct:2 },
  { question: "Как меняется Джу-гён к концу дорамы?", options:["Становится холодной","Перестаёт краситься","Принимает себя","Уезжает"], correct:2 },
  { question: "Какой главный посыл дорамы?", options:["Деньги важнее всего","Внешность решает всё","Важно принимать себя","Любовь — это боль"], correct:2 },
  { question: "Кто играет роль Ли Су-хо?", options:["Ча Ын-у","Ким Су-хён","Ли Мин-хо","Пак Со-джун"], correct:0 },
  { question: "Кто играет Им Джу-гён?", options:["Айю","Мун Га-ён","Пак Мин-ён","Ким Джи-вон"], correct:1 },
  { question: "Сколько серий в дораме?", options:["12","14","16","20"], correct:2 },
  { question: "Какой жанр у дорамы?", options:["Детектив","Ужасы","Романтическая комедия","Фантастика"], correct:2 },
  { question: "Что Джу-гён больше всего боится потерять?", options:["Деньги","Друзей","Любовь","Себя настоящую"], correct:3 },
  { question: "Как Со-джун относится к Су-хо со временем?", options:["Ненавидит","Игнорирует","Прощает","Боится"], correct:2 },
  { question: "Кто первым принимает Джу-гён такой, какая она есть?", options:["Мама","Со-джун","Су-хо","Подруги"], correct:2 },
  { question: "Какую проблему поднимает дорама?", options:["Экология","Школьное насилие","Политика","Работа"], correct:1 },
  { question: "Что символизирует макияж в дораме?", options:["Обман","Защиту","Уверенность","Красоту"], correct:1 },
  { question: "Какую эмоцию чаще всего скрывает Джу-гён?", options:["Радость","Гнев","Страх","Любовь"], correct:2 },
  { question: "Чем заканчивается история Джу-гён и Су-хо?", options:["Разлукой","Дружбой","Они вместе","Открытым финалом"], correct:2 },
  { question: "Что помогает героям исцелиться?", options:["Время","Любовь и поддержка","Деньги","Переезд"], correct:1 },
  { question: "Почему дорама так полюбилась зрителям?", options:["Из-за юмора","Из-за актёров","Из-за жизненной темы","Всё перечисленное"], correct:3 }
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
    
    sendToTelegram(`📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Истинная красота\n📊 Статус: Начал викторину\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`);
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
  else rank = "Настоящая красота 💖";
  
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

  const finalMsg = `📩 <b>Новое прохождение LavkaDor</b>\n🆔 ID: ${getUserId()}\n🎬 Дорама: Истинная красота\n📊 Результат: ${score} / ${quiz.length}\n💯 Процент: ${percent}%\n⏱ Время: ${mins} мин ${secs} сек\n📱 Устройство: ${/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'телефон' : 'ПК'}`;
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
        badge.innerText = "💜"; name.innerText = "Эксперт"; desc.innerText = "Настоящий фанат Истинной красоты 💜. Еще немного до Максимума!";
    } else {
        badge.innerText = "👑"; name.innerText = "Истинная красота 👑"; desc.innerText = "Ты прожил эту дораму сердцем. Твой уровень максимальный!";
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
  const text = `👑 Я получил ранг: ${rankName}\n📺 Викторина «Истинная красота»\n🎯 Результат: ${score}/${quiz.length}\n\nПроверь себя 👉 @lavkador`;
  
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
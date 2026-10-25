document.documentElement.classList.remove('no-js');

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
document.documentElement.style.scrollBehavior = 'auto';
window.scrollTo(0, 0);
setTimeout(function() { document.documentElement.style.scrollBehavior = ''; }, 10);

(function () {
  'use strict';

  var isOnline = location.protocol === 'http:' || location.protocol === 'https:';
  var basePath = isOnline ? '/Math_problem_generator/does/' : './';

  // 默认配置
  var siteConfig = {
    badgeText: "GMP 出题引擎现已更新至 V1.0 版本，支持随机题库，欢迎体验",
    badgeLink: "./practice.html",
    startTime: "2026/10/24 17:11:00"
  };

  // 尝试读取 config.json
  fetch(basePath + 'config.json')
    .then(function(res) { return res.json(); })
    .then(function(data) {
      siteConfig = Object.assign(siteConfig, data);
    })
    .catch(function() { /* 本地双击读取失败，使用默认值 */ })
    .then(function() {
      // 应用配置
      var badgeLinkEl = document.getElementById('config-badge-link');
      if (badgeLinkEl) badgeLinkEl.href = siteConfig.badgeLink;

      var badgeTextEl = document.getElementById('config-badge-text');
      if (badgeTextEl) badgeTextEl.textContent = siteConfig.badgeText;

      // 启动计时器
      startRuntime(siteConfig.startTime);
    });

  // 延迟加载不蒜子，防止标签页转圈
  setTimeout(function() {
    var script = document.createElement('script');
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    script.async = true;
    script.onerror = function() {
      var uvEl = document.getElementById('busuanzi_value_site_uv');
      if (uvEl) uvEl.textContent = '统计失败';
    };
    document.body.appendChild(script);
  }, 1000);

  // ================= 运行时间计算逻辑 =================
  function startRuntime(timeStr) {
    var startTime = new Date(timeStr).getTime();
    if (isNaN(startTime)) startTime = new Date().getTime(); 

    function updateRuntime() {
      var now = new Date().getTime();
      var diff = now - startTime;

      if (diff < 0) diff = 0; 

      var totalSec = Math.floor(diff / 1000);
      var sec = totalSec % 60;
      var totalMin = Math.floor(totalSec / 60);
      var min = totalMin % 60;
      var totalHour = Math.floor(totalMin / 60);
      var hour = totalHour % 24;
      var day = Math.floor(totalHour / 24);

      var elDay = document.getElementById('rt-day');
      if (elDay) {
        elDay.textContent = day;
        document.getElementById('rt-hour').textContent = hour;
        document.getElementById('rt-min').textContent = min;
        document.getElementById('rt-sec').textContent = sec;
      }
    }

    setInterval(updateRuntime, 500);
    updateRuntime();
  }

  // ================= I18n 切换逻辑 =================
  var fallbackI18nDict = {
    zh: {
      badge: "GMP 出题引擎现已更新至 V1.0 版本，支持随机题库，欢迎体验",
      "runtime-label": "本站已稳定运行：",
      "unit-day": "天",
      "unit-hour": "时",
      "unit-min": "分",
      "unit-sec": "秒",
      placeholder: "描述你的年级，或点击发送开始出题...",
      "feature-eyebrow": "核心特性",
      "feature-title": "为什么选择 GMP 出题引擎？",
      "feature-sub": "我们致力于提供极致的数学练习体验，将纯粹的算法逻辑与现代化的前端交互完美结合。",
      "card1-title": "极客终端交互",
      "card1-desc": "告别枯燥的静态网页，采用终端风格界面与打字机逐字输出特效，带来沉浸式的答题体验。题目以代码流的形态一行行浮现，让每一次练习都像在调试一段有趣的程序。",
      "card2-title": "动态随机题库",
      "card2-desc": "内置 Python 逻辑迁移的算法，每次运行都会随机生成不同的巡逻车坐标数据，无限拓展练习场景。同一道题型，不同的数字，让机械刷题变成真正的思维训练。",
      "card3-title": "随时随地，开启高效练习",
      "card3-desc": "无需下载安装，打开网页即可使用。轻量级前端架构，无论是在电脑还是手机，随时随地开启你的数学思维训练。让每一次碎片时间都变得有价值，助你轻松提分。",
      "card3-link": "立即使用 →",
      "card3-notice": "仅限于GMP出题引擎网页版",
      "card4-title": "大道至简，专注纯粹体验",
      "card4-desc": "摒弃一切花哨多余的干扰，将界面做到极致简洁。无需繁琐注册，打开即用，一键出题。用最简单的操作，最高效地提升你的数学成绩。"
    },
    en: {
      badge: "GMP Engine is now updated to V1.0. Random question bank supported. Welcome!",
      "runtime-label": "Uptime: ",
      "unit-day": "d ",
      "unit-hour": "h ",
      "unit-min": "m ",
      "unit-sec": "s",
      placeholder: "Describe your grade, or click send to start...",
      "feature-eyebrow": "Core Features",
      "feature-title": "Why Choose GMP Engine?",
      "feature-sub": "We are dedicated to providing the ultimate math practice experience, combining pure algorithm logic with modern frontend interactions.",
      "card1-title": "Geek Terminal Interaction",
      "card1-desc": "Say goodbye to boring static pages. Terminal-style UI and typewriter effects bring an immersive answering experience. Questions surface line by line like a code stream, making every practice session feel like debugging an interesting program.",
      "card2-title": "Dynamic Random Bank",
      "card2-desc": "Built with logic migrated from Python, generating unique patrol car coordinates every time for infinite practice. Same problem type, different numbers, turning mechanical drills into real thinking training.",
      "card3-title": "Practice Anytime, Anywhere",
      "card3-desc": "No download required. Open the webpage and start instantly. A lightweight frontend architecture for math training on any device, anytime. Make every spare moment count and boost your scores effortlessly.",
      "card3-link": "Start Now →",
      "card3-notice": "Web version only",
      "card4-title": "Simplicity in Every Click",
      "card4-desc": "Strip away the distractions for a purely focused experience. An extremely clean interface with no registration required. Just open, click, and generate. Boost your math skills with the simplest and most efficient workflow."
    }
  };

  function fallbackI18n() {
    var btnZh = document.getElementById('btn-zh');
    var btnEn = document.getElementById('btn-en');
    var slider = document.getElementById('locale-slider');
    if (!btnZh || !btnEn) return;

    function setLang(lang) {
      if (lang === 'zh') {
        btnZh.classList.add('is-active');
        btnEn.classList.remove('is-active');
        if (slider) slider.style.transform = 'translateX(0)';
      } else {
        btnEn.classList.add('is-active');
        btnZh.classList.remove('is-active');
        if (slider) slider.style.transform = 'translateX(100%)';
      }

      var dict = fallbackI18nDict[lang] || fallbackI18nDict.zh;
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (dict[key] != null && key !== 'badge') el.textContent = dict[key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] != null) el.setAttribute('placeholder', dict[key]);
      });
    }
    btnZh.addEventListener('click', function () { setLang('zh'); });
    btnEn.addEventListener('click', function () { setLang('en'); });
  }

  // ================= 滚动特效与卡片逻辑 =================
  function fallbackScroll() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.reveal-card'));
    var header = document.querySelector('.ds-header');
    function update() {
      var vh = window.innerHeight;
      var center = vh / 2;
      var closestIndex = -1;
      var minDistance = Infinity;
      for (var i = 0; i < cards.length; i++) {
        var rect = cards[i].getBoundingClientRect();
        var cardCenter = rect.top + rect.height / 2;
        var distance = Math.abs(cardCenter - center);
        if (distance < minDistance) { minDistance = distance; closestIndex = i; }
      }
      for (var j = 0; j < cards.length; j++) {
        if (j === closestIndex) { cards[j].classList.remove('is-passed'); cards[j].classList.add('is-visible'); }
        else if (j < closestIndex) { cards[j].classList.remove('is-visible'); cards[j].classList.add('is-passed'); }
        else { cards[j].classList.remove('is-visible'); cards[j].classList.remove('is-passed'); }
      }
      if (header) {
        var scrollY = window.scrollY;
        var opacity = 1 - (scrollY / 150);
        header.style.opacity = opacity < 0 ? 0 : (opacity > 1 ? 1 : opacity);
        header.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
      }
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ================= 终端打字演示逻辑 =================
  function fallbackGenerate(grade) {
    if (grade !== 7) return "目前题库仅支持七年级数学。";
    var desc = "一辆巡逻车从岗亭出发(岗亭记为原点0)，规定向东为正、向西为负。\n巡逻车在一段时间内的行驶记录如下(单位:千米):\n";
    var nums = [];
    var count = Math.floor(Math.random() * 6) + 4;
    for (var i = 0; i < count; i++) {
      var num = Math.floor(Math.random() * 41) - 20;
      nums.push(num > 0 ? "+" + num : "" + num);
    }
    var record = nums.join("、") + "\n\n";

    var questions = [
      "巡逻车最后停在什么位置？在岗亭的哪个方向，有多远？",
      "这次巡逻一共行驶了多少千米？",
      "若巡逻车每千米耗油0.1升，这次巡逻共耗油多少升？"
    ];

    var randomIndex = Math.floor(Math.random() * questions.length);
    var selectedQuestion = "(1)" + questions[randomIndex];

    return desc + record + selectedQuestion;
  }

  var timer = null;
  var basePrefix = "你好，我是你的出题 AI-GMP\n\n";

  function startMiniTerminal() {
    var out = document.getElementById('card-terminal-output');
    if (!out) return;

    var generateQuestion = window.__GMP_GENERATOR__ || fallbackGenerate;
    var typeSpeed = 50; 
    var deleteSpeed = 25; 

    function loop() {
      var questionText = generateQuestion(7);
      var fullText = basePrefix + questionText;

      out.textContent = basePrefix;
      var cursor = document.createElement('span');
      cursor.className = 'cursor';
      out.appendChild(cursor);

      var currentLength = basePrefix.length;

      function typeStep() {
        if (currentLength < fullText.length) {
          currentLength++;
          var displayText = fullText.substring(0, currentLength);

          out.textContent = displayText;
          out.appendChild(cursor);

          timer = setTimeout(typeStep, typeSpeed);
        } else {
          timer = setTimeout(deleteStep, 2500);
        }
      }

      function deleteStep() {
        if (currentLength > basePrefix.length) {
          currentLength--;
          var displayText = fullText.substring(0, currentLength);

          out.textContent = displayText;
          out.appendChild(cursor);

          timer = setTimeout(deleteStep, deleteSpeed);
        } else {
          timer = setTimeout(loop, 500);
        }
      }

      typeStep();
    }

    loop();
  }

  // ================= 模块加载与初始化 =================
  Promise.all([
    import(basePath + 'js/ui.js').catch(function () { return null; }),
    import(basePath + 'js/i18n.js').catch(function () { return null; }),
    import(basePath + 'js/generator.js').catch(function () { return null; })
  ]).then(function (mods) {
    var uiMod = mods[0];
    var i18nMod = mods[1];
    var genMod = mods[2];

    if (uiMod && uiMod.initScroll) { uiMod.initScroll(); } else { fallbackScroll(); }
    if (i18nMod && i18nMod.initI18n) { i18nMod.initI18n(); } else { fallbackI18n(); }
    if (genMod && genMod.generateQuestion) { window.__GMP_GENERATOR__ = genMod.generateQuestion; }

    startMiniTerminal();
  }).catch(function () {
    fallbackScroll();
    fallbackI18n();
    startMiniTerminal();
  });

  // 按钮点击滚动
  var btn = document.getElementById('start-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      var section = document.getElementById('features');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
})();

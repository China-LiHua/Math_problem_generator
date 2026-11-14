window.GMP_Practice = (function () {
  'use strict';

  var currentAnswer = "";
  var terminalAnswer = "";
  var typeTimer = null;
  var isTerminalMode = false;

  function setView(type) {
    var normalView = document.getElementById('normal-view');
    var terminalView = document.getElementById('terminal-view');
    var slider = document.getElementById('view-slider');
    var btnNormal = document.getElementById('btn-normal');
    var btnTerminal = document.getElementById('btn-terminal');

    if (type === 'normal') {
      isTerminalMode = false;
      if (typeTimer) clearTimeout(typeTimer);
      normalView.style.display = 'block';
      terminalView.style.display = 'none';
      slider.style.transform = 'translateX(0)';
      btnNormal.classList.add('active');
      btnTerminal.classList.remove('active');
    } else {
      isTerminalMode = true;
      normalView.style.display = 'none';
      terminalView.style.display = 'flex';
      slider.style.transform = 'translateX(100%)';
      btnTerminal.classList.add('active');
      btnNormal.classList.remove('active');
      startTerminalTyping();
    }
  }

  function startTerminalTyping() {
    if (!isTerminalMode) return;
    if (typeTimer) clearTimeout(typeTimer);

    var out = document.getElementById('terminal-output');
    var actions = document.getElementById('terminal-actions');
    var btnAnswer = document.getElementById('btn-term-answer');

    actions.style.display = 'none';
    btnAnswer.style.display = 'inline-block';

    if (!window.GMP_Generator) {
      out.textContent = "出题组件加载失败，请检查网络或刷新重试。";
      return;
    }

    var basePrefix = "你好，我是你的出题 AI-GMP\n\n";
    var data = window.GMP_Generator.generateData();
    terminalAnswer = data.answer;
    var fullText = basePrefix + data.question;

    out.textContent = basePrefix;
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    out.appendChild(cursor);

    var currentLength = basePrefix.length;

    var oldAnswer = document.getElementById('term-answer-line');
    if (oldAnswer) oldAnswer.remove();

    function typeStep() {
      if (!isTerminalMode) return;
      if (currentLength < fullText.length) {
        currentLength++;
        out.textContent = fullText.substring(0, currentLength);
        out.appendChild(cursor);
        typeTimer = setTimeout(typeStep, 40);
        out.scrollTop = out.scrollHeight;
      } else {
        actions.style.display = 'flex';
      }
    }
    typeStep();
  }

  function showTerminalAnswer() {
    var out = document.getElementById('terminal-output');
    var btnAnswer = document.getElementById('btn-term-answer');
    if (document.getElementById('term-answer-line')) return;

    var ansLine = document.createElement('div');
    ansLine.id = 'term-answer-line';
    ansLine.style.marginTop = '20px';
    ansLine.style.color = '#4af626';
    ansLine.textContent = '> ' + terminalAnswer;

    out.appendChild(ansLine);
    btnAnswer.style.display = 'none';
    out.scrollTop = out.scrollHeight;
  }

  function regenerateTerminal() {
    startTerminalTyping();
  }

  function generateNewNormal() {
    if (!window.GMP_Generator) {
      document.getElementById('question-text').textContent = "出题组件加载失败，请刷新页面重试。";
      return;
    }
    var data = window.GMP_Generator.generateData();
    document.getElementById('question-text').textContent = data.question;
    currentAnswer = data.answer;
    document.getElementById('answer-text').style.display = 'none';
    document.getElementById('toggle-btn').textContent = '查看答案';
  }

  function toggleAnswer() {
    var ansDiv = document.getElementById('answer-text');
    var btn = document.getElementById('toggle-btn');
    if (ansDiv.style.display === 'block') {
      ansDiv.style.display = 'none';
      btn.textContent = '查看答案';
    } else {
      ansDiv.textContent = currentAnswer;
      ansDiv.style.display = 'block';
      btn.textContent = '隐藏答案';
    }
  }

  // 既然脚本放在了 body 最底部，直接调用即可，保证页面一出现就有题目
  try {
    generateNewNormal();
  } catch (e) {
    console.error("初始化出题失败:", e);
    document.getElementById('question-text').textContent = "加载题目出错，请按 F12 查看控制台。";
  }

  return {
    setView: setView,
    showTerminalAnswer: showTerminalAnswer,
    regenerateTerminal: regenerateTerminal,
    generateNewNormal: generateNewNormal,
    toggleAnswer: toggleAnswer
  };
})();

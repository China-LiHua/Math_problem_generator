/* 用 insertBefore 插入文本节点，避免 innerHTML += 反复重解析导致卡顿 */
export function typeWriter(element, text, speed) {
  speed = speed || 30;
  if (!element) return;
  element.textContent = '';
  var cursor = document.createElement('span');
  cursor.className = 'cursor';
  element.appendChild(cursor);
  var i = 0;
  function step() {
    if (i >= text.length) return;
    element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
    i++;
    setTimeout(step, speed);
  }
  step();
}

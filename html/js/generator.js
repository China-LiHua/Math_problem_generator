export function generateQuestion(grade) {
  if (grade !== 7) return "目前题库仅支持七年级数学。";

  var desc = "一辆巡逻车从岗亭出发(岗亭记为原点0)，规定向东为正、向西为负。\n巡逻车在一段时间内的行驶记录如下(单位:千米):\n";
  var nums = [];
  var count = Math.floor(Math.random() * 6) + 4; // 随机 4-9 个数字

  for (var i = 0; i < count; i++) {
    var num = Math.floor(Math.random() * 41) - 20; // -20 到 20
    nums.push(num > 0 ? "+" + num : "" + num);
  }

  var record = nums.join("、") + "\n\n";

  // 题库：只保留题干
  var questions = [
    "巡逻车最后停在什么位置？在岗亭的哪个方向，有多远？",
    "这次巡逻一共行驶了多少千米？",
    "若巡逻车每千米耗油0.1升，这次巡逻共耗油多少升？"
  ];

  // 随机抽取 1 道题
  var randomIndex = Math.floor(Math.random() * questions.length);
  var selectedQuestion = "(1)" + questions[randomIndex];

  return desc + record + selectedQuestion;
}

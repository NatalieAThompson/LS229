const readline = require('readline-sync');

const nameCondition = (name) => (name || '').match(/^\w+$/);
const numCondition = (num) => Number.isInteger(num);
const yesNoCondition = (char) => (char || '').match(/^[YyNn]$/);

function valid(conditionFunc, argument) {
  return conditionFunc(argument);
}

function num(question) {
  let answer;
  while (!valid(numCondition, answer)) {
    answer = Number(readline.question(question));
  }

  return answer;
}

function setName(question) {
  let name;
  while (!valid(nameCondition, name)) {
    name = readline.question(question);
  }

  return name;
}

function yesNo(question) {
  let answer;
  while (!valid(yesNoCondition, answer)) {
    answer = readline.question(question);
  }

  return answer;
  // return 'y'; // add validation later.
}

module.exports = {
  num,
  yesNo,
  setName,
};
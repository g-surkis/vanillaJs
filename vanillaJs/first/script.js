const body = document.getElementsByTagName("body")[0];

const coinsChange = (coins, sum) => {
  const arrayChange = [];
  let total = 0;
  for (let i = coins.length - 1; i >= 0; i--) {
    const coin = coins[i];
    while (total + coin <= sum * 100) {
      arrayChange.push(coin);
      total += coin;
    }
  }
  return arrayChange;
};

const renderDollarsResult = dollars => {
  if (dollars === 0) return "0 ";
  if (dollars > 0 && dollars < 5) return `${dollars} долари`;
  return `${dollars} доларів`;
};

const renderCoinsResult = coins => {
  return coins.reduce((acc, current) => {
    return (acc += ` ${current} ${current === 1 ? "цент," : "центів,"}`);
  }, "");
};

const roundDigit = number => Math.round(number * 100) / 100;

const change = coins => changeSum => {
  const change = changeSum - parseInt(changeSum);
  return {
    dollars: parseInt(changeSum),
    coins: coinsChange(coins, roundDigit(change)),
    change: roundDigit(changeSum)
  };
};

const getChange = change([1, 5, 10, 25, 50]);

const createInputBlock = (labelName, className) => {
  const block = document.createElement("div");
  const input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  const label = document.createElement("span");
  label.textContent = labelName;
  block.append(label, input);
  block.classList.add(className);
  return { block, input };
};

const { block: blockSum, input: inputSum } = createInputBlock("Сума", "sum");
const { block: blockPrice, input: inputPrice } = createInputBlock(
  "Ціна",
  "price"
);
const blockResult = document.createElement("div");

const btn = document.createElement("BUTTON");
btn.textContent = "Повернути решту";

const blockWarning = document.createElement("div");
blockWarning.classList.add("warning");

body.append(blockSum, blockPrice, btn, blockResult, blockWarning);

btn.addEventListener("click", function() {
  if (isNaN(inputPrice.value) || isNaN(inputSum.value)) {
    const warn = `Ви ввели некоректні дані ${inputSum.value} або ${inputPrice.value}. Перевірте і спробуйте знову`;
    blockWarning.textContent = warn;
    return;
  }
  if (inputPrice.value > inputSum.value) {
    const warn = `Ціна більша суми`;
    blockWarning.textContent = warn;
    return;
  }
  blockWarning.textContent = "";

  const changeObject = getChange(inputSum.value - inputPrice.value);

  blockResult.textContent = `Ваша решта: ${renderDollarsResult(
    changeObject.dollars
  )} ${changeObject.coins.reduce((acc, current) => {
    return (acc += current);
  }, 0)} центів  (по номіналу ${renderDollarsResult(
    changeObject.dollars
  )} ${renderCoinsResult(changeObject.coins)})`;
});

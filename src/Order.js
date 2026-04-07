let currentState = mainMenu;
let order = {};

export function handleInput(sInput) {
  return currentState(sInput);
}

export function clearInput(){
  currentState = mainMenu;  
  order = {};
}

function welcoming() {
  let aReturn = [];
  currentState = mainMenu;
  aReturn.push("Welcome Emma's Cafe.");
  aReturn.push("Please type Next to continue.");

  return aReturn;
}

function mainMenu(sInput) {
  let aReturn = [];

  if (sInput.toLowerCase() === "next") {
    currentState = drinkChoice;
    aReturn.push("Our Drinks:");
    aReturn.push("1. Coffee");
    aReturn.push("2. Iced Coffee");
    aReturn.push("Reply with 1 or 2.");
  } else {
    aReturn.push("Please type NEXT to continue.");
  }
  return aReturn;
}

function drinkChoice(sInput) {
  let aReturn = [];

  if (sInput === "1") {
    order.drink = "Coffee";
  } else if (sInput === "2") {
    order.drink = "Iced Coffee";
  } else {
    aReturn.push("Please choose 1 or 2.");
    return aReturn;
  }

  currentState = sizeChoice;
  aReturn.push("What size would you like?");
  aReturn.push("Options: Small, Medium, or Large.");
  return aReturn;
}

function sizeChoice(sInput) {
  let aReturn = [];

  if(
    sInput.toLowerCase() !== "small" &&
    sInput.toLowerCase() !== "medium" &&
    sInput.toLowerCase() !== "large"
  ) {
    aReturn.push("Please choose Small, Medium, or Large.");
    return aReturn;
  }

  order.size = sInput;
  currentState = alterationChoice;

  aReturn.push("Any alterations?");
  aReturn.push("Options: Oat milk, Almond milk, Add Vanilla, Add Caramel.");
  aReturn.push("Reply with your choice or type NONE.");
  return aReturn;
}

function alterationChoice(sInput) {
  let aReturn = [];

  const validOptions = ["oat milk", "almond milk", "add vanilla", "add caramel", "none"];
  if (!validOptions.includes(sInput.toLowerCase())) {
    aReturn.push("Please choose from the options or type NONE.");
    return aReturn;
  }

  order.alteration = sInput;

  currentState = upsell;
  aReturn.push("Would you like to add a pastry to your order?");
  aReturn.push("1. Croissant");
  aReturn.push("2. Muffin");
  aReturn.push("Type NO if not.");
  return aReturn;
}
function upsell(sInput) {
  let aReturn = [];

  if (sInput === "1") {
    order.pastry = "Croissant";
  } else if (sInput === "2") {
    order.pastry = "Muffin";
  } else {
    order.pastry = "none";
  }

   currentState = mainMenu;
   
   aReturn.push("thanks! your order will be ready for pickup in 10 minutes.");
   aReturn.push(`${order.size} ${order.drink}`);
   aReturn.push(`Alterations: ${order.alteration}`);
   aReturn.push(`Pastry: ${order.pastry}`);
   aReturn.push("Reply NEXT to start a new order.");
  return aReturn;
}
let currentState = welcoming;
let order = {};
let lastCompletedOrder = null;

export function handleInput(sInput) {
  const input = sInput.trim();
  const lowerInput = input.toLowerCase();

  // Global AI-like prompt commands
  if (lowerInput === "repeat last order") {
    return repeatLastOrder();
  }

  if (lowerInput === "show menu") {
    return showMenu();
  }

  if (lowerInput === "surprise me") {
    return surpriseMe();
  }

  return currentState(input);
}

export function clearInput() {
  currentState = welcoming;
  order = {};
}

function welcoming() {
  let aReturn = [];
  currentState = mainMenu;
  aReturn.push("Welcome to Emma's Cafe.");
  aReturn.push("Please type NEXT to continue.");
  return aReturn;
}

function mainMenu(sInput) {
  let aReturn = [];

  if (
    sInput.toLowerCase() === "hello" ||
    sInput.toLowerCase() === "hi" ||
    sInput.toLowerCase() === "hey"
  ) {
    return welcoming();
  }

  if (sInput.toLowerCase() === "next" || sInput.toLowerCase() === "menu") {
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
  const lowerInput = sInput.toLowerCase();

  if (
    lowerInput !== "small" &&
    lowerInput !== "medium" &&
    lowerInput !== "large"
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
  const lowerInput = sInput.toLowerCase();

  const validOptions = [
    "oat milk",
    "almond milk",
    "add vanilla",
    "add caramel",
    "none"
  ];

  if (!validOptions.includes(lowerInput)) {
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
  const lowerInput = sInput.toLowerCase();

  if (sInput === "1") {
    order.pastry = "Croissant";
  } else if (sInput === "2") {
    order.pastry = "Muffin";
  } else if (lowerInput === "no") {
    order.pastry = "None";
  } else {
    aReturn.push("Please reply with 1, 2, or NO.");
    return aReturn;
  }

  lastCompletedOrder = { ...order };
  currentState = mainMenu;

  aReturn.push("Thanks. Your order will be ready for pickup in 10 minutes.");
  aReturn.push(`${order.size} ${order.drink}`);
  aReturn.push(`Alterations: ${order.alteration}`);
  aReturn.push(`Pastry: ${order.pastry}`);
  aReturn.push("Reply NEXT to start a new order.");

  return aReturn;
}

function repeatLastOrder() {
  let aReturn = [];

  if (!lastCompletedOrder) {
    aReturn.push("I do not have a previous order saved yet.");
    aReturn.push("Start an order first, then I can repeat it for you.");
    return aReturn;
  }

  order = { ...lastCompletedOrder };
  currentState = mainMenu;

  aReturn.push("Sure. I repeated your last order.");
  aReturn.push(`${order.size} ${order.drink}`);
  aReturn.push(`Alterations: ${order.alteration}`);
  aReturn.push(`Pastry: ${order.pastry}`);
  aReturn.push("Your usual order is ready for pickup in 10 minutes.");
  aReturn.push("Reply NEXT to start a new order.");

  return aReturn;
}

function showMenu() {
  let aReturn = [];
  currentState = drinkChoice;

  aReturn.push("Here is the menu.");
  aReturn.push("Our Drinks:");
  aReturn.push("1. Coffee");
  aReturn.push("2. Iced Coffee");
  aReturn.push("Reply with 1 or 2.");

  return aReturn;
}

function surpriseMe() {
  let aReturn = [];

  order = {
    drink: "Coffee",
    size: "Medium",
    alteration: "Add Vanilla",
    pastry: "Croissant"
  };

  lastCompletedOrder = { ...order };
  currentState = mainMenu;

  aReturn.push("I picked a popular combo for you.");
  aReturn.push("Medium Coffee");
  aReturn.push("Alterations: Add Vanilla");
  aReturn.push("Pastry: Croissant");
  aReturn.push("It will be ready for pickup in 10 minutes.");
  aReturn.push("Reply NEXT to start a new order.");

  return aReturn;
}
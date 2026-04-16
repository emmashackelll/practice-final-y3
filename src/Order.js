let currentState = welcoming;
let appointment = {};
let lastCompletedAppointment = null;

export function handleInput(sInput) {
  const input = sInput.trim();
  const lowerInput = input.toLowerCase();

  if (lowerInput === "repeat last appointment") {
    return repeatLastAppointment();
  }

  if (lowerInput === "show services" || lowerInput === "show menu") {
    return showServices();
  }

  if (lowerInput === "suggest a style" || lowerInput === "surprise me") {
    return suggestStyle();
  }

  return currentState(input);
}

export function clearInput() {
  currentState = welcoming;
  appointment = {};
}

function welcoming() {
  let aReturn = [];
  currentState = mainMenu;
  aReturn.push("Welcome to Emma's Hair Salon.");
  aReturn.push("We can help you book a salon appointment.");
  aReturn.push("Type NEXT to continue.");
  return aReturn;
}

function mainMenu(sInput) {
  let aReturn = [];
  const lowerInput = sInput.toLowerCase();

  if (lowerInput === "hello" || lowerInput === "hi" || lowerInput === "hey") {
    return welcoming();
  }

  if (lowerInput === "next" || lowerInput === "menu") {
    currentState = serviceChoice;
    aReturn.push("Our Services:");
    aReturn.push("1. Haircut");
    aReturn.push("2. Blowout");
    aReturn.push("Reply with 1 or 2.");
  } else {
    aReturn.push("Please type NEXT to continue.");
  }

  return aReturn;
}

function serviceChoice(sInput) {
  let aReturn = [];

  if (sInput === "1") {
    appointment.service = "Haircut";
  } else if (sInput === "2") {
    appointment.service = "Blowout";
  } else {
    aReturn.push("Please choose 1 or 2.");
    return aReturn;
  }

  currentState = stylistChoice;
  aReturn.push("Which stylist would you like?");
  aReturn.push("Options: Emma, Sophia, or Ava.");
  return aReturn;
}

function stylistChoice(sInput) {
  let aReturn = [];
  const lowerInput = sInput.toLowerCase();

  if (
    lowerInput !== "emma" &&
    lowerInput !== "sophia" &&
    lowerInput !== "ava"
  ) {
    aReturn.push("Please choose Emma, Sophia, or Ava.");
    return aReturn;
  }

  appointment.stylist = sInput;
  currentState = addOnChoice;
  aReturn.push("Would you like to add a service?");
  aReturn.push("Options: Wash, Deep Conditioning, Scalp Massage, or None.");
  aReturn.push("Reply with your choice or type NONE.");
  return aReturn;
}

function addOnChoice(sInput) {
  let aReturn = [];
  const lowerInput = sInput.toLowerCase();

  const validOptions = [
    "wash",
    "deep conditioning",
    "scalp massage",
    "none"
  ];

  if (!validOptions.includes(lowerInput)) {
    aReturn.push("Please choose one of the add-on options or type NONE.");
    return aReturn;
  }

  appointment.addOn = sInput;
  currentState = upsell;
  aReturn.push("Would you like to add a retail product today?");
  aReturn.push("1. Shampoo");
  aReturn.push("2. Conditioner");
  aReturn.push("Type NO if not.");
  return aReturn;
}

function upsell(sInput) {
  let aReturn = [];
  const lowerInput = sInput.toLowerCase();

  if (sInput === "1") {
    appointment.product = "Shampoo";
  } else if (sInput === "2") {
    appointment.product = "Conditioner";
  } else if (lowerInput === "no") {
    appointment.product = "None";
  } else {
    aReturn.push("Please reply with 1, 2, or NO.");
    return aReturn;
  }

  lastCompletedAppointment = { ...appointment };
  currentState = mainMenu;

  aReturn.push("Thanks. Your appointment has been booked.");
  aReturn.push(`Service: ${appointment.service}`);
  aReturn.push(`Stylist: ${appointment.stylist}`);
  aReturn.push(`Add-on: ${appointment.addOn}`);
  aReturn.push(`Retail Product: ${appointment.product}`);
  aReturn.push("Reply NEXT to start a new booking.");

  return aReturn;
}

function repeatLastAppointment() {
  let aReturn = [];

  if (!lastCompletedAppointment) {
    aReturn.push("I do not have a previous appointment saved yet.");
    aReturn.push("Book an appointment first, then I can repeat it for you.");
    return aReturn;
  }

  appointment = { ...lastCompletedAppointment };
  currentState = mainMenu;

  aReturn.push("Sure. I repeated your last appointment.");
  aReturn.push(`Service: ${appointment.service}`);
  aReturn.push(`Stylist: ${appointment.stylist}`);
  aReturn.push(`Add-on: ${appointment.addOn}`);
  aReturn.push(`Retail Product: ${appointment.product}`);
  aReturn.push("Reply NEXT to start a new booking.");

  return aReturn;
}

function showServices() {
  let aReturn = [];
  currentState = serviceChoice;

  aReturn.push("Here are our services.");
  aReturn.push("Our Services:");
  aReturn.push("1. Haircut");
  aReturn.push("2. Blowout");
  aReturn.push("Reply with 1 or 2.");

  return aReturn;
}

function suggestStyle() {
  let aReturn = [];

  appointment = {
    service: "Haircut",
    stylist: "Emma",
    addOn: "Deep Conditioning",
    product: "Shampoo"
  };

  lastCompletedAppointment = { ...appointment };
  currentState = mainMenu;

  aReturn.push("I picked a popular salon package for you.");
  aReturn.push("Service: Haircut");
  aReturn.push("Stylist: Emma");
  aReturn.push("Add-on: Deep Conditioning");
  aReturn.push("Retail Product: Shampoo");
  aReturn.push("Reply NEXT to start a new booking.");

  return aReturn;
}
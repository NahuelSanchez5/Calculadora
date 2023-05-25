function addNode(fatherNode, tag, classes = [], attrs = {}) {
    const childNode = document.createElement(tag);
    classes.forEach((_class) => childNode.classList.add(_class)); // Seteo las clases
    for (let k in attrs) childNode.setAttribute(k, attrs[k]); // Seteo los atributos
    fatherNode.appendChild(childNode);
    return childNode;
  }
  
  function appendValue(newValue) {
    const opers = ["+", "-", "*", "/", ".", "%"];
    const typed = document.getElementById("typed");
    const currentLastChar = typed.value.slice(-1); // Último char del resultado actual
    const currentLastCharIsOper = opers.indexOf(currentLastChar) > -1; // ¿El valor actual del display es una operacion?
    const newValueIsOper = opers.indexOf(newValue) > -1; // ¿El valor nuevo es una operacion?
    const hidden = document.getElementById("hidden-input");
  
    if (hidden.value !== "") {
      typed.value = hidden.value;
      hidden.value = "";
    }
  
    if (currentLastCharIsOper && newValueIsOper) typed.value = typed.value.slice(0, -1) + newValue;
    else if (typed.value === "0") typed.value = newValue;
    else typed.value += newValue;
  }
  
  function calculate() {
    const result = document.getElementById("result");
    const typed = document.getElementById("typed");
    const hidden = document.getElementById("hidden-input");
    result.value = eval(typed.value);
    hidden.value = result.value;
  }
  
  function clearDisplay() {
    document.getElementById("typed").value = "0";
    document.getElementById("result").value = "0";
  }
  
  function changeSign() {
    calculate();
    const result = document.getElementById("result");
    const typed = document.getElementById("typed");
    result.value = -1 * result.value;
    typed.value = result.value;
  }
  
  function deleteLastChar() {
    const result = document.getElementById("typed");
    result.value.length === 1 ? clearDisplay() : (result.value = result.value.slice(0, -1));
  }
  
  function changeTheme() {
    const bodyClassList = document.body.classList;
    const themeBtn = document.getElementById("theme-button");
    bodyClassList.toggle("theme-dark");
    if (bodyClassList.contains("theme-dark")) {
      themeBtn.value = "☀️";
      themeBtn.classList.remove("theme-dark");
    } else {
      themeBtn.value = "🌛";
      themeBtn.classList.add("theme-dark");
    }
  }
  
  // Manejar el input
  function handleEvent(value) {
    const numsAndOpers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", "%"];
  
    numsAndOpers.indexOf(value) > -1 && appendValue(value);
    (value === "." || value === ",") && appendValue(".");
    (value === "backspace" || value === "←") && deleteLastChar();
    (value === "escape" || value === "AC") && clearDisplay();
    (value === "enter" || value === "=") && calculate();
    value === "±" && changeSign();
  }
  
  function createApp() {
    const app = document.getElementById("app");
  
    const title = addNode(app, "h1", ["title"]);
    title.textContent = "My Calculator";
    const calculator = addNode(app, "div", ["calculator"]);
  
    const display = addNode(calculator, "div", ["display"], { id: "display" });
    const typed = addNode(display, "input", [], { id: "typed", type: "text", value: "", disabled: "" });
    const result = addNode(display, "input", [], { id: "result", type: "number", value: "0", disabled: "", step: "0.001" });
  
    const btnGrid = addNode(calculator, "div", [], { id: "btn-grid" });
    const buttons = [
      ["AC", "±", "%", "/"],
      ["7", "8", "9", "*"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "←", "="],
    ];
  
    buttons.forEach((rowItems, rowIndex) => {
      const rowDiv = addNode(btnGrid, "div", ["row"], { id: `row${rowIndex}` });
      rowItems.forEach((item, itemIndex) => {
        if (rowIndex === 0 || itemIndex === 3) {
          addNode(rowDiv, "input", ["btn", "operator"], { type: "button", value: item, id: `item${rowIndex}${itemIndex}` });
        } else {
          addNode(rowDiv, "input", ["btn"], { type: "button", value: item, id: `item${rowIndex}${itemIndex}` });
        }
      });
    });
  
    // Estilos específicos a ciertos botones
    document.getElementById("item00").classList.add("ac");
  
    //Botón donde se guarda el último resultado
    addNode(app, "input", ["theme-dark"], { type: "hidden", value: "", id: "hidden-input" });
  
    //Botón de cambio de tema
    addNode(app, "input", ["theme-dark"], { type: "button", value: "🌛", onclick: "changeTheme()", id: "theme-button" });
  
    // Event listener de click
    btnGrid.addEventListener("click", ({ target: { type, value } }) => type === "button" && handleEvent(value));
  
    // Event listener del teclado
    document.addEventListener("keydown", ({ key }) => handleEvent(key.toLowerCase()));
  }
  
  createApp();
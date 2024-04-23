function loadColorFromLocalStorage(varName, colorPickerClass) {
  console.log("Loading color from localStorage");
  const savedColor = localStorage.getItem(varName);
  if (savedColor) {
    document.documentElement.style.setProperty(varName, savedColor);
    const colorPickers = document.querySelectorAll(colorPickerClass);
    colorPickers.forEach((picker) => {
      if (picker.value === savedColor) {
        picker.checked = true;
      }
    });
    const coloredElements = document.querySelectorAll("[data-color]");
    coloredElements.forEach((element) => {
      if (element.dataset.color === varName) {
        element.style.backgroundColor = savedColor;
      }
    });
  }
  console.log("Saved color:", savedColor);
}

function changeColor(varName, event) {
  const selectedColor = event.target.value;
  document.documentElement.style.setProperty(varName, selectedColor);

  const coloredElements = document.querySelectorAll("[data-color]");
  coloredElements.forEach((element) => {
    if (element.dataset.color === varName) {
      element.style.backgroundColor = selectedColor;
    }
  });

  localStorage.setItem(varName, selectedColor);
}

window.addEventListener("load", function () {
  loadColorFromLocalStorage("--c1", "#colorPicker1");
  loadColorFromLocalStorage("--c2", "#colorPicker2");
  loadColorFromLocalStorage("--c3", "#colorPicker3");

  const colorPickers = document.querySelectorAll(".color-picker");
  colorPickers.forEach((picker) => {
    picker.addEventListener("input", function (event) {
      changeColor(this.dataset.varName, event);
    });
  });
});

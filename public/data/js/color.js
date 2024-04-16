function loadColorFromLocalStorage(varName, colorPickerClass, coloredElementClass) {
    console.log('Loading color from localStorage');
    const savedColor = localStorage.getItem(varName);
    if (savedColor) {
        document.documentElement.style.setProperty(varName, savedColor);
        const colorPickers = document.querySelectorAll(colorPickerClass);
        colorPickers.forEach(picker => {
            if (picker.value === savedColor) {
                picker.checked = true;
            }
        });
        const coloredElements = document.querySelectorAll(coloredElementClass);
        coloredElements.forEach(element => {
            element.style.backgroundColor = savedColor;
        });
    }
    console.log('Saved color:', savedColor);
}

function changeColor(varName, event) {
    const selectedColor = event.target.value;
    document.documentElement.style.setProperty(varName, selectedColor);
    const coloredElementClass = varName === '--c1' ? '.coloredElement1' : '.coloredElement2';
    const coloredElements = document.querySelectorAll(coloredElementClass);
    coloredElements.forEach(element => {
        element.style.backgroundColor = selectedColor;
    });

    localStorage.setItem(varName, selectedColor);
}

window.addEventListener('load', function() {
    loadColorFromLocalStorage('--c1', '.color-picker', '.coloredElement1');
    loadColorFromLocalStorage('--c2', '.color-picker', '.coloredElement2');
    loadColorFromLocalStorage('--c3', '.color-picker', '.coloredElement3');

    const colorPickers = document.querySelectorAll('.color-picker');
    colorPickers.forEach(picker => {
        picker.addEventListener('input', function(event) {
            changeColor(this.dataset.varName, event);
        });
    });
});

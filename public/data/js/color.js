function loadColorFromLocalStorage(varName, colorPickerId, coloredElementId) {
    const savedColor = localStorage.getItem(varName);
    if (savedColor) {
        document.documentElement.style.setProperty(varName, savedColor);
        document.getElementById(colorPickerId).value = savedColor;
        document.getElementById(coloredElementId).style.backgroundColor = savedColor;
    }
}

function changeColor(varName, event) {
    const selectedColor = event.target.value;
    document.documentElement.style.setProperty(varName, selectedColor);
    const coloredElementId = varName === '--c1' ? 'coloredElement1' : 'coloredElement2';
    document.getElementById(coloredElementId).style.backgroundColor = selectedColor;
    
    localStorage.setItem(varName, selectedColor);
}

loadColorFromLocalStorage('--c1', 'colorPicker1', 'coloredElement1');
loadColorFromLocalStorage('--c2', 'colorPicker2', 'coloredElement2');
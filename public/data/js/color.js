function loadColorFromLocalStorage(varName, colorPickerId, coloredElementId) {
    console.log('Loading color from localStorage');
    const savedColor = localStorage.getItem(varName);
    if (savedColor) {
        document.documentElement.style.setProperty(varName, savedColor);
        document.getElementById(colorPickerId).value = savedColor;
        document.getElementById(coloredElementId).style.backgroundColor = savedColor;
    }
    console.log('Saved color:', savedColor);
}

function changeColor(varName, event) {
    const selectedColor = event.target.value;
    document.documentElement.style.setProperty(varName, selectedColor);
    const coloredElementId = varName === '--c1' ? 'coloredElement1' : 'coloredElement2';
    document.getElementById(coloredElementId).style.backgroundColor = selectedColor;
    
    localStorage.setItem(varName, selectedColor);
}

window.addEventListener('load', function() {
    loadColorFromLocalStorage('--c1', 'colorPicker1', 'coloredElement1');
    loadColorFromLocalStorage('--c2', 'colorPicker2', 'coloredElement2');
});
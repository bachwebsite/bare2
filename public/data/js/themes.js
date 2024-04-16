document.addEventListener("DOMContentLoaded", function () {
    const themeDropdown = document.querySelector("#theme-dropdown select");
    const coloredElements = document.querySelectorAll('.coloredElement1, .coloredElement2, .coloredElement3');
  
    themeDropdown.addEventListener("change", function () {
      const selectedTheme = themeDropdown.value;
      if (selectedTheme === 'custom') {
        loadCustomColors();
      } else {
        switchTheme(selectedTheme);
      }
    });
  
    function switchTheme(themeName) {
      const themeColors = {
        light: ['#000000', '#f0f0f0', '#f9f9f9'],
        dark: ['#333333', '#444444', '#555555'],
        crimson: ['#dc143c', '#ff6347', '#ff4500'],
        amethyst: ['#a67cda', '#5600f5', '#3d00ad'],
        sapphire: ['#1e90ff', '#4169e1', '#6495ed'],
        emerald: ['#008000', '#32cd32', '#00ff00'],
        gold: ['#ffd700', '#ffd700', '#ffcc00'],
        scarlet: ['#ff2400', '#ff4500', '#ff6347']
      };
  
      const [c1, c2, c3] = themeColors[themeName];
      applyColors(c1, c2, c3);
  
      // Save theme colors to localStorage
      localStorage.setItem('--c1', c1);
      localStorage.setItem('--c2', c2);
      localStorage.setItem('--c3', c3);
    }
  
    function loadCustomColors() {
      const customC1 = localStorage.getItem('--c1');
      const customC2 = localStorage.getItem('--c2');
      const customC3 = localStorage.getItem('--c3');
  
      if (customC1 && customC2 && customC3) {
        applyColors(customC1, customC2, customC3);
      }
    }
  
    function applyColors(c1, c2, c3) {
      document.documentElement.style.setProperty('--c1', c1);
      document.documentElement.style.setProperty('--c2', c2);
      document.documentElement.style.setProperty('--c3', c3);
  
      // Update colored elements with new colors
      coloredElements.forEach(element => {
        if (element.classList.contains('coloredElement1')) {
          element.style.backgroundColor = c1;
        } else if (element.classList.contains('coloredElement2')) {
          element.style.backgroundColor = c2;
        } else if (element.classList.contains('coloredElement3')) {
          element.style.backgroundColor = c3;
        }
      });
    }
  
    // Load default or custom colors on page load
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
  });
  
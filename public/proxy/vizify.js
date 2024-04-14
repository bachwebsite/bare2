function toggleDisplay(className) {
    const elements = document.getElementById(className);

    if (elements.style.display === 'none') {
        elements.style.animation = 'kf_fade 1s';
        elements.style.display = 'block';
    } else {
        elements.style.animation = 'kf_fade 1s';
        elements.style.display = 'none';
    }
}
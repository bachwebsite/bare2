let counterDiv = document.getElementById('counter');
let isDragging = false;
let offsetX, offsetY;

counterDiv.addEventListener('mousedown', startDragging);

function startDragging(event) {
    isDragging = true;
    offsetX = event.clientX - counterDiv.getBoundingClientRect().left;
    offsetY = event.clientY - counterDiv.getBoundingClientRect().top;

    document.addEventListener('mousemove', dragCounter);
    document.addEventListener('mouseup', stopDragging);
}

function dragCounter(event) {
    if (isDragging) {
        let newX = event.clientX - offsetX;
        let newY = event.clientY - offsetY;
        
        newX = Math.min(Math.max(newX, 0), window.innerWidth - counterDiv.offsetWidth);
        newY = Math.min(Math.max(newY, 0), window.innerHeight - counterDiv.offsetHeight);

        counterDiv.style.left = newX + 'px';
        counterDiv.style.top = newY + 'px';
    }
}

function stopDragging() {
    isDragging = false;
    document.removeEventListener('mousemove', dragCounter);
    document.removeEventListener('mouseup', stopDragging);
}

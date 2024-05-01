document.addEventListener('DOMContentLoaded', function() {
    const pkeyInput = document.getElementById('panickey');
    const purlInput = document.getElementById('panicurl');
    
    const savedPanicKey = localStorage.getItem('panicKey');
    const savedPanicUrl = localStorage.getItem('panicUrl');
    
    pkeyInput.value = savedPanicKey || '`';
    purlInput.value = savedPanicUrl || 'https://classroom.google.com/';
    
    document.addEventListener('keydown', function(event) {
        if (event.key === pkeyInput.value) {
            event.preventDefault();
            console.log('Key with value ' + pkeyInput.value + ' pressed');
            const url = purlInput.value;
            window.location.href = url;
        } else {
            console.log('Key with value ' + event.key + ' pressed. It is not ' + pkeyInput.value);
        }
    });
    
    pkeyInput.addEventListener('input', function() {
        localStorage.setItem('panicKey', pkeyInput.value);
    });
    
    purlInput.addEventListener('input', function() {
        localStorage.setItem('panicUrl', purlInput.value);
    });
});

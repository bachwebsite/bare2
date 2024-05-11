let script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

var erudaon = false;
function consol() {
    const iframe = $('#fram')[0];
    const windoww = iframe.contentWindow;
    const documentt = iframe.contentDocument;
    if (erudaon === false) {
        const erudaonscript = documentt.createElement('script');
        erudaonscript.src = "//cdn.jsdelivr.net/npm/eruda"
        erudaonscript.onload = function() {
            windoww.eruda.init();
            windoww.eruda.show();
        }
        erudaon = true
        documentt.getElementsByTagName('head')[0].appendChild(erudaonscript)
    } else {
        windoww.eruda.destroy();
        erudaon = false
    }
}
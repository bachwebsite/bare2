function redirectDemo(selectedValue) {
    var prefix = '__uv$config.prefix';
    var encodeUrl = '__uv$config.encodeUrl';

    var baseUrl = 'https://appetize.io/embed/demo_r0m5r98axtdhftx1hmmhq1c0m8';
    var device = '';
    
    if (selectedValue === 'gp4') {
        device = 'pixel4&deviceColor=black';
    } else if (selectedValue === 'gp4xl') {
        device = 'pixel4xl&deviceColor=black';
    }

    var url = prefix + encodeUrl(baseUrl + '?device=' + device + '&record=false&scale=75&centered=true');
    location.href = url;
}
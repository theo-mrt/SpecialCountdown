(function() {
    var countdownElements = document.querySelectorAll('.countdown-timer');
    countdownElements.forEach(function(element) {
        var date = element.getAttribute('data-date');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://myspecialtimer.com/countdown/countdown_widget.html?date=' + encodeURIComponent(date);
        iframe.style.width = '100%';
        iframe.style.height = '100px'; // Adjust as necessary
        iframe.frameBorder = '0';
        iframe.allowTransparency = 'true';

        // Replace the content of the countdown element with the iframe
        element.innerHTML = '';
        element.appendChild(iframe);
    });
})();

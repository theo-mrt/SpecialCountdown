document.addEventListener('DOMContentLoaded', function() {
    var countdownTimers = document.querySelectorAll('.countdown-timer');
    
    countdownTimers.forEach(function(timer) {
        var targetDate = new Date(timer.getAttribute('data-date'));
        var interval = setInterval(function() {
            var now = new Date();
            var distance = targetDate - now;
            if (distance < 0) {
                clearInterval(interval);
                timer.textContent = 'Time\'s up!';
                return;
            }
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            timer.textContent = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
        }, 1000);
    });
});

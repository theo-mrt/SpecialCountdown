document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateBtn').addEventListener('click', generateTimer);
    document.getElementById('copyBtn').addEventListener('click', copyEmbedCode);
});

let interval;

function generateTimer() {
    clearInterval(interval);

    const endTime = new Date(document.getElementById('endTime').value);
    const timezone = document.getElementById('timezone').value;
    const color = document.getElementById('color').value;
    const fontSize = parseInt(document.getElementById('fontSize').value, 10);
    const bgColor = document.getElementById('bgColor').value;
    const fontFamily = document.getElementById('fontFamily').value;
    const bigTimer = document.getElementById('bigTimer').checked;

    if (isNaN(endTime.getTime())) {
        alert('Please choose a valid date and time.');
        return;
    }

    if (endTime <= new Date()) {
        alert('Please choose a future date and time.');
        return;
    }

    if (isNaN(fontSize) || fontSize < 10 || fontSize > 100) {
        alert('Please choose a font size between 10 and 100.');
        return;
    }

    interval = setInterval(() => {
        const now = new Date();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('timerPreview').innerHTML = "Time's up!";
            document.getElementById('timerPreview').style.backgroundColor = bgColor;
            document.getElementById('timerPreview').style.fontFamily = fontFamily;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timerPreview').innerHTML = `
            <span>${days}d</span>
            <span>${hours}h</span>
            <span>${minutes}m</span>
            <span>${seconds}s</span>
        `;
        document.getElementById('timerPreview').style.color = color;
        document.getElementById('timerPreview').style.fontSize = `${fontSize}px`;
        document.getElementById('timerPreview').style.backgroundColor = bgColor;
        document.getElementById('timerPreview').style.fontFamily = fontFamily;
        if (bigTimer) {
            document.getElementById('timerPreview').classList.add('big-timer');
        } else {
            document.getElementById('timerPreview').classList.remove('big-timer');
        }
    }, 1000);

    generateEmbedCode(endTime, timezone, color, fontSize, bgColor, fontFamily, bigTimer);
}

function generateEmbedCode(endTime, timezone, color, fontSize, bgColor, fontFamily, bigTimer) {
    const formattedDate = endTime.toISOString();
    const bigTimerClass = bigTimer ? 'big-timer' : '';
    const embedCode = `
<script src="https://myspecialtimer.com/countdown/countdown.js"></script>
<a href="https://myspecialtimer.com/" class="countdown-timer ${bigTimerClass}"
   data-timezone="${timezone}"
   data-date="${formattedDate}"
   data-color="${color}"
   data-font-size="${fontSize}"
   data-bg-color="${bgColor}"
   data-font-family="${fontFamily}">Countdown Timer</a>
    `;

    document.getElementById('embedCode').value = embedCode;
}

function copyEmbedCode() {
    const embedCode = document.getElementById('embedCode');
    embedCode.select();
    navigator.clipboard.writeText(embedCode.value)
        .then(() => alert('Embed code copied to clipboard!'))
        .catch(err => console.error('Error in copying text: ', err));
}

document.getElementById('generateBtn').addEventListener('click', generateTimer);
document.getElementById('copyBtn').addEventListener('click', copyEmbedCode);

let interval;

function generateTimer() {
    clearInterval(interval); // Clear any existing intervals

    const endTime = new Date(document.getElementById('endTime').value);
    const color = document.getElementById('color').value;
    const fontSize = document.getElementById('fontSize').value;

    if (endTime <= new Date()) {
        alert('Please choose a future date and time.');
        return;
    }

    interval = setInterval(() => {
        const now = new Date();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('timerPreview').innerHTML = "Time's up!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('timerPreview').innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        document.getElementById('timerPreview').style.color = color;
        document.getElementById('timerPreview').style.fontSize = `${fontSize}px`;
    }, 1000);

    generateEmbedCode(endTime, color, fontSize);
}

function generateEmbedCode(endTime, color, fontSize) {
    const formattedDate = endTime.toISOString(); // Format the date as needed
    const embedCode = `
<script src="https://myspecialtimer.com/countdown/countdown.js"></script>
<a href="https://myspecialtimer.com/" class="countdown-timer" data-timezone="America/New_York" data-date="${formattedDate}">Countdown Timer</a>
    `;
    
    document.getElementById('embedCode').value = embedCode; // Make sure this targets a textarea element
}

function copyEmbedCode() {
    const embedCode = document.getElementById('embedCode'); // Make sure this targets a textarea element
    embedCode.select();
    navigator.clipboard.writeText(embedCode.value)
        .then(() => alert('Embed code copied to clipboard!'))
        .catch(err => console.error('Error in copying text: ', err));
}

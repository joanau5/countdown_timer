// Basic template to ensure HTML is loaded before script runs
document.addEventListener('DOMContentLoaded', () => {

    console.log('Page loaded and script running');

    // reference the elements defined in html
    const targetInput = document.getElementById('targetTime');
    const startBtn = document.getElementById('startButton');
    const display = document.getElementById('display');

    let intervalId;

    // button behavior 
    startBtn.addEventListener('click', () => {
        const targetTime = new Date(targetInput.value).getTime();

        if (isNaN(targetTime)) {
            alert('Please select a valid date and time.');
            return;
        }

        if (intervalId) clearInterval(intervalId);

        // countdown logic
        intervalId = setInterval(() => {
            const now = Date.now();
            const diff = targetTime - now;

            if (diff <= 0) {
                clearInterval(intervalId);
                display.textContent = "Time's up!";
                return;
            }
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }, 1000);
    })


    // helper function for number spacing
    function pad(num) {
        return num.toString().padStart(2, '0');
    }
});
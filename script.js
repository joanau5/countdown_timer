// Basic template to ensure HTML is loaded before script runs
document.addEventListener('DOMContentLoaded', () => {

    console.log('Page loaded and script running');

    // reference the elements defined in html
    const targetInput = document.getElementById('targetTime');
    const startBtn = document.getElementById('startButton');
    const cancelBtn = document.getElementById('cancelButton');
    const display = document.getElementById('display');
    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');
    const widget = document.getElementById('widget');
    const bgColorPicker = document.getElementById('bgColorPicker');
    const bgImageInput = document.getElementById('bgImageInput');


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

    cancelBtn.addEventListener('click', () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
            display.textContent = "Cancelled";
        }
    });

    settingsToggle.addEventListener('click', () => {
        if (settingsPanel.style.display === 'block') {
            settingsPanel.style.display = 'none';
        } else {
            settingsPanel.style.display = 'block';
        }
    });

    // closes panel when clicking outside
    document.addEventListener('click', (event) => {
        const clickInsidePanel = settingsPanel.contains(event.target);
        const clickOnToggle = settingsToggle.contains(event.target);

        if (!clickInsidePanel && !clickOnToggle) {
            settingsPanel.style.display = 'none';
        }
    });

    // update background when color is picked
    bgColorPicker.addEventListener('input', (e) => {
        widget.style.backgroundImage = ''; // remove image if any
        widget.style.backgroundColor = e.target.value;
    });

    // update background when image is uploaded
    bgImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            widget.style.backgroundImage = `url('${event.target.result}')`;
            widget.style.backgroundSize = 'cover';
            widget.style.backgroundColor = ''; // remove color if any
        };
        reader.readAsDataURL(file);
    });




    // helper function for number spacing
    function pad(num) {
        return num.toString().padStart(2, '0');
    }
});
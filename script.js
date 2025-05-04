let coins = parseInt(localStorage.getItem('pomodexCoins')) || 0;

function updateCoins() {
    const coinDisplay = document.getElementById('coinDisplay');
    if (coinDisplay) {
        coinDisplay.textContent = 'Coins: ' + coins;
    }
    
    const headerCoins = document.querySelector('.headerText');
    if (headerCoins && headerCoins.textContent.includes('Coins:')) {
        headerCoins.textContent = 'Coins: ' + coins;
    }
    
    localStorage.setItem('pomodexCoins', coins);
}

updateCoins();

function doSomething(rarity) {
    const amount = costOf(rarity);
    if(coins >= amount)
    {
        coins -= amount;
        updateCoins();
        openBox(rarity);
    }
    else{
        alert("Not enough coins");
    }
}

function costOf(rarity) {
    if(rarity === 'common') return 10;
    if(rarity === 'epic') return 20;
    if(rarity === 'legendary') return 50;
    return 0;
}

function openBox(rarity) {
    let roll = Math.random() * 100;
    let result = '';

    if(rarity === 'common'){
        if(roll < 65) result = 'common';
        else if (roll < 95) result = 'epic';
        else result = 'legendary';
    }
    else if(rarity === 'epic') {
        if(roll < 30) result = 'common';
        else if(roll < 90) result = 'epic';
        else result = 'legendary';
    }
    else if(rarity === 'legendary') {
        if(roll < 10) result = 'common';
        else if(roll < 60) result = 'epic';
        else result = 'legendary';
    }

    showReward(result);
}

function showReward(rarity) {
    const rewardImage = document.getElementById('rewardImage');
    let imageSrc = '';
    if(rarity === 'common') {
        const commons = ['common_bunny.png', 'common_giraffe.png', 'common_llama.png'];
        imageSrc = commons[Math.floor(Math.random() * commons.length)];
    }
    else if(rarity === 'epic') {
        imageSrc = 'epic_penguin.png';
    }
    else if(rarity === 'legendary'){
        imageSrc = 'legendary_narwhal.png'
    }
    rewardImage.src = imageSrc;
    rewardImage.style.display = 'block';
    rewardImage.style.opacity = '1';
    

    rewardImage.style.width = '500px';
    rewardImage.style.height = '500px';

    rewardImage.classList.remove('animate');
    void rewardImage.offsetWidth;
    rewardImage.classList.add('animate');

    setTimeout(() => {
        rewardImage.style.transition = 'opacity 1s';  
        rewardImage.style.opacity = '0'; 
    }, 1000);


    setTimeout(() => {
        rewardImage.style.display = 'none';  
    }, 2000); 

    launchConfetti();
}

function launchConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: {y: 0.6}
        });
    }
}


let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let currentTimer = null;
let timerType = null; 


if (pomodoro) {
    currentTimer = pomodoro;
    timerType = 'pomodoro';
}

function showDefaultTimer() {
    if (pomodoro && short) {
        pomodoro.style.display = "block";
        short.style.display = "none";
    }
}


if (pomodoro && short) {
    showDefaultTimer();
}

function hideAll() {
    const timers = document.querySelectorAll(".timer-display");
    timers.forEach((timer) => (timer.style.display = "none"));
}


const pomodoroButton = document.getElementById("pomodoro-session");
if (pomodoroButton) {
    pomodoroButton.addEventListener("click", function () {
        hideAll();
        pomodoro.style.display = "block";
        currentTimer = pomodoro;
        timerType = 'pomodoro';
    });
}

const shortBreakButton = document.getElementById("short-break");
if (shortBreakButton) {
    shortBreakButton.addEventListener("click", function () {
        hideAll();
        short.style.display = "block";
        currentTimer = short;
        timerType = 'short';
    });
}

let myInterval = null;


//testing (T to toggle test mode, F to force completion)

let testMode = false;
let testSpeedupFactor = 60;

function startTimer(timerdisplay) {
    if (myInterval) {
        clearInterval(myInterval);
    }
    
    let timerDuration = parseFloat(timerdisplay.getAttribute("data-duration"));
    let durationinMiliseconds = timerDuration*60*1000;
    
    if (testMode) {
        durationinMiliseconds = durationinMiliseconds / testSpeedupFactor;
    }
    
    let endTimestamp = Date.now() + durationinMiliseconds;

    myInterval = setInterval(function() {
        const timeRemaining = new Date(endTimestamp - Date.now());

        if (timeRemaining <= 0) {
            clearInterval(myInterval);
            timerdisplay.textContent = "00:00";
            const alarm = new Audio("https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav");
            alarm.play();
            
            if (timerType === 'pomodoro') {
                coins += 15;
                updateCoins();
                showCompletionMessage('Pomodoro completed! +15 coins earned!');
            } else if (timerType === 'short') {
                showCompletionMessage('Break completed! Time to get back to work!');
            }
        }
        else {
            let millisLeft = timeRemaining.getTime();
        
            if (testMode) {
                millisLeft = millisLeft * testSpeedupFactor;
            }
            
            const minutes = Math.floor(millisLeft / 60000);
            const seconds = Math.floor((millisLeft % 60000) / 1000);
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            timerdisplay.textContent = formattedTime;
        }
    }, testMode ? 50 : 1000); 
}

function showCompletionMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '100px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.backgroundColor = '#4CAF50';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '15px 20px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.fontWeight = 'bold';
    messageDiv.style.fontSize = '18px';
    messageDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        document.body.removeChild(messageDiv);
    }, 3000);
    
    if (timerType === 'pomodoro') {
        launchConfetti();
    }
}

const startButton = document.getElementById("start");
if (startButton) {
    startButton.addEventListener("click", function () {
        if(currentTimer){
            startTimer(currentTimer);
        }
    });
}

const stopButton = document.getElementById("stop");
if (stopButton) {
    stopButton.addEventListener("click", function () {
        if (myInterval) {
            clearInterval(myInterval);
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 't' || event.key === 'T') {
        testMode = !testMode;
        const modeMessage = testMode ? 
            'Test mode ENABLED - Timers will run 60x faster' : 
            'Test mode DISABLED - Timers will run at normal speed';
        alert(modeMessage);
    }

    if ((event.key === 'f' || event.key === 'F') && testMode) {
        if (myInterval) {
            clearInterval(myInterval);
            
            if (currentTimer) {
                currentTimer.textContent = "00:00";
                const alarm = new Audio("https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav");
                alarm.play();
                
                if (timerType === 'pomodoro') {
                    coins += 15;
                    updateCoins();
                    showCompletionMessage('Pomodoro completed! +15 coins earned!');
                } else if (timerType === 'short') {
                    showCompletionMessage('Break completed! Time to get back to work!');
                }
            }
        }
    }
});
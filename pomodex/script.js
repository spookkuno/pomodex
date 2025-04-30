let coins = 50;

function updateCoins() {
    document.getElementById('coinDisplay').textContent = 'Coins: ' + coins;
}
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
    confetti({
        particleCount: 200,
        spread: 100,
        origin: {y: 0.6}
    });
}


let pomodoro = document.getElementById("pomodoro-timer");
let short = document.getElementById("short-timer");
let currentTimer = null;


function showDefaultTimer() {
   pomodoro.style.display = "block";
   short.style.display = "none";
}


showDefaultTimer()


function hideAll() {
   let timers = document.querySelectorAll(".timer-display");
   timers.forEach((timer) => (timer.style.display = "none"));
 }


 document
   .getElementById("pomodoro-session")
   .addEventListener("click", function () {
     hideAll();


     pomodoro.style.display = "block";
     currentTimer = pomodoro;
   });
 document
   .getElementById("short-break")
   .addEventListener("click", function () {
     hideAll();


     short.style.display = "block";
     currentTimer = short;
   });




let myInterval = null;


function startTimer(timerdisplay) {
   if (myInterval) {
       clearInterval(myInterval);
   }
   let timerDuration = parseFloat(timerdisplay.getAttribute("data-duration"));
   console.log(timerDuration);
   let durationinMiliseconds = timerDuration*60*1000;
   let endTimestamp = Date.now() + durationinMiliseconds;


   myInterval = setInterval(function() {
       const timeRemaining = new Date(endTimestamp - Date.now());


       if (timeRemaining <= 0) {
          
           clearInterval(myInterval);
           timerdisplay.textContent = "00:00";
           const alarm = new Audio("https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav");
           alarm.play();
       }
       else {
           const minutes = Math.floor(timeRemaining / 60000);
           const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
           const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
           console.log(formattedTime);
           timerdisplay.textContent = formattedTime;
       }
   }, 1000);
}


document.getElementById("start").addEventListener("click", function () {
   if(currentTimer){
       startTimer(currentTimer);
   }
   else {


   }
});


document.getElementById("stop").addEventListener("click", function () {
   if (currentTimer) {
     clearInterval(myInterval);
   }
});

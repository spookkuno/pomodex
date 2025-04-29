
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
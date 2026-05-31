// ELEMENTOS

const intro = document.getElementById("intro");
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");

const letterScreen = document.getElementById("letter-screen");
const letter = document.getElementById("letter");

const typedText = document.getElementById("typed-text");

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playMusic");

const flipButtons = document.querySelectorAll(".flip-btn");

const secretMessages = document.querySelectorAll(".secret-message");

// ===========================
// TEXTO DA CARTA
// ===========================

const text = `

Hoje é o nosso primeiro dia desse mês que vai ser tão importante para você, e eu não poderia começar de outro jeito que não fosse voltando lá no nosso primeiríssimo capítulo. Quero que hoje, antes de começar o dia ou quando o cansaço bater, você feche os olhos por um minuto e lembre de como tudo começou.

Quem diria que um RPG seria o cenário do nosso início? A princípio, a gente só queria se divertir com os nossos personagens, criar histórias e dar risada. Mas, pouco a pouco, o "off" foi ficando interessante demais. As conversas sobre os turnos começaram a dar espaço para nós mesmos. Quando a gente finalmente trocou o Discord e começou a conversar de verdade, tudo mudou. De repente, não eram mais personagens, éramos nós, descobrindo nossos nomes reais, nossas idades, nossos gostos, dividindo a vida.

Eu lembro direitinho de ficar rezando, torcendo com todas as minhas forças para que o universo colaborasse e você morasse minimamente perto de mim. A distância assustava, mas a vontade de continuar ali era maior. A gente passou a se falar todos os dias, e era impossível não notar o contraste lindo entre nós dois desde o início.

`;

// ===========================
// ABRIR ENVELOPE
// ===========================

intro.addEventListener("click", () => {

    seal.classList.add("break");

    setTimeout(() => {
        envelope.classList.add("open");
    }, 300);

    setTimeout(() => {

        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
        }, 500);

        letterScreen.classList.add("show");

        startTyping();

    }, 1400);

});

// ===========================
// MAQUINA DE ESCREVER
// ===========================

let currentChar = 0;

function startTyping() {

    typedText.innerHTML = "";

    function type() {

        if(currentChar < text.length){

            typedText.innerHTML += text.charAt(currentChar);

            currentChar++;

            setTimeout(type, 30);
        }

    }

    type();
}

// ===========================
// VIRAR CARTA
// ===========================

flipButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        letter.classList.toggle("flipped");

    });

});

// ===========================
// MUSICA
// ===========================

let playing = false;

playBtn.addEventListener("click", () => {

    if(!playing){

        audio.play();

        playBtn.innerHTML = "❚❚ Pausar";

        playing = true;

    } else {

        audio.pause();

        playBtn.innerHTML = "▶ Tocar Música";

        playing = false;

    }

});

// ===========================
// ESTRELAS SECRETAS
// ===========================

function createSecretStar(){

    const star = document.createElement("div");

    star.innerHTML = "⭐";

    star.style.position = "fixed";

    star.style.fontSize = "20px";

    star.style.cursor = "pointer";

    star.style.zIndex = "999";

    star.style.left = Math.random() * 90 + "%";

    star.style.top = Math.random() * 90 + "%";

    star.style.opacity = "0";

    star.style.transition = "1s";

    document.body.appendChild(star);

    setTimeout(() => {

        star.style.opacity = ".8";

    }, 100);

    star.addEventListener("click", () => {

        const randomMessage =
        secretMessages[
        Math.floor(
        Math.random() * secretMessages.length
        )
        ];

        randomMessage.style.opacity = "1";

        setTimeout(() => {

            randomMessage.style.opacity = "0";

        }, 3500);

        star.remove();

    });

}

// ===========================
// GERAR ESTRELAS
// ===========================

function generateStars(){

    let amount;

    if(window.innerWidth < 700){

        amount = 8;

    }else{

        amount = 15;

    }

    for(let i = 0; i < amount; i++){

        setTimeout(() => {

            createSecretStar();

        }, i * 600);

    }

}

// ===========================
// QUANDO CARTA ABRIR
// ===========================

const observer = new MutationObserver(() => {

    if(letterScreen.classList.contains("show")){

        setTimeout(() => {

            generateStars();

        }, 2000);

    }

});

observer.observe(letterScreen, {
    attributes:true
});

// ===========================
// EFEITO BRILHO
// ===========================

setInterval(() => {

    const stars = document.querySelectorAll("#stars");

    stars.forEach(starLayer => {

        starLayer.style.opacity =
        0.85 + Math.random() * 0.15;

    });

}, 1500);

// ===========================
// MOBILE
// ===========================

document.addEventListener("touchstart", () => {}, {
    passive:true
});
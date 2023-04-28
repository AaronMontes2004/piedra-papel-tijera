// Estas son las opciones de piedra, papel o tijera, serán guiados por su índice
const options = ["paper", "stone", "scissors"]
const iconUrl = ["icons/paper.png", "icons/stone.png", "icons/scissors.png"]
let scorePlayer = 0;
let scoreComputer = 0;

// Al terminar de cargar toda la página se realizarán todas estas acciones
window.onload = () => {
    const loading = document.getElementById("loading")
    const user = document.getElementById("user")
    const body = document.querySelector("body")
    const play = document.querySelector(".menu__play")
    const audio = document.getElementById("audio")

    // Lo asigno un 1.5 segundos para que se pueda apreciar la pestaña de carga
    setTimeout(() => {
        loading.classList.add("loading--close")
        body.classList.remove("hidden")
        playSound(audio)
        user.addEventListener("input", (e) => {readUsername(e.target.value, user)})
        play.addEventListener("click", () => startGame(user))
    }, 1500)
}

// Esta función es para generar la música de fondo
const playSound = (audio) => {
    const audioContext = new AudioContext()
    const gainNode = audioContext.createGain()
    gainNode.gain.value = 0.05
    gainNode.connect(audioContext.destination)
    const source = audioContext.createMediaElementSource(audio)
    source.connect(gainNode)
    audio.play();
}

let username = "";

// Esta función es para leer lo que se escribe en el input donde se ingresa el nombre del usuario
const readUsername = (value, user) => {
    username = value
    document.getElementById("username").textContent = value
    user.classList.remove("menu__user--failed")
    // Esto era en caso queria cambiar a otro HTML podria guardarse el nombre de usuario
    //localStorage.setItem("username", value)
}

// Esta función se lanzará al presionar en jugar, tiene una validación en caso el nombre esté vacio
const startGame = (user) => {
    if(!username) return emptyUser(user);
    const menu = document.querySelector(".menu")
    const game = document.querySelector(".game")
    menu.classList.add("menu--close")
    game.classList.add("game--show")
    playing()
}

// Esta función es para la validación en caso el nombre del usuario esté vacio
const emptyUser = (user) => {
    const music = new Audio('./audio/error.mp3');
    music.play();
    music.playbackRate = 2;
    user.classList.add("menu__user--failed")
}


// -------------- ESTA PARTE PARA LO QUER SERIA EL JUEGO ----------------

const playing = () => {
    counter()
    start()
}

// Esto es el contador del 3, 2, 1, ¡A jugar!
const counter = () => {
    const bgFont = document.querySelector(".bg__about")
    const game__content = document.querySelector(".game__content")
    setTimeout(() => {
        bgFont.style.backgroundColor = "#00000090"
        bgFont.style.pointerEvents = "none"
        const counterText = document.querySelector(".game__counter")
        counterText.style.opacity = 1
        setTimeout(() => {
            counterText.textContent = 2
            setTimeout(() => {
                counterText.textContent = 1
                setTimeout(() => {
                    counterText.textContent = "¡A jugar!"
                    setTimeout(() => {
                        counterText.textContent = ""
                        counterText.style.display = "none"
                        bgFont.style.backgroundColor = "transparent"
                        game__content.classList.add("game__content--show")
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }, 750)
}

const start = () => {
    const opts = document.querySelectorAll(".game__icon--player")
    opts.forEach(o => {
        o.addEventListener("click", selectOption)
    })
}

// Esta función es para que se ejecute cuando seleccionas una opción ya sea piedra, pepel o tijera, esto lo que hará será verificar si perdiste o ganaste.
const selectOption = (e) => {
    const playerClass = e.target.id
    let random = Math.floor(Math.random() * 3)
    const computerClass = "c"+random
    const pc = document.getElementById(playerClass)
    const cc = document.getElementById(computerClass)
    pc.classList.add("game__icon--hover")
    cc.classList.add("game__icon--hover")
    const resultShow = document.querySelector(".game__result")
    resultShow.classList.add("game__result--show")
    const result = compareOptions(playerClass, String(random));
    const player = document.getElementById("player__scoreboard")
    const computer = document.getElementById("computer__scoreboard")
    const textResult = document.getElementById("result")
    const iconPlayer = document.getElementById("showIconPlayer")
    const iconComputer = document.getElementById("showIconComputer")
    const game__content = document.querySelector(".game__content")
    iconPlayer.src = iconUrl[playerClass]
    iconComputer.src = iconUrl[random]
    game__content.classList.remove("game__content--show")
    textResult.textContent = result

    setTimeout(() => {
        switch(result){
            case "ganaste":
                player.textContent = ++scorePlayer
                break;
            case "perdiste":
                computer.textContent = ++scoreComputer
                break;
            case "empate":
                textResult.textContent = result
                break;
            default:
                break;
        }
        resultShow.classList.remove("game__result--show")
        document.getElementById(playerClass).classList.remove("game__icon--hover")
        document.getElementById(computerClass).classList.remove("game__icon--hover")
        game__content.classList.add("game__content--show")
    }, 2500)
}


// Esta función es para comparar las opciones que escogieron tu y la computadora, retornará si ganaste, empataste o perdistes
const compareOptions = (optPlayer, optComputer) => {
    switch (optPlayer){
        case "0":
            switch (optComputer){
                case "0":
                    return "empate";    
                case "1":
                    return "ganaste";
                case "2":
                    return "perdiste";    
                default:
                    return "error"         
            }
        case "1":
            switch (optComputer){
                case "0":
                    return "perdiste";    
                case "1":
                    return "empate";
                case "2":
                    return "ganaste";    
                default:
                    return "error"         
            }
        case "2":
            switch (optComputer){
                case "0":
                    return "ganaste";    
                case "1":
                    return "perdiste";
                case "2":
                    return "empate";    
                default:
                    return "error"         
            }
        default:
            return "error"
    }
}
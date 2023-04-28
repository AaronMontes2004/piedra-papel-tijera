
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
        //playSound(audio)
        user.addEventListener("input", (e) => {readUsername(e.target.value, user)})
        play.addEventListener("click", () => startGame(user))
    }, 1500)
}

// Esta función es para generar la música de fondo
const playSound = (audio) => {
    const audioContext = new AudioContext()
    const gainNode = audioContext.createGain()
    gainNode.gain.value = 0.1
    gainNode.connect(audioContext.destination)
    const source = audioContext.createMediaElementSource(audio)
    source.connect(gainNode)
    audio.play();
}

let username = "";

// Esta función es para leer lo que se escribe en el input donde se ingresa el nombre del usuario
const readUsername = (value, user) => {
    username = value
    localStorage.setItem("username", value)
    user.classList.remove("menu__user--failed")
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
}

// Esto es el contador del 3, 2, 1, ¡A jugar!
const counter = () => {
    const bgFont = document.querySelector(".bg__about")
    setTimeout(() => {
        bgFont.style.backgroundColor = "#00000080"
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
                    }, 1000)
                }, 1000)
            }, 1000)
        }, 1000)
    }, 750)
}
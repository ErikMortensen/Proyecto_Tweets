// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners(){

    document.addEventListener('DOMContentLoaded', iniciarApp);
    formulario.addEventListener('submit', agregarTweet);
    
}


// Funciones
function iniciarApp(e){
    tweets = JSON.parse(localStorage.getItem('tweets')) ||  [];
    crearHTML();
}

function agregarTweet(e){
    e.preventDefault();

    const tweet = document.querySelector('#tweet').value
    if(tweet === ''){
        console.log('tweet vacio');

        mostrarError('Un mensaje no puede ir vacio.');
        return;
    }

    const tweetObj = {
        id: Date.now(), 
        tweet //tweet: tweet  ## como son iguales se puede poner solo uno
    }

    tweets = [...tweets, tweetObj];

    crearHTML();

    formulario.reset();
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        contenido.removeChild(mensajeError);
    }, 1000);
}

function crearHTML(){
    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';
            
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// Agrega los tweets actuales al localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}


function onTokenJson(json){
  console.log(json);
  token = json.access_token;
}

function onTokenResponse(response){
  return response.json();
}

function onJson(json) {
  console.log(json);
  
  //PRIMA API
  const gallery = document.querySelector('#view1');
  gallery.innerHTML = '';
 
  for(let i=0;i<numRes;i++){
    const json0=json.collection.items[i];

    const titolo = json0.data[0].title;
    const caption = document.createElement('span');
    caption.textContent = titolo;
    caption.classList.add('nome');
    
    const img = document.createElement('img');
    img.src = json0.links[0].href;
    img.classList.add('foto');
  
    gallery.appendChild(caption);
    caption.appendChild(img);
  }
}


function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


function search(event){
    event.preventDefault();
    console.log('Eseguo ricerca');
    const name_input=document.querySelector('#nome');
    const name_value=encodeURIComponent(name_input.value);
    const rest_url = 'https://images-api.nasa.gov/search?q='+name_value;

    fetch(rest_url).then(onResponse).then(onJson);
}

function onJson1(json) {
  //SECONDA API
  console.log(json);
  const libreria = document.querySelector('#view2');
  libreria.innerHTML = '';

  for(let i=0; i<max; i++){
  const results = json.shows.items[i];
  
  const title = results.name;
  const artista = results.publisher;
  const descr = results.html_description;
  
  const spazio = document.createElement('div');
  

  const titolo = document.createElement('h5');
  titolo.textContent = title;
  titolo.classList.add('podcast');

  const autori = document.createElement('h5');
  autori.textContent = artista;
  autori.classList.add('description');

  const foto = document.createElement('img');
  foto.src = results.images[0].url;
  
  const descrizione = document.createElement('p');
  descrizione.textContent = descr;
  descrizione.classList.add('description');
  

  spazio.appendChild(titolo);
  spazio.appendChild(autori);
  spazio.appendChild(descrizione);
  spazio.appendChild(foto);
  libreria.appendChild(spazio);
  }
}
 
function search_song(event){
  event.preventDefault();
  const song_input = document.querySelector('#canzone');
  const song_value = encodeURIComponent(song_input.value);
  console.log('Eseguo ricerca: ' + song_value);
  fetch("https://api.spotify.com/v1/search?type=show&q=" + song_value +"&market=IT",
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson1);
}

const client_id = '87a66f4358fa461a80e8e8b5ee053966';
const client_secret = '1f0fd21f9579456d92f4614230b16768';
let token;

fetch("https://accounts.spotify.com/api/token",
{
 method: "post",
 body: 'grant_type=client_credentials',
 headers:
 {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
 }
}
).then(onTokenResponse).then(onTokenJson);



const numRes=9;
const max=1;

const form = document.querySelector('form');
form.addEventListener('submit', search);

const form2 = document.querySelector('#second');
form2.addEventListener('submit', search_song);



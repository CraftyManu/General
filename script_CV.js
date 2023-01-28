window.onload = init;

function init () {
  const user_url = 'https://randomuser.me/api/?exc=login,registered,id';
  fetchData (user_url);
  crearTitulo ();
  document.getElementById('nombre').addEventListener('focusout', localStorage_nombre);
  document.getElementById('apellido').addEventListener('focusout', localStorage_apellido);
  document.getElementById('email').addEventListener('focusout', localStorage_email);
  document.getElementById('url').addEventListener('focusout', localStorage_url);
  document.getElementById('ciudad').addEventListener('focusout', localStorage_ciudad);
  document.getElementById('provincia').addEventListener('focusout', localStorage_provincia);
  document.getElementById('codigoPostal').addEventListener('focusout', localStorage_codigoPostal);
  document.getElementById('motivo').addEventListener('focusout', localStorage_motivoConsulta);

// cambio de temas/colores:

/* Seleccionar todos las opciones */
const cambiarColores = document.querySelector('#cambioColor');
const botonesTema = cambiarColores.querySelectorAll('button');

/* asociar la función manejarSeleccionTema al botón sobre el cual se hace click */
botonesTema.forEach((button) => {
  button.addEventListener('click', manejarSeleccionTema);
  });

  const temaGuardado = localStorage.getItem('temaSeleccionado');
  const temaPorDefecto = "uno";
  botonAnterior = document.querySelector('[data-opcion][aria-pressed="true"]');

  if (temaGuardado && temaGuardado !== temaPorDefecto) {
    botonAnterior.setAttribute('aria-pressed', false);
    document.querySelector(`[data-opcion="${temaGuardado}"]`).setAttribute('aria-pressed', true);
    document.documentElement.setAttribute('data-opcion', temaGuardado);
  }
  console.log('tema guardado en localStorage: ' + temaGuardado);
// responsive design
let w = window.innerWidth;

console.log('original window width: ' + w + "px")
// let colors_dropdown = document.getElementById('colors-dropdown')
let colorbtn = document.getElementById('colorbtn');
window.addEventListener("resize", function(){
  console.log('the window has been resized');
  let w = window.innerWidth;
  cambiarEstilo (w, colorbtn);
});

} /* fin funcion init */

// changes according to window size:
function cambiarEstilo (w, colorbtn) {
  if (w >= 980) {
    colorbtn.innerHTML = 'Colores: ';
  } else {
    console.log('viewport width: ' + w + 'px => medium or small screen');
    colorbtn.innerHTML = 'Tema';
  }
}



// función para seleccionar los colores:
function manejarSeleccionTema (event) {
  console.log('Cambiando los colores del tema:');
  console.log('Botón seleccionado', event.target);
  const tema = event.target.getAttribute('data-opcion');
  console.log('Opción seleccionada: ' + tema);
  document.documentElement.setAttribute('data-opcion',tema);
  botonAnterior.setAttribute('aria-pressed', false);
  event.target.setAttribute('aria-presed' , 'true');
  /* guardando el tipo de tema seleccionado en localStorage */
  localStorage.temaSeleccionado = tema;    
}

// funciones para crear una persona random: 
function fetchData (url) { //traer los datos del CV de la persona de la API (de la url definida como constante en la función init) y mostrarlos en el HTML.
  console.log('start fetch');
  fetch(url).then(response => {
    console.log('response: ');
    console.log(response);
    if (!response.ok) //si el estatus del pedido no es "ok: true", entonces dar un mensaje de error.
      throw Error('ERROR')
    return data = response.json();
  }).then(data => {
      console.log('data: ');
      console.log(data);
      const nombre = data.results.map(user => {
        return data.results[0].name.first + " " + data.results[0].name.last;
      })
      document.querySelector('#obj-name').innerHTML = nombre;

      const foto = data.results.map(user => {
        return data.results[0].picture.large;
      })
      document.querySelector('#divFoto').innerHTML = '<img alt="foto de perfil" id="p-img" src="' + foto  + '" >'

      const email = data.results.map(user => {
        return data.results[0].email;
      })
      document.querySelector('#p-email').innerHTML = '<p> <span> e-mail: </span> <br>' + email + '</p>';

      const telefono = data.results.map(user => {
        return data.results[0].phone;
      })
      document.querySelector('#p-phone').innerHTML = '<p> <span> Telefono: </span> <br>' + telefono + '</p>';

      const calle_nro = data.results.map(user => {
        return data.results[0].location.street.number
      })

      const calle_nombre =  data.results.map(user => {
        return data.results[0].location.street.name
      })
      const ciudad =  data.results.map(user => {
        return data.results[0].location.city
      })
      const pais =  data.results.map(user => {
        return data.results[0].location.country
      })
      const codigo_postal =  data.results.map(user => {
        return data.results[0].location.postcode
      })
      document.querySelector('#p-adress').innerHTML = '<p> <span> Dirección: </span> <br>' + calle_nombre + " " + calle_nro + ", " + ciudad + ", " + pais + ". CP:" + codigo_postal + '</p>';
      let latitudCV = data.results.map(user => { //obtener las coordenadas para la latitud de la persona del CV.
        return data.results[0].location.coordinates.latitude;
      }) 
      let longitudCV = data.results.map(user => { //obtener las coordenadas para la longitud de la persona del CV.
        return data.results[0].location.coordinates.longitude;
      })
      geolocalizacionCV (latitudCV, longitudCV);
    }).catch(error => {
    console.log(error);
  })
  } 

function crearTitulo () {
  // arrays para randomizar el título universitario del CV de la persona:
  const preTitulo = ["Ing.", "Lic.", "Técnico"]
  const titulo = ["en Informática", "Agronomo", "en Sistemas", "Industrial", "en Desarrollo", "en Biotecnología", "Electrónico"]
  // mostrar el título en el CV:
  var preIndex = Math.round(Math.random()*(preTitulo.length -1));
  var pre = preTitulo[preIndex];
  console.log('Pre titulo: ' + pre);
  var tituloIndex = Math.round(Math.random()*(titulo.length -1));
  var Titulo = titulo[tituloIndex];
  console.log('Titulo: ' + Titulo);
  document.querySelector('#titulo').innerHTML = pre + " " + Titulo;
}

// funciones para guardar los datos del formulario en localStorage:
function localStorage_nombre() {
  if (localStorage.nombre) {
    console.log('Nombre guardado: ' + localStorage.nombre);
  } else {
    const nombre = document.getElementById("nombre").value;
    localStorage.nombre = nombre;
    console.log('Nombre: ' + localStorage.nombre);
  }
}

function localStorage_apellido () {
  if (localStorage.apellido) {
    console.log('Apellido guardado: ' + localStorage.apellido);
  } else {
    const apellido = document.getElementById("apellido").value
    localStorage.apellido = apellido;
    console.log('Apellido: ' + localStorage.apellido);
  }
}

function localStorage_email () {
  if (localStorage.email) {
    console.log('email guardado: ' + localStorage.email);
  } else {
    localStorage.email = document.getElementById("email").value;
    console.log('email: ' + localStorage.email);
  }
}

function localStorage_url () {
  if (localStorage.web) {
    console.log('url guardada: ' + localStorage.url);
  } else {
    localStorage.url = document.getElementById("url").value;
    console.log('url : ' + localStorage.url);
  }
}

function localStorage_ciudad () {
  if (localStorage.ciudad) {
    console.log('ciudad guardado: ' + localStorage.ciudad);
  } else {
    localStorage.ciudad = document.getElementById("ciudad").value;
    console.log('ciudad: ' + localStorage.ciudad);
  }
}

function localStorage_provincia () {
  if (localStorage.provincia) {
    console.log('Provincia guardada: ' + localStorage.provincia);
  } else {
    localStorage.provincia = document.getElementById("provincia").value;
    console.log('Provincia: ' + localStorage.provincia);
  }
}

function localStorage_codigoPostal () {
  if (localStorage.codigo) {
    console.log('CP guardado: ' + localStorage.codigo);
  } else {
    localStorage.codigo = document.getElementById("codigoPostal").value;
    console.log('CP: ' + localStorage.codigo);
  }
}

function localStorage_motivoConsulta () {
  if (localStorage.motivoConsulta) {
    console.log('motivo consulta guardado: ' + localStorage.motivoConsulta);
  } else {
    localStorage.motivoConsulta = document.getElementById("motivo").value;
    console.log('motivo consulta: ' + localStorage.motivoConsulta);
  }
}
 
// ---- Mapa ----

function geolocalizacionCV (latitudCV, longitudCV) {
  console.log('latitudCV: ' + latitudCV + ", longitudCV: " + longitudCV);
  console.log('typeoff latitudCV = ' + typeof(latitudCV) );
  console.log(latitudCV);
  const lat = JSON.parse(latitudCV);
  console.log('typeoff lat = ' + typeof(lat) );
  console.log(lat);
  const long = JSON.parse(longitudCV);
  console.log('typeoff long = ' + typeof(long) );
  console.log(long);

  console.log('ADVERTENCIA: las coordenadas provistas por la API randomuser no concuerdan con la dirección');

	const map = L.map('map').setView([lat, long], 13); // las coordenadas provistas por la API no concuerdan con el país.

  var marker = L.marker([lat, long]).addTo(map);

  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	  maxZoom: 19,
	 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	 }).addTo(map);

   marker.bindPopup("<b>Advertencia!</b><br>Las dirección de contacto puede no coincidir con lo que ve en el mapa.").openPopup();
} 





  



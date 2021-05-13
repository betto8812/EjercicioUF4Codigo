
/*

EXPLICACION EFECTO SCROLL MENU

    
    Objetivo: Aplicar animaciones diferentes al menu segun si se baja o se sube con el scroll.
    
    
    - Lo primero que hay que hacer es saber si, al hacer scroll, subimos o bajamos en la página.
      
        Pasos:
        
        - Obtener la posicion inicial del scroll al cargar la página.
        - Obtener la posicion actual, una vez hecho scroll(a través del evento)
        - Realizar las comparaciones:
          Si la posicion del scroll actual es mayor al inicial, significa que estamos bajando.
          En cambio, si la posicion del scroll inicial es mayor, significa que estamos subiendo.
          Un aspecto importante, es actualizar la posicion inicial cuando se haga scroll a la actual
          porque sino nos calculará siempre la misma posicion inicial y siempre nos indicará que estamos bajando.
          
    - Lo siguiente será aplicar las animaciones segun subimos o bajamos.
      Si subimos, se mostrara la navegacion con los links rotados.
      Si bajamos, se ocultara.
      
      Al principio de la pagina, aplicaremos la animacion de mostrar el menu por defecto.

*/

function ScrollHighlightingMenu(){

	var navegacion = document.getElementById("contenedorMenu");
	var menu = document.getElementsByClassName("menu");
    
	var logo = document.getElementById("logo");
    
	var posicionScrollInicial = window.scrollY;



    for(var i=0;i<menu.length;i++){
        
        menu[i].classList.add("mostrarMenu");
        
    }
	
    navegacion.classList.add("mostrarNavegacion");
        
    navegacion.style.background="rgba(0,0,0,0.8)";

	window.addEventListener("scroll",function(){

		var posicionScrollActual = window.pageYOffset;

		if(posicionScrollActual>posicionScrollInicial){
            
			posicionScrollInicial = posicionScrollActual;

			for(var i=0;i<menu.length;i++){
				menu[i].classList.remove("mostrarMenu");
				menu[i].classList.add("esconderMenu");				
			}
            
            navegacion.classList.add("esconderNavegacion");
            navegacion.classList.remove("mostrarNavegacion");
		
		}
		else{
            
			posicionScrollInicial = posicionScrollActual;

			for(var i=0;i<menu.length;i++){
				menu[i].classList.remove("esconderMenu");
				menu[i].classList.add("mostrarMenu");
				}
            navegacion.classList.add("mostrarNavegacion");	
            navegacion.classList.remove("esconderNavegacion");
		}
	});
}



/*

    CARROUSEL IMAGENES AUTOMATICO
    
    Objetivo: Reproducir una serie de imagenes secuenciales y repitiendose en bucle, en un periodo de tiempo determinado.
    
    - Creamos 2 contadores que serán para determinar que imagenes se van a utilizar como fondo del carrousel automatico.
      Uno de los contadores sera el que indicara que imagen será la principal (la que se renderiza) y el otro sera el que 
      indique que imagen va a sustituir la ya mostrada.
      
      
*/

var slideshowCounterNext = 0;
var slideshowCounterMain = 0;

function Slideshow(){

	var listaImagenes = document.getElementsByClassName("slideshowItems");
    

	slideshowCounterNext++;
	slideshowCounterMain = slideshowCounterNext-1;

    
    /*
        Realizamos una comprobacion para ver si el contador ha llegado al final de la lista de imagenes, antes de seleccionar
        la imagen siguiente. Si llega al final, se ha de resetear el contador y volverlo a colocar a 0 para volver a empezar.
    */
    
    if(slideshowCounterNext == listaImagenes.length){
        slideshowCounterNext = 0;
    }

    
    /*
        Recorremos la lista de imagenes totales y comprobamos que indice de las imagenes coinciden con la posicion de los contadores para
        así asignarles las animaciones correspondientes.
        
        En el caso de la imagen principal, añadimos la animacion de hacerse mas pequeño y desplazandose hacia arriba para esconderse.
        En el caso de la siguiente imagen, añadimos la animacion de hacerse mas grande. Y asi hacer como una transición de relevo.
        Además, teniendo en cuenta que el resto de imagenes las dejamos ocultas, hay que habilitar que la siguiente en el turno sea
        visible en el momento de convertirse en la nueva imagen principal.
        
    
    */

	for(var i=0;i<listaImagenes.length;i++){

        
        /*
            Debido a que la primera imagen del nuevo bucle tiene un z-index mayor que la ultima del bucle anterior, cuando se haga el reset, se superpondrían. Para corregirlo, le asignaremos un z-index de 1 a la primera del siguiente bucle nuevo ,para que no tape a la ultima
            imagen, volviendose a asignarle su valor inicial. Este proceso se repite entre la primera imagen y la segunda imagen por el mismo motivo.
        
        */
		if(slideshowCounterNext == listaImagenes.length-1){
			listaImagenes[0].style.zIndex = "0";
		}

		if(slideshowCounterMain == 0){
			listaImagenes[0].style.zIndex = "6";
		}

		listaImagenes[i].classList.remove("animacionslideShowPreviousToMain");
		listaImagenes[i].classList.remove("animacionSlideshowMainToTop");

		
		if(i==slideshowCounterMain){
				
            listaImagenes[i].classList.add("animacionSlideshowMainToTop");
            
            

		}
		else if(i==slideshowCounterNext){
            
            
			listaImagenes[i].classList.add("animacionslideShowPreviousToMain");

			listaImagenes[i].style.display = "block";	
            

		}
		else{
			listaImagenes[i].style.display = "none";
		}
        
        
	}
}




/*
    EXPLICACION APARTADO PESTANAS
    
    Objetivo: Poder cambiar de contenido en un mismo espacio contenedor a través de las pestañas.
    
    Pasos:
    - Lo primero es desactivar todos los contenedores de las historias excepto la historia Habitacion 206, que estará visible
      por defecto. 
      Lo haremos a través de un bucle for para desactivarlo y pondremos display:block para mostrar la primera historia.
      Además, añadiremos las animaciones del titulo y la descripcion con las clases hechas en css.
    - Por cada historia, agregaremos un controlador de eventos que lo que hara es detectar en cada una de las pestañas si se le da
      clic o no. 
    - Además, para saber que bloque de contenido de la historia mostrar, necesitamos extraer la informacion del id del evento click que
      se ha generado y lo compararemos con cada uno de los ids de las pestañas:
      Por ejemplo, si el id del evento coincide con la historia de la habitacion 206, mostrara ese tipo de contenido y ocultara
      el resto de historias. Igual ocurre con los demas
      
      Además, asignaremos a la pestaña del contenido que se muestra, un resaltado de color rojo para señalar cuál es el que esta activo.
      Y lo reseteamos al principio para que no existan conflictos de resaltado con los anteriores y confudiria al usuario.
      
      Por último, añadiremos la animacion de rotacion del texto para el titulo y la descripcion de la historia activa.
      
*/



function Pestanas(){

	var contenedoresPestanas = document.getElementsByClassName("contenedorHistorias");
    
	var listaPestanasNavegacion = document.getElementsByClassName("etiquetasPestanasHistorias");
    
    var iconosCaracteristicasHistorias = document.getElementsByClassName("indicadorDificultad");
    
    var submenu = document.getElementsByClassName("elementoSubmenu");
    
    
    

	for(var i=0;i<contenedoresPestanas.length;i++){
        
		contenedoresPestanas[i].style.display = "none";
     
		listaPestanasNavegacion[i].addEventListener("click",historiaMostrar);
	}	

	document.getElementById("contenedorHabitacion").style.display = "block";
    
	document.getElementsByClassName("tituloHistoria")[0].classList.add("entradaTituloHistoria");
    
	document.getElementsByClassName("contenidoHistoria")[0].classList.add("entradaContenidoHistoria");
    
    
    
    for(var i=0;i<submenu.length;i++){
        submenu[i].addEventListener("click",function(){
            
            var targetElementoSubmenu = event.currentTarget.id;
            
            for(var i=0;i<listaPestanasNavegacion.length;i++){
			 listaPestanasNavegacion[i].classList.remove("pestanaHistoriaActiva");
		    }	
            
            console.log(targetElementoSubmenu);
            
            if(targetElementoSubmenu == "elementoSubmenuHabitacion"){
                document.getElementById("contenedorHabitacion").style.display = "block";
            
			    document.getElementById("contenedorHospital").style.display = "none";
            
			    document.getElementById("contenedorFantasma").style.display = "none";
            
			   listaPestanasNavegacion[0].classList.add("pestanaHistoriaActiva");
            
               iconosCaracteristicasHistorias[0].classList.add("animacionIconoHistoriasDificultadFacil");
            }
            
            if(targetElementoSubmenu == "elementoSubmenuHospital"){
                document.getElementById("contenedorHabitacion").style.display = "none";
            
			    document.getElementById("contenedorHospital").style.display = "block";
            
			    document.getElementById("contenedorFantasma").style.display = "none";
            
			   listaPestanasNavegacion[1].classList.add("pestanaHistoriaActiva");
            
               iconosCaracteristicasHistorias[1].classList.add("animacionIconoHistoriasDificultadFacil");
            }
            
            if(targetElementoSubmenu == "elementoSubmenuSecuestro"){
                document.getElementById("contenedorHabitacion").style.display = "none";
            
			    document.getElementById("contenedorHospital").style.display = "none";
            
			    document.getElementById("contenedorFantasma").style.display = "block";
            
			   listaPestanasNavegacion[2].classList.add("pestanaHistoriaActiva");
            
               iconosCaracteristicasHistorias[2].classList.add("animacionIconoHistoriasDificultadFacil");
            }
            
        });
        
    }
    

	

	function historiaMostrar (){

		var e = event.target.id;
		
		for(var i=0;i<listaPestanasNavegacion.length;i++){
			listaPestanasNavegacion[i].classList.remove("pestanaHistoriaActiva");
		}	

		if(e == "habitacion"){
            
			document.getElementById("contenedorHabitacion").style.display = "block";
            
			document.getElementById("contenedorHospital").style.display = "none";
            
			document.getElementById("contenedorFantasma").style.display = "none";
            
			listaPestanasNavegacion[0].classList.add("pestanaHistoriaActiva");
            
            iconosCaracteristicasHistorias[0].classList.add("animacionIconoHistoriasDificultadFacil");
		}
		
		
		if(e == "hospital"){
            
			document.getElementById("contenedorHabitacion").style.display = "none";
            
			document.getElementById("contenedorHospital").style.display = "block";
            
			document.getElementById("contenedorFantasma").style.display = "none";
            
			listaPestanasNavegacion[1].classList.add("pestanaHistoriaActiva");

			document.getElementsByClassName("tituloHistoria")[1].classList.add("entradaTituloHistoria");
            
			document.getElementsByClassName("contenidoHistoria")[1].classList.add("entradaContenidoHistoria");
            
            iconosCaracteristicasHistorias[1].classList.add("animacionIconoHistoriasDificultadMedio");
		}

		if(e == "fantasma"){
            
			document.getElementById("contenedorHabitacion").style.display = "none";
            
			document.getElementById("contenedorHospital").style.display = "none";
            
			document.getElementById("contenedorFantasma").style.display = "block";
            
			listaPestanasNavegacion[2].classList.add("pestanaHistoriaActiva");

			document.getElementsByClassName("tituloHistoria")[2].classList.add("entradaTituloHistoria");
            
			document.getElementsByClassName("contenidoHistoria")[2].classList.add("entradaContenidoHistoria");
            
            iconosCaracteristicasHistorias[2].classList.add("animacionIconoHistoriasDificultadAlta");
		}
	}
}








var listaRutasImagenes = [];
var listaImagenes = document.getElementsByClassName("imagenGaleria");
var listaImagenesNavegacion = document.getElementsByClassName("imagenNavegacionGaleria");
var rutaImagenActual;
var contadorImagenes = 0;
var rutaImagenNavegacionActual;
var cont = 0;
var posActual;

function ModalLightBox(){
	
    
    /*
        Recorremos la lista de imagenes de la galeria para guardar cada una de sus rutas en un array
        que luego utilizaremos para compararlas con la del evento que se genere y comprobar que imagen se ha clicado,
        accediendo a la posicion coincidente.
        
        Además,registraremos un controlador de eventos "cuando se da clic" en cada una de las imagenes.
        Es decir, al darle clic en la imagen, ejecutará la funcion que abrira el modal del lightbox.
    
    */

	for(var i=0;i<listaImagenes.length;i++){
		listaRutasImagenes.push(listaImagenes[i].src);
		listaImagenes[i].addEventListener("click", openLightbox);
	}

    
    /*
    
        Para saber en que imagen se ha clicado en especifico y, por lo tanto, saber que imagen renderizar en el modal, 
        primero guardo la informacion de la ruta del evento clicado para luego compararlo con la lista de imagenes.
        La que coincida, obtenemos su posicion en el array de rutas de las imagenes.
        Por último, mostraremos el modal box y renderizaremos la imagen correspodiente con la posicion coincidente.
        
        
        
    */
    
	function openLightbox(){

		rutaImagenActual = event.currentTarget.src;

		for(var i=0;i<listaImagenes.length;i++){
			
			if(rutaImagenActual == listaRutasImagenes[i]){
                
				contadorImagenes = listaRutasImagenes.indexOf(rutaImagenActual);

				listaImagenesNavegacion[i].style.border = "4px solid red";
			}
		}

		document.getElementById("modalLightboxGaleriaFondo").style.display = "block";

		document.documentElement.style.overflow = "hidden";

		document.getElementById("ImageActual").innerHTML = "<img class='imagenGaleriaActual' src=' "+ listaRutasImagenes[contadorImagenes] + " '>";
        
        
        
    /*
    
        Los pasos son similares a lo anterior.
        Pero en este caso, lo que haremos es una barra de navegacion donde podamos navegar entre las imagenes y no ir
        una por una.
        
        He añadido que cuando se clique en una imagen de la navegacion o bien se clique en cada una de las imagenes de la seccion Galeria, 
        se resalte con un marco rojo en la misma navegacion para saber en donde estamos.
        Y las imagenes restantes no se aplique nada y no generen conflicto.
        
        
        
    */

		for(var i=0;i<listaImagenes.length;i++){

			listaImagenesNavegacion[i].addEventListener("click",function(){
				rutaImagenActual = event.currentTarget.src;

				
				document.getElementById("ImageActual").innerHTML = "<img class='imagenGaleriaActual' src=' "+ rutaImagenActual + " '>";

				contadorImagenes = listaRutasImagenes.indexOf(rutaImagenActual);


				for(var i=0;i<listaRutasImagenes.length;i++){
					if(listaRutasImagenes[i] == rutaImagenActual){
						listaImagenesNavegacion[contadorImagenes].style.border = "4px solid red";

					}
					else{
						listaImagenesNavegacion[i].style.border = "none";
					}
				}
                
			});
	   }
		
		closeLightbox();

	}
    
    
    /*
        Agregaremos otro controlador de eventos "clic" realizando una
        condicion que cuando el puntero del raton no coincida con el modal box, con los selectores css especificados
        (incluido la imagen renderizada, los botones para avanzar y retroceder, la navegacion), se salga del modal box
        a la pagina web con la propiedad display:none.
        Ademas activaremos otra vez el scroll para poder navegar por la pagina.
        Y reseteamos el resaltado de la navegacion.
    
    */

	function closeLightbox(){

		window.addEventListener("click", function(event){
            
			if(!event.target.matches(".imagenGaleriaActual") && 
               !event.target.matches(".imagenGaleria") && 
               !event.target.matches(".buttonsLightBox") && 
               !event.target.matches("#barraNavegacionGaleria") && 
               !event.target.matches(".imagenNavegacionGaleria") && 
               !event.target.matches("i")){
                
				    document.getElementById("modalLightboxGaleriaFondo").style.display = "none";
                
				    document.documentElement.style.overflow = "auto";
                
				    listaImagenesNavegacion[contadorImagenes].style.border = "none";
			}
		});

	}
}

/*
        Añadiremos al lightBox, la funcionalidad de poder avanzar y retroceder en las imagenes.  
        
        Funcion nextImage:
        
        - Si el contador es menor al tamaño maximo de la lista de imagenes, añade 1 posicion para avanzar a la siguiente imagen 
          y renderiza la imagen con la ruta en la posicion del contador.
        - Si el contador es igual al tamaño maximo de la lista de imagenes, significa que hemos finalizado el carrousel y hay
          que resetearlo para empezar de nuevo asignado la posicion de 0. 
          y renderiza la imagen con la ruta en la posicion del contador.
        - Ademas actualizamos el resaltado de la navegacion para la siguiente imagen.
*/



function nextImage(){
    
    

	listaImagenesNavegacion[contadorImagenes].style.border = "none";





	if(contadorImagenes==listaImagenes.length-1){
			contadorImagenes = 0;
			document.getElementById("ImageActual").innerHTML = "<img class='imagenGaleriaActual' src=' "+ listaRutasImagenes[contadorImagenes] + " '>";

	
	}
	else{

		contadorImagenes++;
		document.getElementById("ImageActual").innerHTML = "<img class='imagenGaleriaActual' src=' "+ listaRutasImagenes[contadorImagenes] + " '>";

	}

	listaImagenesNavegacion[contadorImagenes].style.border = "4px solid red";


}

/*
        
        Funcion previousImage:
        
        - Si el contador es menor al tamaño maximo de la lista de imagenes, añade 1 posicion para avanzar a la siguiente imagen 
          y renderiza la imagen correspondiente con la ruta en la posicion del contador.
        - Si el contador es menor a 0, hay que resetearlo al tamaño maximo de la lista y renderiza la imagen 
          con la ruta en la posicion del contador.
        - Ademas actualizamos el resaltado de la navegacion para imagen anterior.
*/

function previousImage(){
	
	listaImagenesNavegacion[contadorImagenes].style.border = "none";
	
	if(contadorImagenes <=0){
        
			contadorImagenes = listaImagenes.length-1;	
        
			document.getElementById("ImageActual").innerHTML = "<img class='imagenGaleriaActual' src=' "+ listaRutasImagenes[contadorImagenes] + " '>";
	}

	else{
        
		contadorImagenes--;	
        
		document.getElementById("ImageActual").innerHTML = "<img class='imagenGaleriaActual' src=' "+ listaRutasImagenes[contadorImagenes] + " '>";
	}
	
	listaImagenesNavegacion[contadorImagenes].style.border = "4px solid red";
}






/*
    EXPLICACION APARTADO PESTAÑAS GALERIA CON FILTRO
    
    Objetivo: Filtrar las imagenes de la galeria por categorias (habitacion,hospital,secuestro).
    
    - Recorro mediante un bucle cada una de las pestañas y les asignamos un disparador de eventos (click).
    - Por cada evento click, detecto el id de esa pestaña y lo comparo con cada una de los identificadores de todas las pestañas.
    - Segun el resultado de compararlos, mostrare las imagenes de esa categoria y ocultare el resto.
*/


function pestanasGaleriaFiltro(){
    
    var imagenesGaleria = document.getElementsByClassName("imagenNavegacionGaleria"); 
    var pestanasFiltro = document.getElementsByClassName("pestanasGaleriaFiltro");
    var habitacionFiltro = document.getElementsByClassName("habitacion");
    var hospitalFiltro = document.getElementsByClassName("hospital");
    var secuestroFiltro = document.getElementsByClassName("secuestro");
    
    var targetPestana;
    
    
    for(var i=0;i<pestanasFiltro.length;i++){
        
        pestanasFiltro[i].addEventListener("click", function(){
            
            targetPestana = event.target.id;
            
            if(targetPestana=="allPestanas"){
                
                
                for(var i=0;i<habitacionFiltro.length;i++){
                    habitacionFiltro[i].style.display = "block";
                }
                
                for(var i=0;i<hospitalFiltro.length;i++){
                    hospitalFiltro[i].style.display = "block";
                }
                
                for(var i=0;i<secuestroFiltro.length;i++){
                    secuestroFiltro[i].style.display = "block";
                }
            }
            
            if(targetPestana=="habitacionPestanasFiltro"){
                
                
                for(var i=0;i<habitacionFiltro.length;i++){
                    habitacionFiltro[i].style.display = "block";
                }
                
                for(var i=0;i<hospitalFiltro.length;i++){
                    hospitalFiltro[i].style.display = "none";
                }
                
                for(var i=0;i<secuestroFiltro.length;i++){
                    secuestroFiltro[i].style.display = "none";
                }
            }
            
            if(targetPestana=="hospitalPestanasFiltro"){
                
                
                for(var i=0;i<habitacionFiltro.length;i++){
                    habitacionFiltro[i].style.display = "none";
                }
                
                for(var i=0;i<hospitalFiltro.length;i++){
                    hospitalFiltro[i].style.display = "block";
                }
                
                for(var i=0;i<secuestroFiltro.length;i++){
                    secuestroFiltro[i].style.display = "none";
                }
            }
            
            if(targetPestana=="secuestroPestanasFiltro"){
                
                
                for(var i=0;i<habitacionFiltro.length;i++){
                    habitacionFiltro[i].style.display = "none";
                }
                
                for(var i=0;i<hospitalFiltro.length;i++){
                    hospitalFiltro[i].style.display = "none";
                }
                
                for(var i=0;i<secuestroFiltro.length;i++){
                    secuestroFiltro[i].style.display = "block";
                }
            }
        });
    }
    
}





/*

Explicación Efecto Acordeon.

El objetivo de este efecto, es conseguir mostrar y ocultar contenido en funcion de un evento (clic).

Para ello, he seguido los siguientes pasos:
1-. Primero hay que acceder a través de ByClassName a las preguntas y respuestas para poder trabajar.
2-. Recorremos todas las respuestas del array y las ocultamos en su estado inicial.
3-. Recorremos todas las preguntas del array y por cada pregunta, le asignamos un controlador de eventos.
    En este caso, al darle click a las preguntas, nos mostraran las respuestas.
4-. Para poder mostrar la respuesta correspondiente a su pregunta, registramos la pregunta donde se hizo click y su respuesta
    inmediatamente posterior(nextElementSibling).
5-. Comparamos si las respuesta obtenida de la pregunta clickeada, esta visible o oculta y en funcion de eso:

    - Si esta visible, se oculta. Además,  le quitamos la clase para que este coloreado en rojo y tachado, le quitamos
      los estilos y disparamos la animacion de ocultar pero esta vez a través de un contador para que de tiempo 
      a ejecutar la animacion ya que la propiedad display:none provocaba que no se vea dicha animacion.
    
    - Si esta oculta, se muestre. Además, le añadimos una clase para que este coloreado en rojo y tachado, 
      le aplicamos algunos estilos y disparamos la animacion de mostrar.
*/

function acordeon(){

	var preguntas = document.getElementsByClassName("preguntas");
	var respuestas = document.getElementsByClassName("respuestas");
	
	var preguntaActual;
    

	for(var i=0;i<respuestas.length;i++){
		respuestas[i].style.display = "none";
	}

	for(var i=0;i<preguntas.length;i++){

		preguntas[i].addEventListener("click",function() {

		  var pregunta = event.target;
		  var respuesta = event.target.nextElementSibling;

        
		  if(respuesta.style.display=="none"){
            
			 respuesta.style.display="block";
            
			 pregunta.classList.add("activePreguntas");
            
			 respuesta.classList.add("fadeInRespuestas");
            
			 respuesta.classList.remove("fadeOutRespuestas");
            
             pregunta.style.background = "black";
            
             pregunta.style.padding = "20px";
            
             pregunta.style.borderRadius = "20px";
		  }
		  else{
			
			 pregunta.classList.remove("activePreguntas");
            
			 respuesta.classList.remove("fadeInRespuestas");
            
			 respuesta.classList.add("fadeOutRespuestas");
            
             pregunta.style.background = "none";
            


			 var segundos = 0;
            
            //Contador para que de tiempo a ejecutar la animacion FadeOut
			 while(segundos<1){
				    setInterval(timer,500);

				    function timer(){

				        if(segundos == 1){
					
					       respuesta.style.display="none";
					       segundos = 0;
				        }
			 }
			         segundos ++;
			 }	
		  }
        
		});
	}
}





/*
        
        La funcion del modal del formulario de reservas se ejecutara cuando ocurra un evento de dar click en el boton de reservar (onclick).
        
        Entonces, se pueden producir dos situaciones:
        
        1-. En el caso de que haya rellenado todas las casillas con valores correctos, se abrira un modal con la confirmacion de la reserva,
          mostrando los datos que se han introducido anteriormente en las casillad mediante la propiedad value.
        
        2-. En el caso de que no haya rellenado todas la casillas o lo haya hecho de manera incorrecta, se abrira el mismo modal pero en 
          en este caso mostrando un mensaje de error en el registro.
          
          En ambos casos, una vez situados en el modal, se agregara un controlador de eventos para el clic en la ventana donde realizaremos 
          una condicion de que si el puntero del raton no coincide con los selectores del modal (es decir, que se clica fuera del modal o bien en
          el boton de aceptar), hará que se cierre el modal y volvamos a la pagina del formulario.
          
          Por último, al abrir el modal, desactivamos el scroll y al cerrarlo, volvemos a habilitarlo.
      
    */

function modalFormulario() {

	var formularioReservas = document.getElementById("formularioReservas");
    
	var nombre = document.getElementById("nombreReservas").value;
	var numeroPersonas = document.getElementById("numeroPersonasReservas").value;
	var fecha = document.getElementById("fechaReservas").value;
	var horario = document.getElementById("horarioReservas").value;

    
    var tituloValidacion = "Fallo en el registro";
	var mensajeValidacion = "Por favor, <br> introduce un valor válido en el campo";
    
    var tituloConfirmacionReserva = "Reserva confirmada satisfactoriamente";
	var mensajeConfirmacionReserva = "Estimado " + nombre +  ", <br> <br> Acabas de reservar con éxito tu sesión en nuestra escape room con los siguientes datos: ";
	var mensajeDatosReserva = "Nombre de la reserva: " + nombre +  "<br>Nº Personas: " + numeroPersonas + " jugador/es<br>Fecha: " + fecha + "<br>Horario: " + horario;

    
	
	
	
	
	function abrirModal () {

		document.getElementById("botonReservas").removeAttribute('type');
		document.getElementById("modalReservasFondo").style.display = "block";
        
        document.getElementById("tituloModalReservas").innerHTML =  tituloConfirmacionReserva;
		document.getElementById("mensajeConfirmacionReserva").innerHTML =  mensajeConfirmacionReserva;
		document.getElementById("mensajeDatosReserva").innerHTML =  mensajeDatosReserva;
		document.documentElement.style.overflow = "hidden";
	}

	function cerrarModal (){

		window.addEventListener("click",function(){

			if(event.target.matches("#modalReservasFondo") || event.target.matches("#cerrarModal") ){
				
				document.documentElement.style.overflow = "auto";
				document.getElementById("modalReservasFondo").style.display ="none";
				document.getElementById("botonReservas").setAttribute('type','submit');
                document.getElementById("mensajeDatosReserva").innerHTML =  "";
				
				formularioReservas.reset();
			}
		});

	}
    
    
    
    (function validacionCampos(){

		if(!document.getElementById("nombreReservas").checkValidity()){

            document.getElementById("modalReservasFondo").style.display = "block";
            
            document.getElementById("tituloModalReservas").innerHTML = tituloValidacion

		    document.getElementById("mensajeConfirmacionReserva").innerHTML =  mensajeValidacion;
            
            document.documentElement.style.overflow = "hidden";
            
            cerrarModal();
		}
		else{
		
			abrirModal();

			cerrarModal();		
		}

	})();	
}






/*

EXPLICACION EFECTO TOOLTIP

    - Añadimos por cada icono de redes sociales (instagram, facebook,twitter), dos disparadores de eventos (onmouseover, onmouseout) de forma 
      que cuando el usuario mueva el raton por encima del icono, aparezca y desaparezca una viñeta con información especifica.
      
    - Por cada tipo de evento (mouseover,mouseout), detectamos el elemento icono de redes sociales donde se paso el mouse por encima para luego
      realizar una serie de comparaciones a través del id del icono.
      A través de las comparaciones, sabremos donde ha ocurrido el evento y así aplicar la animacion
      de la viñeta en su correspondiente icono.
      
    - En el MouseOver(mouse por encima del icono) aplicaremos la animacion FadeIn y quitaremos la animacion FadeOut de la viñeta.
      En el MouseOver(mouse fuera del icono) aplicaremos la animacion FadeOut y quitaremos la animacion FadeIn de la viñeta.

*/


function tooltipRS(){
	
	var itemsRS = document.getElementsByClassName("fab");
	var itemsTooltips = document.getElementsByClassName("tooltipRS")

	var targetMouse;

	for(var i=0;i<itemsRS.length;i++){	


		itemsRS[i].addEventListener("mouseover",function(){

			targetMouse = event.target;

			if(targetMouse.id == "instagram"){
				itemsTooltips[0].classList.add("animacionTooltipFadeIn");
				itemsTooltips[0].classList.remove("animacionTooltipFadeOut");
			}

			if(targetMouse.id == "facebook"){
				itemsTooltips[1].classList.add("animacionTooltipFadeIn");
				itemsTooltips[1].classList.remove("animacionTooltipFadeOut");
			}

			if(targetMouse.id == "twitter"){
				itemsTooltips[2].classList.add("animacionTooltipFadeIn");
				itemsTooltips[2].classList.remove("animacionTooltipFadeOut");
			}

		});


		itemsRS[i].addEventListener("mouseout",function(){

			targetMouse = event.currentTarget;

			if(targetMouse.id == "instagram"){
				itemsTooltips[0].classList.add("animacionTooltipFadeOut");
				itemsTooltips[0].classList.remove("animacionTooltipFadeIn");
			}

			if(targetMouse.id == "facebook"){
				itemsTooltips[1].classList.add("animacionTooltipFadeOut");
				itemsTooltips[1].classList.remove("animacionTooltipFadeIn");
			}

			if(targetMouse.id == "twitter"){
				itemsTooltips[2].classList.add("animacionTooltipFadeOut");
				itemsTooltips[2].classList.remove("animacionTooltipFadeIn");
			}

		});

	}
}
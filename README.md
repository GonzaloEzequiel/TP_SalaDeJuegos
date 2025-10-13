# TP1SalaDeJuegos
El aplicativo Sala De Juegos es el primer Trabajo Práctico de la asignatura Laboratorio IV  
Desarrollado en Angular 20  
Hosteado en Firebase  
BBDD: SupaBase  
  
También usa:  
AngularMaterial
SweetAlert2

## V 1.0.0 Sprint 1
#### Novedades:
El aplicativo se despliega en Firebase (se detecta issue) conteniendo los siguientes componentes:
* Home
* Menu
* Quien-Soy
* Login

## V 1.0.1
#### Correcciones:
Se corrigó la infraestructura del proyecto en Angular permitiendo su correcto despliegue en Firebase hosting.  
Se rediseño el componente Login adecuandose a estándares de interfaz de usuario.  
Se realizó una adecuación de la paleta de colores del sitio.  
Se añadió información personal al componente Quien-Soy.  
Se corrigió la implementación (ubicación) del favicon.

## V 1.1.0 Sprint 2
### Novedades
Se estableció el componente Home como principal con acceso al resto.  
Se implementó el componente Registro para la creación de nuevos usuarios.  
Se implementó la base de datos Supabase para los sistemas de Login y Registro.  
Se implementó la validación de usuarioLogeado adaptando comportamientos para usuarios según haya ingresado o no a su cuenta.  

## V 1.1.1 
### Novedades
Se implementó el componente Error, para rutas inexistentes con redireccionamiento al Home.  

## V 1.2.0 Sprint 3
### Novedades
Se incorporó la sala de chat, accesible para todos los usuarios logeados.  
Se optimizó el aplicativo implementando Módulos de Angular, al agrupar los Componentes de similar naturaleza lógica.  
Se implementó el juego de "Ahorcado" con un teclado virtual (mejoras pendientes).

## V 1.2.1
### Correcciones
Se corrigió un issue en la sala de Chat por el cual no se mostraban los mensajes en tiempo real.  
Se agregó un manejo de excepciones para el componente Registro por el cual se mostraban errores de creación de usuario nativos de la base de datos.

### Novedades
Se modificó la interfaz visual del juego "Ahorcado", la disposición de los elementos en pantalla y se agregaron indicadores visuales de intentos y errores.  
Se implementó el juego de "Mayor o Menor".  
Se implementó un apartado con las reglas del juego para cada componente Juego.  

## V 1.3.0 Sprint 4
### Novedades
Se implementó el juego de "Preguntados" (llama a la API via Servicio).  
Se definió el juego propio, actualizándose la información del mismo en el componente QuienSoy.

## V 1.3.1
### Correcciones
Mayor o Menor | Se modficó el puntuaje que otorga una 'apuesta' por carta igual.

### Novedades
Se estableció la funcionalidad de opción rejugabilidad para cada uno de los juegos. Cuando antes se enviaba automáticamente al home, el usuario ahora tiene la posibilidad de jugar otra partida.  
Se implementó el juego propio.

## V 1.4.0 Sprint 5
### Novedades
Se implementó la funcionalidad de puntuaciones para cada juego. Tras finalizar el juego, la puntuacion obtenida por el usuario, para el juego, se guarda en la base de datos para que los administradores puedan verla.  
Se agregó el complemento encuesta, con validaciones de formulario ReactiveForms a modo de encuesta de usuario. Las respuestas de la encuesta se guardan en la base de datos.

## V 1.4.1
### Correcciones
Se cambió el redirect al componente del login, para cuando un usuario no loegeado intenta iniciar un juego.  
Se corrigió un bug por el cual no se mostraba la hora en el mensaje al momento de enviarlo.  
Se corrigió un bug donde si bien validaba el largo del campo 'teletfono' del componente encuesta no se mostraba un mensaje de advertencia.

### Novedades
//Se realizaron modificaciones en los indicadores visuales de los Puntajes/Vidas/Rondas relativos a cada juegos.  
//Se implementaron indicadores visuales para aciertos/errores en cada juego.  
//Se modificaron los estilos visuales de las botoneras.

## V 1.4.2
### Novedades
Se implemetó el lazy loading para todas las rutas del aplicativo, tanto para los módulos como para los componentes.  
Se agregó la opción del login rápido para usuario y para admin de forma separada.

### Correcciones
//Se corrigió un error por el cual la totalidad de los componentes del formulario Encuesta mostraba sus campos como invalid y sus respectivos mensajes de error.

### V1.5.0  Srpint 6
//Se implementó el componente Respuestas para los usuarios de perfil administrador.  
//Se securizaron las rutas mediante el uso de distintos Guards, según usuario logeado (o no), administrador e incompletitud de formulario.

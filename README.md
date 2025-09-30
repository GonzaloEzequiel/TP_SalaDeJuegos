# TP1SalaDeJuegos
El aplicativo Sala De Juegos es el primer Trabajo Práctico de la asignatura Laboratorio IV  
Desarrollado en Angular 20 y desplegado en Firebase con base de datos SupaBase

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
//Se agregó un manejo de excepciones para el componente Registro por el cual se mostraban errores de creación de usuario nativos de la base de datos.

### Novedades
//Se modificó la interfaz visual del juego "Ahorcado", la disposición de los elementos en pantalla y se agregaron indicadores visuales de intentos y errores.  
Se implementó el juego de "Mayor o Menor".  
Se implementó un apartado con las reglas del juego para cada componente Juego.  

## V 1.3.0 Sprint 4
### Novedades
Se implementó el juego de "Preguntados" (llama a la API via Servicio).  
Se definió el juego propio, actualizándose la información del mismo en el componente QuienSoy.

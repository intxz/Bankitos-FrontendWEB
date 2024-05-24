# Minimo 2 Roberto Implementar un Chatbot

## Resumen de Tareas 
- Para implementar un chatbot he decidido usar Dialogflow como se sugería 
- Me registré en GCP
- Creé un servicio de Dialogflow
- Dentro de dialogflow agregué un agente básico nuevo para que responda a las peticiones
- Después añadí un pre-built agent para que respondiera FAQs y fuera más útil
- He modificado el **backend**:
	- Nueva ruta para peticiones de mensajes hacia el chatbot en chatbot_route.ts
	- ChatbotController.ts maneja la logica para responder al mensaje del usuario
	- He agregado las rutas correspondientes al app.ts
	- Nuevo fichero .env con variables de entorno para manejar las credenciales de manera segura
	- Modificado environment.ts para trabajar con estas variables de entorno
	- Implementación de Autenticación para usar chatbot (con token)
- He modificado el **fronted end en react**:
	- Añadí una nueva ruta /chatbot para poder usar el chat
	- Creé un nuevo componente chatbot para tener una interfaz y poder interactuar con el chatbot
	- Se implementó el uso del token
	- Input para teclear un mensaje, botón para envíar petición y text box para mostrar respuesta

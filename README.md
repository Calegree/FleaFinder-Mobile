# fleafinder_backend

## Cómo ejecutar

1) La versión del backend es java 17.
2) Revisar en pom.xml que todo este instalado sin ninguna acción requerida.
3) Crear en local base de datos "fleafinder_backend" (si no existe).
4) Generar clave que se usará para firmar jwt (Algoritmo HS256, base 64, 32 bytes).
5) Agregar la clave a Enviroments variables en IntelliJ de la siguiente manera: JWT_PRIVATE_KEY=clave.
6) Correr la aplicación.

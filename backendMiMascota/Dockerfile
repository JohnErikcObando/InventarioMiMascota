FROM mimascotaa:latest
# Instalar Docker Compose
RUN apt-get update && apt-get install -y docker-compose

# Copiar el archivo docker-compose.yml al contenedor
COPY docker-compose.yml /app/docker-compose.yml

# Definir el directorio de trabajo
WORKDIR /app

# Ejecutar docker-compose up al iniciar el contenedor
CMD ["docker-compose", "up"]

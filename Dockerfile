# Use an official OpenJDK runtime as the base image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from your host machine to the container
COPY target/1SalesSavvy-Project-0.0.1-SNAPSHOT.jar 1SalesSavvy-Project.jar

# Copy the application.properties file to the container
COPY src/main/resources/application.properties /app/config/application.properties

# Expose the port your application runs on
EXPOSE 8081

# Command to run the application
ENTRYPOINT ["java", "-jar", "1SalesSavvy-Project.jar", "--spring.config.location=file:/app/config/application.properties"]

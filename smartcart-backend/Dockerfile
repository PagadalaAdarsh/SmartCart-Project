# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built application JAR file into the container
COPY target/salessavvy-0.0.1-SNAPSHOT.jar app.jar  

# Expose the application port
EXPOSE 8081

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]

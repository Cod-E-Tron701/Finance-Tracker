FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/finance-tracker-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

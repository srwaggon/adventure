FROM openjdk:24-jdk
COPY src/main/resources/keystore.p12 ./keystore.p12
ENV SPRING_PROFILES_ACTIVE=production
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8443
ENTRYPOINT ["java","-jar","/app.jar"]

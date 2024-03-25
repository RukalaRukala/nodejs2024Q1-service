# Project Home Library Service


## Installation and launch

1. Clone the repository:

    ```
    git clone https://github.com/RukalaRukala/nodejs2024Q1-service.git
    ```

2. Go to the next branch of the repository:

    ```
    git branch rest-service-containerization-docker-database-orm
    ```
   
3. Download the image from DockerHub:

   ```
   docker pull rukalarukala/home-library-service-app:latest
   ```
   
4. Build and run a Docker container:

   ```
   docker-compose up --build -d
   ```
   
5. Scan vulnerabilities:

   ```
   npm run docker:scan
   ```
   
6. Run tests:

   ```
   npm run test
   ```
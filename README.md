# Giphy Search App
This is an app to search and favorite Gifs from Giphy built using React, Spring Boot, JPA, JWT, Spring Security, and MySQL!

# Back-end Server Setup

1. **Clone app**

	```bash
	git clone https://github.com/mtannahill/code-challenge-app.git
	```

2. **Create MySQL database**

	```bash
	create database challenge_app
	```

3. **Update MySQL username and password**

	+ open the file `src/main/resources/application.properties`

	+ update the following properties for your database:
    
    ```bash
    spring.datasource.username= 
    spring.datasource.password= 
 	```   

4. **Run app**

	```bash
	mvn spring-boot:run
	```

	The back-end server will be on port '5000'.
    
# Front-end App Setup 

1. **Install Node.js NPM**

    If you don't already have it, install Node.js from https://nodejs.org/en/
    
2. **Install and Run NPM**

    On your command line in the challenge-app-client directory, install and run npm

    ```bash
    npm install
    npm start
    ```

    The front-end server will be on port `3000`.   Go To http://localhost:3000/ to access the app!
    
# Possible Future Improvements

- Adding User Roles to Security
- Allow User to Edit Profile details such as name, userid, or email
- Forgot Password functionality
- Login/Register using Google or Facebook
- More Responsive UI
- Heart displays over gif when hover, other fun UI updates (animation?)
- Gif Modal to view more information about gif and favorite/update labels
- Search on the users created labels/categories
- Export/Post gif to email or social media

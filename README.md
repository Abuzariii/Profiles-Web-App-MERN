## To Start the App

1. Create a mongodb cluster and copy the connection string for VS Code.
2. Open the project and in the root folder create a new file and name it as `.env`.
3. In the file create two variables as given below :

MONGO_URL=<paste connection string here>

PORT=4000 //If you use another port, then make sure to change it in the proxy field in `package.json` file within the client folder because that's where the client will send all it's requests.

4. Open the terminal in the root folder, run the command `npm run dev` to start the Express server.
5. Once the server has started and you are connected to the database(you will be notified in the console), open a new terminal and run the command `cd client` to move into client folder where you Reactjs front end code is. Here run the command `npm start` to start the Reactjs app.
6. Happy coding :)

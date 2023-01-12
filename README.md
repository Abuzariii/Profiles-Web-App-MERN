## To Start the App

<ol>
  <li>Create a mongodb cluster and copy the connection string for VS Code.</li>
  <li>Open the project and in the root folder create a new file and name it as `.env`.</li>
  <li>In the file create two variables as given below :
    <ol>
      <li>MONGO_URL=<paste connection string here></li>
      <li>PORT=4000 (If you use another port, then make sure to change it in the proxy field in `package.json` file within the client folder because that's where the client will send all it's requests.)</li>
    </ol>
  </li>
  <li>Open the terminal in the root folder, run the command `npm run dev` to start the Express server.</li>
  <li>Once the server has started and you are connected to the database(you will be notified in the console), open a new terminal and run the command `cd client` to move into client folder where you Reactjs front end code is. Here run the command `npm start` to start the Reactjs app.</li>
</ol>

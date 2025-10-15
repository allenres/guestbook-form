// import the express module
import express from 'express';

// create an instance of an Express application
const app = express();

// Enable static file serving (client side file that does not communicate with database)
app.use(express.static('public'));

// define the port number where our server will listen
const PORT = 3002;

// define a default "route" ('/') <- root dir
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    // send "Hello, World!" as a response to the client
    res.sendFile(`${import.meta.dirname}/views/home.html`); // <- cannot have multiple of these
});

// start the server and make it listen on the port specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
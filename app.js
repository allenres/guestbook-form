// import the express module
import express from 'express';

// create an instance of an Express application
const app = express();

// Enable static file serving (client side file that does not communicate with database)
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const records = [];

// define the port number where our server will listen
const PORT = 3002;

// define a default "route" ('/') <- root dir
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    // send "Hello, World!" as a response to the client
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get('/admin', (req, res) => {
    res.send({records})
})

app.post('/submit-form', (req, res) => {
    const record = req.body;
    records.push(record);
    console.log(records);
    res.sendFile(`${import.meta.dirname}/views/confirm.html`);
})

// start the server and make it listen on the port specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
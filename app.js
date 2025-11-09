// import the express module
import express from 'express';

// create an instance of an Express application
const app = express();

// Enable static file serving (client side file that does not communicate with database)
app.set('view engine', 'ejs');
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
    res.render('home');
});

app.get('/admin', (req, res) => {
    res.render('admin', {records});
})

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.post('/submit-form', (req, res) => {
    const record = req.body;
    record.timestamp = new Date();
    records.push(record);
    console.log(records);
    res.render('confirm', {record});
})

// start the server and make it listen on the port specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
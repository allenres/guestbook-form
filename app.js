// import the express module
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

// create an instance of an Express application
dotenv.config();
const app = express();

// Enable static file serving (client side file that does not communicate with database)
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

const records = [];

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// define the port number where our server will listen
const PORT = 3002;

// define a default "route" ('/') <- root dir
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {
    // send "Hello, World!" as a response to the client
    res.render('home');
});

app.get('/admin', async (req, res) => { // NOTE: Added 'async'
    try {
        // SQL query to select all records, ordered by newest first
        const sql = "SELECT * FROM contacts ORDER BY timestamp DESC";
        
        // Execute the query
        const [records] = await pool.query(sql);

        // Render the admin page with the data retrieved from the database
        res.render('admin', { records });

    } catch (err) {
        console.error('Error retrieving records for admin page:', err);
        res.status(500).send('Error loading admin panel.');
    }
});

app.get('/db_test', async (req, res) => { 
    try {
        // SQL query to select all records, ordered by newest first
        const sql = "SELECT * FROM contacts";
        
        // Execute the query
        const [records] = await pool.query(sql);

        // Render the admin page with the data retrieved from the database
        res.send(records);

    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ', err.message);
    }
});

app.get('/contact', (req, res) => {
    res.render('contact');
})

app.post('/submit-form', async (req, res) => { // NOTE: Added 'async'
    const record = req.body;
    record.timestamp = new Date();

    // The 'mailing' checkbox is only present if checked; set to 1 or 0 for MySQL BOOLEAN/TINYINT
    const isMailing = record.mailing ? 1 : 0; 

    // SQL prepared statement using positional placeholders (?)
    const sql = `INSERT INTO contacts 
                 (fname, lname, jobTitle, company, lnkIn, email, meeting, meetingOther, message, mailing, format, timestamp) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Values array corresponding to the placeholders
    const params = [
        record.fname,
        record.lname,
        record.jobTitle,
        record.company,
        record.lnkIn,
        record.email,
        record.meeting,
        record.meetingOther,
        record.message,
        isMailing, // Use the boolean value
        record.format,
        record.timestamp
    ];

    try {
        // Execute the prepared statement
        const [rows] = await pool.execute(sql, params);
        // The in-memory array is no longer needed: records.push(record);
        
        console.log(`Record inserted with ID: ${rows.insertId}`);
        res.render('confirm', { record });

    } catch (err) {
        console.error('Error inserting record:', err);
        // Provide a user-friendly error page or message
        res.status(500).send('An error occurred during form submission.');
    }
});
// start the server and make it listen on the port specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
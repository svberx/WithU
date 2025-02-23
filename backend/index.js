import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors())
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'withu'
});

app.use(express.json());
app.get('/', (req, res) => {
    res.get('Hello World!');
})
 
app.get('/patients', (req, res) => {
    let sql = 'SELECT * FROM _Patient_';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to add a new patient

app.post('/patients', (req, res) => {
    let q = "INSERT INTO _Patient_ (`email`, `password`, `age`, `gender`) VALUES  (?)"
    const values = [
        req.body.email, 
        req.body.password, 
        req.body.age, 
        req.body.gender]
        
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
                return res.json("patient added")
        });
        
    });
    
    app.get("/feedback", (req, res) => {
        const q ="SELECT * FROM feedback";
        db.query(q, (err, data) => {
            if (err) return res.json(err)
            return res.json(data)
        });
    })
     
    
    app.post('/feedback', (req, res) => {
        let q = "INSERT INTO feedback (`id`, `status`, `description`, `medicaltestid`) VALUES  (?)"
        const values = [ 
            req.body.id, 
            req.body.status, 
            req.body.description,
            req.body.medicaltestid] 
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err)
            return res.json("Feedback added")
        });
    
    });


     app.get("/questionnaire", (req, res) => {
    const q ="SELECT * FROM questionnaire";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    });
})
 

app.post('/questionnaire', (req, res) => {
    let q = "INSERT INTO Questionnaire (`bmi`, `id`, `fever`, `nausea`, `headache`, `fatigue`, `jaundice`, `epigastric`, `email`) VALUES  (?)"
    const values = [
        req.body.bmi, 
        req.body.id, 
        req.body.fever, 
        req.body.nausea,
        req.body.headache,
        req.body.fatigue,
        req.body.jaundice,
        req.body.epigastric,
        req.body.email]

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("questionnaire added")
    });

});



    app.listen(8800, () =>{
    console.log('Backend server is running!');
});
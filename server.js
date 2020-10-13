const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/database');
const apiRoutes = require('./routes/apiRoutes');
const logger = require('morgan');
const inputCheck = require('./utils/inputCheck');
//Express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', apiRoutes);
app.use(logger('dev'));


/*db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row)=>{
    if(err) {
        console.log(err);
    }
    console.log(row);
});
*/
/*
db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result, this, this.changes);
  });
  

const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
            VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.run(sql, params, function(err, result){
    if(err) {
        console.log(err);
    }
    console.log(result, this.lastID);
})
*/

//default response for any other request (Not Found)
app.use((req,res) => {
    res.status(404).end();
});


//start server after DB connection
db.on('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
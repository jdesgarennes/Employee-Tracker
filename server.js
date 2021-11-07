 const figlet = require('figlet');
 const express = require('express');
 const sequelize = require('./config/connections');
 
// boilerplate setup for express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  

// Beginning of my cool Banner using figlet npm package  
const createBanner = () =>{

figlet.text('EMPLOYEE TRACKER -->', {
    font: 'DOS Rebel',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 150,
    whitespaceBreak: true
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
}
createBanner();


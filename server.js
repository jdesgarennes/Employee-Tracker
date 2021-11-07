 const figlet = require('figlet');
 const sequelize = require('./config/connections');
 const inquirer = require('inquirer');
 const Connection = require('mysql2');



// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    starMenu();
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






// Create Main Menu 

const starMenu = ()=> {
    inquirer
      .prompt(
          {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices:[
                'View all employees',
                'Add employee',
                'Update employee role',
                'View all roles',
                'Add a role',
                'View all departments',
                'Add a department',
                'Exit',  
            ],


})
            .then((awnser) =>{
                switch(awnser.action) {
                    case 'View all employees':
                        viewEmp();
                        break;

                    case 'Add employee':
                        addEmp();
                        break;
                    
                    case 'Update employee role':
                        updateEmp();
                        break;

                    case 'View all roles':
                        viewRoles();
                        break;

                    case 'Add a role':
                        addRole();
                        break;

                    case 'View all departments':
                        viewDepartments();
                        break;

                    case 'Add a department':
                        addDepartment();
                        break;

                    case 'Exit':
                        Connection.end();
                        break;

                    default:
                        console.log(`Please try again, not valid: ${awnser.action}`)
                        break;

                }

            })

};


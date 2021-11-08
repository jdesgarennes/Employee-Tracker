 const figlet = require('figlet');
 const sequelize = require('./config/connections');
 const inquirer = require('inquirer');
 const Connection = require('mysql2');



// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
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
                        console.log('you chose view emps');
                        break;

                    case 'Add employee':
                        //addEmp();
                        console.log('you chose add emps');
                        break;
                    
                    case 'Update employee role':
                        //updateEmp();
                        console.log('you chose update emps');
                        break;

                    case 'View all roles':
                        //viewRoles();
                        console.log('you chose view roles');
                        break;

                    case 'Add a role':
                        //addRole();
                        console.log('you chose add roles');
                        break;

                    case 'View all departments':
                        //viewDepartments();
                        console.log('you chose view deps');
                        break;

                    case 'Add a department':
                        //addDepartment();
                        console.log('you chose add dept');
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


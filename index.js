 const figlet = require('figlet');
 const mysql = require('mysql2');
 const inquirer = require('inquirer');
 const table = require('console.table');

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

// Connect to database
const con = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'password',
        database: 'employee_db'
      },
      console.log(`Connected to the employee_db database.`)
   
);
 

// Creation fo the Main Menu 
const startMenu = ()=> {

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

startMenu();
//  View all employees function
const viewEmp = () => {
    const query = "SELECT * FROM employee ";
    con.query(query, (err, results) => {
      if (err) throw(err);
      console.table(results);
          startMenu();
    });
    
  };

  // View all Roles Function

  const viewRoles = () =>{
      const query = "SELECT * FROM role";
      con.query(query,(err,results) =>{
        if (err) throw(err);
        console.table(results);
            startMenu();
      })
  }

  const viewDepartments = () =>{
    const query = "SELECT * FROM department";
    con.query(query,(err,results) =>{
        if (err) throw(err);
        console.table(results);
            startMenu();
      })
  }
 const figlet = require('figlet');
 const mysql = require('mysql2');
 const inquirer = require('inquirer');
 const table = require('console.table');

 // Begining of Super cool banner.. 
 const createBanner = () =>{

    figlet.text("\n \n \n \n EMPLOYEE TRACKER -->\n \n \n \n", {
        font: 'DOS Rebel',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 140,
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
// Connect to database
const con = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
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
                        con.end();
                        break;

                    default:
                        console.log(`Please try again, not valid: ${awnser.action}`)
                        break;

                }

            })

};


const newDpartment = [];

startMenu();

//------------------------------------------------------Begin of VIEW FUNCTIONS-----------------------------------------

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
// View Departments
  const viewDepartments = () =>{
    const query = "SELECT * FROM department";
    con.query(query,(err,results) =>{
        if (err) throw(err);
        console.table(results);
            startMenu();
      })
  }


//--------------------------------------------------------------BEGIN ADD FUNCTIONS-----------------------------------------


  // Add A department
  const addDepartment = ()=>{  
    inquirer.prompt([
          {
            type: 'input',
            name: 'deptName',
            message: 'What is the Department name you want to add?: ', 
                 
  },
      ])
      .then(answer =>{
        const queryDepartment =`INSERT INTO department (name) VALUES ("${answer.deptName}")`;
        con.query(queryDepartment,(err,results)=>{
            if (err) throw(err);
            console.table(results);
                startMenu();
        
      })
      })

    }

  // Begin Add employee function

  const addEmp = ()=>{

//const roles =[];

    const queryRole =`SELECT * from role `;
            con.query(queryRole,(err,results)=>{
                if (err) throw(err);
                const roles = results.map(x => {
                 return  {name:x.title,value:x.id}
                });

                //console.log(roles);
        
            
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the new employee?: ',      
         },

         {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the new employee?: ',  
         },

         {
            type: 'list',
            name: 'Role',
            message: 'What role is the new Employee?: ',
            choices: roles,
         }
        ])

        .then(answer =>{
            const insertRole =`INSERT INTO employee (first_name,last_name,role_id) VALUES ("${answer.firstName}","${answer.lastName}","${answer.Role}")`;
            con.query(insertRole),(err,results)=>{
                if (err) throw(err);
                console.log(results);
            }
            startMenu();
          })

 })
}
// Begin Add Role function

const addRole = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            name: 'aRole',
            message: 'What is the title of the New role you would like to add?: ',      
         },

         {
             type: 'input',
             name: 'salary',
             message: 'What is the salary of the new role?: ',
         },
        ]
    )}


    // Begin Update Employee

    const updateEmp = ()=>{
        nquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Please select name that you want to update.: ',
            },
            {
                type: 'list',
                name: 'urole',
                message: 'Please select which role the new employee should be.',

            },
        ])

    };
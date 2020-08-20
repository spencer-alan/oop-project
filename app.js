const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

let employees = [];

// Questions

const initialQuestion = [
  {
    type: "list",
    name: "role",
    message: "What is the role for this employee?",
    choices: ["Manager", "Engineer", "Intern", "Done!"],
  },
];

const employeeQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is this employees name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is this employee's ID number?",
    validate: id => {
      let invalid = isNaN(id);
      if (invalid) {
        return "Please enter a valid number";
      } else {
        return true;
      }
    }
  },
  {
    type: "input",
    name: "email",
    message: "What is this employee's email?",
  },
];

const managerQuestion = [
  {
    type: "input",
    name: "officeNumber",
    message: "What is this employee's office phone number?",
  },
];

const engineerQuestion = [
  {
    type: "input",
    name: "github",
    message: "What is this employee's GitHub username?",
  },
];

const internQuestion = [
  {
    type: "input",
    name: "school",
    message: "What school is this employee attending?",
  },
];

function init() {
  inquirer.prompt(initialQuestion).then(answer => {
    switch (answer.role) {
      case "Manager":
        makeManager();
        break;
      case "Engineer":
        makeEngineer();
        break;
      case "Intern":
        makeIntern();
        break;
      case "Done!":
        let website = render(employees);
        fs.writeFile(outputPath, website, (err) => {
          if (err) throw err;
          console.log("File created!");
        });
        break;
    };
  }).catch(error => {
    if (error) {
      return
    };
  });
};

function makeManager() {
  inquirer.prompt(employeeQuestions.concat(managerQuestion)).then(answers => {
    let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(manager);
    init();
  });
};

function makeEngineer() {
  inquirer.prompt(employeeQuestions.concat(engineerQuestion)).then(answers => {
    let engineer = new Engineer(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(engineer);
    init();
  });
};

function makeIntern() {
  inquirer.prompt(employeeQuestions.concat(internQuestion)).then(answers => {
    let intern = new Intern(answers.name, answers.id, answers.email, answers.officeNumber);
    employees.push(intern);
    init();
  });
};

//Start App
init();

// fs.writeFile("team.html", outputPath, (err) => {
//   if (err) throw err;
//   console.log("File created!");
// });
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

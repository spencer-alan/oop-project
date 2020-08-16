const inquirer = require("inquirer");

// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.role = "Employee";
  };

  getName() {
    inquirer.prompt(
      {
        type: "input",
        name: "name",
        message: "What is this employee's name?",
      }).then(answer => {
        answer.name = name;
      });
  };

  getId() {

  };

  getEmail() {

  };

  getRole() {

  };
}

module.exports = Employee;
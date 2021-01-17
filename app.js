const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const newTeam = [];

function startCreatingTeam() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is this team managers name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is this team managers id?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is this team managers email?",
      },
      {
        type: "input",
        name: "managerNumber",
        message: "What is this team managers number?",
      },
    ])
    .then((usersAnswers) => {
      const teamManager = new Manager(
        usersAnswers.managerName,
        usersAnswers.managerId,
        usersAnswers.managerEmail,
        usersAnswers.managerNumber
      );
      newTeam.push(teamManager);
      addAnotherTeamMember();
    });
}

function addAnotherTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add another team member?",
        name: "addTeamMember",
        choices: ["Manager", "Engineer", "Intern", "No more employees"],
      },
    ])
    .then((userChoice) => {
      switch (userChoice.addTeamMember) {
        case "Manager":
          addManager();
          break;
        case "Engineer":
          addEngineer();
          break;
        case "Intern":
          addIntern();
          break;
        case "No more employees":
          render(teamMembers);
          break;
      }
    });
}
function addEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the engineer's name?",
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the engineer's id?",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer's email?",
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer's github?",
      },
    ])
    .then((usersAnswers) => {
      const teamEngineer = new Engineer(
        usersAnswers.engineerName,
        usersAnswers.engineerId,
        usersAnswers.engineerEmail,
        usersAnswers.engineerGithub
      );
      newTeam.push(teamEngineer);
      addAnotherTeamMember();
    });
}

function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "internId",
        message: "What is the intern's id?",
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the intern's email?",
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is the intern's school?",
      },
    ])
    .then((usersAnswers) => {
      const teamIntern = new Intern(
        usersAnswers.internName,
        usersAnswers.internId,
        usersAnswers.internEmail,
        usersAnswers.internSchool
      );
      newTeam.push(teamIntern);
      addAnotherTeamMember();
    });
}

function createHtml() {
  //If they have selected not to add another team member then render the html
  if (fs.existsSync(OUTPUT_DIR) === false) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(newTeam));
}

startCreatingTeam() {
    inquirer.prompt(newTeam).then((usersAnswers) => {
        const dataTeam = render(usersAnswers);
        const currentWorkingDirectory = process.cwd();
        const newFilePath = path.join(
            currentWorkingDirectory,
            "renderedHTML.html"
        );
        writeToFile(newFilePath, dataTeam);
    })
};

createHtml(); 
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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

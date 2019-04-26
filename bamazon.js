// Required packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var tables = require("tables");

// Shortcut variables
var ct = console.table;
var ce = console.error;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "4l0h0m0r4",
    database: "bamazon_db"
  });

connection.connect(function(err) {
    if (err) {
        ce("error connecting: " + err.stack);
    }
    loadMerch();
});

function loadMerch() {
    connection.query("SELECT * FROM merch", function(err, res) {

        if (err) throw err;

        ct(res);

        promptForItem(res);
    });
}

function promptForItem(inventory) {
    inquirer
    .prompt([
        {
            type: "input"",
            name: "choice",
            message: "Specify the ID of the item you are interested in. [Hit Q to quit",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }
    ])
    
}
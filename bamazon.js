// Required packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var tables = require("tables");

// Shortcut variables
var cl = console.log;
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
    password: "",
    database: "bamazon_db"
});


connection.connect(function (err) {
    if (err) {
        ce("error connecting: " + err.stack);
    }
    loadMerch();
});

// Function that loads and console prints the table from the db.
function loadMerch() {
    connection.query("SELECT * FROM merch", function (err, res) {

        if (err) throw err;

        ct(res);

        promptForItem(res);
    });
}

// Function that prompts user for item ID
function promptForItem(inventory) {
    inquirer
        .prompt([{
            type: "input",
            name: "choice",
            message: "\n=====================================================================\n*********************************************************************\nSpecify the ID of the item you are interested in. [Press Q to quit]\n*********************************************************************\n=====================================================================",
            validate: function (val) {
                return !isNaN(val) || val.toLowerCase() === "q";
            }
        }])
        .then(function (val) {
            checkIfExit(val.choice);
            var idSelection = parseInt(val.choice);
            var merch = inventoryCheck(idSelection, inventory);

            if (merch) {
                promptForQuantity(merch);
            } else {
                cl("\n==========================\n**************************\nThat item is out of stock.\n**************************\n==========================");
                loadMerch();
            }
        });
}

function promptForQuantity(merch) {
    inquirer
    .prompt([{
        type: "input",
        name: "quantity",
        message: "\n=======================================\n***************************************\nHow many do you want? [Press Q to quit]\n***************************************\n=======================================",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "q";
        }
    }])
    .then(function (val) {
        checkIfExit(val.quantity);
        var quantity = parseInt(val.quantity);

        if (quantity > merch.stock_qty) {
            cl("\n==============================\n******************************\nDon't have that many in stock!\n******************************\n==============================");
            loadMerch();
          } else {
            makePurchase(merch, quantity);
          }
    });
}

function makePurchase(merch, quantity) {
    connection.query(
      "UPDATE merch SET stock_qty = stock_qty - ? WHERE prod_id = ?",
      [quantity, merch.prod_id],
      function (err, res) {
        cl("\n===============================================================================================================\n***************************************************************************************************************\nSuccessfully bought x" + quantity + " " + merch.prod_name + "s!\n***************************************************************************************************************\n===============================================================================================================");
        loadMerch();
      }
    );
  } 

  function inventoryCheck(idSelection, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].prod_id === idSelection) {
        return inventory[i];
      }
    }
    return null;
  }
  
  function checkIfExit(choice) {
    if (choice.toLowerCase() === "q") {
      cl("\n==================================================\n**************************************************\nThank you for shopping at Bamazon. Come back soon!\n**************************************************\n==================================================");
      process.exit(0);
    }
  }

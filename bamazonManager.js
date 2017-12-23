// npm require statements for mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// npm require for table formatting
require("console.table");

// create the connection info for sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});


// creates an array to use as a product list in inquirer
var productArray = [];

var itemAndCount = [];

var results = [];



// connect to the mysql server and sql database
connection.connect(function(error) {
  if (error) throw error;

});


function queryManager() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View products for sale":
          listInventory();
          break;

        case "View low inventory":
          viewLowInventory();
          break;

        case "Add to inventory":
          addToInventory();
          break;

        case "Add new product":
          AddNewProduct();
          break;
      }
    });
}


// create function that 1) reads product table from bamazon db, 2) prints
// to console, 3) queries user for item and quantity and 4) calls updateInventory
function listInventory(){
  connection.query("SELECT * FROM products", function(error, list) {
    if (error) throw error;
    console.log("\nHere is Bamazon's Inventory List:");
    console.log("\n---------------------------------------------------------------");
    console.table(list);
    console.log("---------------------------------------------------------------\n");

    results = list;
    queryManager();

  });     //connection.query close

}  // closes listInventory function



function startBamazon(){

  // Display current inventory
  queryManager();
}

// Start the main application
startBamazon();

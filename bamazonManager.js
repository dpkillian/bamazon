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
        "Change total inventory",
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

        case "Change total inventory":
          changeInventory();
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
    console.log("\n** Inventory List:");
    console.log("---------------------------------------------------------------");
    console.table(list);
    console.log("---------------------------------------------------------------\n");

    results = list;
    queryManager();

  }); //connection.query close

}  // closes listInventory function




function viewLowInventory(){
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function(err, res) {

    console.log("\n** Low Inventory (less than 5 units)");
    console.log("---------------------------------------------------------------");
    console.table(res);
    console.log("---------------------------------------------------------------\n");
    queryManager();

  }); //connection.query close

} // closes viewLowInventory




function changeInventory(){

  inquirer
    .prompt([
      {
        name: "itemNum",
        type: "input",
        message: "Please enter the item number: "
      },
      {
        name: "qty",
        type: "input",
        message: "Please add the new inventory total: "
      }
    ])
    .then(function(response) {

      // when finished prompting, insert a new item into the db with that info
      connection.query("UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: response.qty
        },

        {
          item_id: response.itemNum
        }
      ],

        function(err) {
          if (err) throw err;
          console.log("\n---------------------------------------------------------------");
          console.log("Your product was successfully updated!");
          console.log("---------------------------------------------------------------\n");
          // re-prompt the user for if they want to bid or post
          queryManager();
        }

      ); // connection query closed

    }); // .then closed

} // function closed




function startBamazon(){

  // Display current inventory
  queryManager();
}

// Start the main application
startBamazon();

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
  database: "bamazon"
});



// connect to the mysql server and sql database
connection.connect(function(error) {
  if (error) throw error;

  // run the listInventory function after the connection is made
  listInventory();
});



// create function that 1) reads product table from bamazon db, 2) prints
// to console, 3) queries user for item and quantity and 4) prints transaction
function listInventory(){
  connection.query("SELECT * FROM products", function(error, results) {
  if (error) throw error;
  console.log("\nHere is Bamazon's Inventory List:");
  console.log("\n---------------------------------------------------------------");
  console.table(results);
  console.log("---------------------------------------------------------------\n");

  // creates an array to use as a product list in inquirer
  var productArray = [];

  // for loop which populates productArray
  for (var i = 0; i < results.length; i++){
    productArray.push(results[i].product_name);
  };

  // inquirer prompt asks user to select a product to purchase
  inquirer
    .prompt([
      {
        name: "item",
        type: "rawlist",
        pageSize: results.length+1,
        message: "Which item would you like to purchase?",
        choices: productArray
      },
      {
        name: "count",
        type: "input",
        message: "How many would you like to purchase?"
      }

    ])
    .then(function(itemAndCount) {
      // query which selects chosen item from the product table and puts into "itemRecord" object
      connection.query("SELECT * FROM products WHERE ?", 
        [
          {
            product_name: itemAndCount.item
          }
        ],
        function(error, itemRecord) {

          // Rename values (in itemRecord object)
          var qtyOrdered = itemAndCount.count;
          var totalQty = itemRecord[0].stock_quantity
          var name = itemRecord[0].product_name
          var price = itemRecord[0].price
          var total = price*qtyOrdered;   
          var qtyRemaining =  totalQty-qtyOrdered; 

          // check to see if there is sufficient stock for quantity ordered
          if(qtyOrdered>totalQty){
            console.log("Sorry, there is insufficient stock to complete this purchase.");
            // listInventory();

          } else {

            // If there is enough item quantity, then print order summary
            console.log("\nOrder summary:\n");
              console.table([
                {
                  product: name,
                  unit_price: price,
                  qty_ordered: qtyOrdered,
                  total_price: total 
                }
              ]);

              console.log("Transaction Complete.\n");
              console.log("There are " + qtyRemaining + " " + name + " remaining.\n" );

            // Update the product stock_quantity with the new quantity
            connection.query("UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: qtyRemaining
                },

                {
                  product_name: name
                }
              ],
              function(error) {
                if (error) throw error;
              }
            );


          };  // if-else close


      });

      // connection.end();

    });   // .then close

  });     //connection.query close


}         // listInventory function close





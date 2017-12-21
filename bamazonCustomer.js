// npm require statements for mysql and inquirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// npm require for table formatting
require("console.table");

// create the connection info for sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // database username
  user: "root",

  // database password (NA) & database name ("bamazon")
  password: "",
  database: "bamazon"
});


// connect to the mysql server and sql database
connection.connect(function(error) {
  if (error) throw error;
  // run the listInventory function after the connection is made
  listInventory();
  
});




function listInventory(){
  connection.query("SELECT * FROM products", function(error, results) {
  if (error) throw error;
  console.log("\n---------------------------------------------------------------");
  console.table(results);
  console.log("---------------------------------------------------------------");
  // console.log("Item selected: " + "4");
  // console.log("---------------------------------------------------------------\n");
  // console.table(results[3]);


  var productArray = [];

  for (var i = 0; i < results.length; i++){
    productArray.push(results[i].product_name);
  };


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
      // console.log("This is the output of the prompt, called itemAndChoice");
      // console.log(itemAndCount);
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

          if(qtyOrdered>totalQty){
            console.log("Sorry, there is insufficient stock to complete this purchase.");
            // listInventory();

          } else {

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
                // if (error) throw error;
              }
            );


          };


      });

      connection.end();

    });   // .then close

  });     //connection query close


}         // listInventory close





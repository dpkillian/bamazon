# bamazon

##Description
This application implements an Amazon-like store front built using Node.js and MySQL, and run at the command line. It is built using the following npm packages:
1. mysql
2. inquirer
3. console.table

The application has two interfaces, **customer** and **manager**.


##MySQL Database
In order to run this application, MySQL needs to be installed and running on your machine.  If you don't have it installed, please visit the [MySQL Community Downloads page](https://dev.mysql.com/downloads/).  After MySQL is installed and running, you'll need a client to interact with the database to set it up and populate it with data.  The bamazon_db.sql file is included that contains the commands to accomplish this.


##Customer Interface
The user is initially presented with the current inventory of store items including: item_id, product_name,  department_name, price and stock_quantity. The user is then prompted to select an item (by item number) and the desired quantity.  If the selected quantity is available the order is fulfilled, and the order summary is displayed (product, unit_price, qty_ordered, total_price). Finally, the database is updated with the new stock_quantity of the ordered product. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface please follow the steps below:
```
git clone git@github.com:dpkillian/bamazon.git
cd bamazon
npm install
node bamazonCustomer.js
```

Initial screen shot of bamazonCustomer.js
![bamazonCustomer.js Screenshot](/images/cust1.jpeg)
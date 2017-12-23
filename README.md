# bamazon

## Description
This application implements an Amazon-like store front built using Node.js and MySQL, and run at the command line. It is built using the following npm packages:
1. mysql
2. inquirer
3. console.table

The application has two interfaces, **customer** and **manager**.


## MySQL Database
In order to run this application, MySQL needs to be installed and running on your machine.  If you don't have it installed, please visit the [MySQL Community Downloads page](https://dev.mysql.com/downloads/).  After MySQL is installed and running, you'll need a client to interact with the database to set it up and populate it with data.  The bamazon_db.sql file is included that contains the commands to accomplish this.


## Customer Interface
The user is initially presented with the current inventory of store items including: item_id, product_name,  department_name, price and stock_quantity. The user is then prompted to select an item (by item number) and the desired quantity.  If the selected quantity is available the order is fulfilled, and the order summary is displayed (product, unit_price, qty_ordered, total_price). Finally, the database is updated with the new stock_quantity of the ordered product. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface please follow the steps below:
```
git clone git@github.com:dpkillian/bamazon.git
cd bamazon
npm install
node bamazonCustomer.js
```


## Running bamazonCustomer.js
After typing "node bamazonCustomer.js", the user is presented with the following screen.

Initial screen shot of bamazonCustomer.js
![bamazonCustomer.js Screenshot 1](/images/cust1.jpeg)

	
Initial screen shot of the bamazon_db in Sequel Pro
![bamazonCustomer.js Screenshot 2](/images/cust2.jpeg)


Selecting item 1 (air compressor), the user is then asked for the quantity (10):
![bamazonCustomer.js Screenshot 3](/images/cust3.jpeg)


The order summary is showing the details of the order:
![bamazonCustomer.js Screenshot 4](/images/cust4.jpeg)


Looking at the updated Sequel Pro screen, the stock_quantity is changed to reflect the new inventory total:
![bamazonCustomer.js Screenshot 5](/images/cust5.jpeg)
















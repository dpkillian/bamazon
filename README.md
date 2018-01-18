# BAM-a-zon!!

## Description
This application implements an Amazon-like store front built using Node.js and MySQL, and run at the command line. It is built using the following npm packages:
1. mysql
2. inquirer
3. console.table

The application has two interfaces, **customer** and **manager**.


## MySQL Database
In order to run this application, MySQL needs to be installed and running on your machine.  If you don't have it installed, please visit the [MySQL Community Downloads page](https://dev.mysql.com/downloads/).  After MySQL is installed and running, you'll need a client to interact with the database to set it up and populate it with data.  The [bamazon_db.sql](https://github.com/dpkillian/bamazon/blob/master/bamazon_db.sql) file is included that contains the commands to accomplish this.


## Customer Interface
The user is initially presented with the current inventory of store items including: item_id, product_name,  department_name, price and stock_quantity. The user is then prompted to select an item (by item number) and the desired quantity.  If the selected quantity is available the order is fulfilled, and the order summary is displayed (product, unit_price, qty_ordered, total_price). Finally, the database is updated with the new stock_quantity of the ordered product. If the desired quantity is not available, the user is prompted to modify their order.

To run the customer interface, follow the steps below:
```
git clone git@github.com:dpkillian/bamazon.git
cd bamazon
npm install
node bamazonCustomer.js
```


## Manager Interface
The user/manager is initially presented with the four choices: 

1. view all products
2. view low inventory (items that have less than 5 units)
3. change total inventory
4. add a new item


Once selecting a choice, the application display either the desired info, or else the user is prompted for the further inputs.  For instance, when selecting "change total inventory", the user is queried for an item numnber and the new total quantity. 

To run the manager interface, after first cloning and installing bamazon, type the following:
```
node bamazonManager.js
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





## Running bamazonManager.js

After typing "node bamazonManager.js", the user is presented with the following screen.

Initial screen shot of bamazonManager.js
![bamazonCustomer.js Screenshot 1](/images/mngr1.jpeg)

	
Selecting "View products for sale"
![bamazonCustomer.js Screenshot 2](/images/mngr2.jpeg)


Selecting "View low inventory"
![bamazonCustomer.js Screenshot 3](/images/mngr3.jpeg)


Selecting "Change total inventory", and selecting item 8 (lotion) and changing to 1200 units total
![bamazonCustomer.js Screenshot 4](/images/mngr4.jpeg)


Selecting "View products for sale" to validate that item 8 (lotion) now had 1200 units
![bamazonCustomer.js Screenshot 5](/images/mngr5.jpeg)










CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
item_id				INTEGER AUTO_INCREMENT NOT NULL,
product_name			VARCHAR(20) NOT NULL,
department_name		VARCHAR(20) NOT NULL,
price					DECIMAL(10,2) NOT NULL,
stock_quantity		INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

USE bamazon;
INSERT INTO products
	(product_name, department_name, price, stock_quantity)
VALUES
	("air compressor",	"auto",	"39.87",	"11"),
	("pliers",			"auto", 	"11.13",	"3"),
	("ratchet",			"auto", 	"21.80",	"29"),
	("screw driver",		"auto", 	"7.24",	"65"),
	("toothbrush",		"home", 	"2.19",	"38"),
	("soap",				"home", 	"4.43",	"91"),
	("sanitzer",			"home", 	"9.98",	"42"),
	("lotion",			"home", 	"3.12",	"7"),
	("artemis",			"book", 	"21.95",	"54"),
	("daVinci",			"book", 	"20.32",	"22"),
	("ponies",			"book", 	"13.98",	"61"),
	("football",			"sports", "11.29",	"14"),
	("sneakers",			"sports", "61.99",	"19"),
	("glove",				"sports", "88.00",	"31"),
	("bat",				"sports", "31.79",	"77");
	

USE bamazon;
SELECT * FROM products;

USE bamazon;
SELECT * FROM products WHERE `product_name` = "football";

USE bamazon;
UPDATE products SET `stock_quantity` = "11"
WHERE `product_name` = "air compressor";
SELECT * FROM products;

	
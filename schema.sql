-- Drops db if it currently exists
DROP DATABASE IF EXISTS bamazon_db;

-- Creates bamazon_db
CREATE DATABASE bamazon_db;

-- Makes sure that the code that follows affects this database
USE bamazon_db;

-- Creates a table named merch within the bamazon_db
CREATE TABLE merch(

  -- Numeric ID column which will increment its default value with each new row
  prod_id INT AUTO_INCREMENT NOT NULL,

  -- Creates a string with the name of the product that cannot contain a null value
  prod_name VARCHAR(200) NOT NULL,

  -- Creates a string with the product category that cannot contain a null value
  dept_name VARCHAR(20) NOT NULL,

  -- Numeric column that contains the price value of the product in $
  price DECIMAL(10,2) NOT NULL,

  -- Numeric column that contains the stock quantity of the product that remains
  stock_qty INT(10) NOT NULL,

  -- Sets id as this table's primary key which means all data contained within it will be unique
  primary key(prod_id)
);

-- Inserts data to the merch table into their corresponding columns
INSERT INTO merch (prod_name, dept_name, price, stock_qty)
VALUES ("The Legend of Zelda: Breath of the Wild - Explorer's Edition", "Gaming", 89.88, 150),
  ("Lord of the Rings: The Motion Picture Trilogy - Extended Edition", "Movies", 59.98, 100),
  ("American Gods + Anansi Boys - Hardcover", "Books", 30.76, 150),
  ("Jelly Belly Assorted Sport Beans - 6 pack", "Food and Drink", 9.30, 6),
  ("Reebok Compression Shorts", "Clothing", 25.00, 11),
  ("Jack Link's Thick Cut Hickory Smoked Bacon Jerky - 6 Packs", "Food and Drink", 34.94, 300),
  ("iRobot Roomba 850 Robotic Vacuum with Scheduling Feature, Remote and Docking Station", "Home Basics", 409.99, 5),
  ("Red Dead Redemption 2 - PlayStation 4", "Gaming", 37.99, 100),
  ("Cascade Complete ActionPacs Dishwasher Detergent, Fresh Scent, 78 Count", "Home Basics", 25.50, 57),
  ("Watchmen - Hardcover Deluxe Edition", "Books", 24.98, 10);

SELECT * FROM merch;
DROP DATABASE IF EXISTS StoreManager;

CREATE DATABASE IF NOT EXISTS StoreManager;

USE StoreManager;

CREATE TABLE IF NOT EXISTS StoreManager.products (
    id INT NOT NULL auto_increment,
    `name` VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS StoreManager.sales (
    id INT NOT NULL auto_increment,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS StoreManager.sales_products (
    sale_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (sale_id)
        REFERENCES sales (id)
        ON DELETE CASCADE,
    FOREIGN KEY (product_id)
        REFERENCES products (id)
        ON DELETE CASCADE
)  ENGINE=INNODB;

SET SQL_SAFE_UPDATES = 0;

INSERT INTO products (`name`, quantity) VALUES
    ("Martelo de Thor", 10),
    ("Traje de encolhimento", 20),
    ("Escudo do Capitão América", 30);

INSERT INTO sales (date) VALUES
    (NOW()),
    (NOW());

INSERT INTO sales_products (sale_id, product_id, quantity) VALUES
    (1, 1, 5),
    (1, 2, 10),
    (2, 3, 15);

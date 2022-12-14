CREATE TABLE IF NOT EXISTS `users` (
   id INT(8) AUTO_INCREMENT,
   fullname VARCHAR(40),
   email VARCHAR(320) NOT NULL UNIQUE,
   pswd TEXT NOT NULL,
   verified BOOLEAN DEFAULT 0,
   plan ENUM('FREE', 'PREMIUM') DEFAULT 'FREE',
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

   PRIMARY KEY(id)
);

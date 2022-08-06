CREATE TABLE IF NOT EXISTS `subs` (
   id INT(8) AUTO_INCREMENT,
   enabled BOOLEAN DEFAULT 1,
   alias VARCHAR(16),
   event ENUM('presence.update') NOT NULL,
   notify BOOLEAN DEFAULT 1,
   phone VARCHAR(15) NOT NULL,
   user_id INT(8) NOT NULL REFERENCES users(id),
   expire_at DATETIME,
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

   PRIMARY KEY(id)
);

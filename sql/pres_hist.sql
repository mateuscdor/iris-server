CREATE TABLE IF NOT EXISTS `pres_hist` (
   id INT(8) AUTO_INCREMENT,
   status BOOLEAN NOT NULL,
   lastseen BIGINT,
   sub_id INT(8) REFERENCES subs(id),
   ts DATETIME DEFAULT CURRENT_TIMESTAMP,

   PRIMARY KEY(id)
);
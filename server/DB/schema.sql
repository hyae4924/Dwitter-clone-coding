DROP DATABASE IF EXISTS dwitter;
CREATE DATABASE dwitter;
USE dwitter;

CREATE TABLE users (
  `id` INT NOT NULL AUTO_INCREMENT Unique PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL Unique,
  `password` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL Unique,
  `email`VARCHAR(255) NOT NULL Unique,
  `url`text DEFAULT NULL
);

CREATE TABLE tweets (
`id` INT NOT NULL AUTO_INCREMENT Unique PRIMARY KEY,
`text`text NOT NULL,
`createdAt`datetime NOT NULL ,
`userId`INT NOT NULL ,
 FOREIGN KEY (userid) REFERENCES users(id)
);

INSERT INTO users (`username`,`password`,`name`,`email`)
VALUES
 ("hyae4924","$2b$10$16ESMKrLOnBwGSPYeOUSgue3DD8zfrLI4hkeiVy5Jn5MGM96J6oAG","jiwoong","hyae4924@gmail.com"),
 ("hyae1004","$2b$10$16ESMKrLOnBwGSPYeOUSgue3DD8zfrLI4hkeiVy5Jn5MGM96J6oAG","jihaye","hyae4924@naver.com");

INSERT INTO tweets (`text`,`createdAt`,`userId`)
VALUES
("hello my name is jiwoong",NOW(),1),
("hello my name is jihaye",NOW(),2)




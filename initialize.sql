DROP TABLE IF EXISTS usersCredentials, usersVehicles, usersContact, usersAddress, users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(50),
  pwd VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE usersContact (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  phone1 VARCHAR(50),
  phone2 VARCHAR(50),
  email VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
  REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE usersAddress (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  address VARCHAR(100),
  city VARCHAR(50),
  county VARCHAR(50),
  state VARCHAR(50),
  zip VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
  REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE usersVehicles (
  vehicle_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  brand VARCHAR(100),
  model VARCHAR(50),
  year VARCHAR(50),
  vin VARCHAR(50),
  PRIMARY KEY (vehicle_id),
  FOREIGN KEY (user_id)
  REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE usersCredentials (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  username VARCHAR(25),
  password VARCHAR(100),
  UNIQUE KEY (username),
  PRIMARY KEY (id),
  FOREIGN KEY (user_id)
    REFERENCES users (id)
    ON DELETE CASCADE
);

INSERT INTO users
	(first_name, last_name)
VALUES 
  ("James","Butt"),
  ("Josephine","Darakjy"),
  ("Art","Venere"),
  ("Lenna","Paprocki"),


INSERT INTO usersContact
	(user_id, phone1, phone2, email)
VALUES 
  (4,"907-385-4412","907-921-2010","lpaprocki@hotmail.com"),
  (3,"856-636-8749","856-264-4130","art@venere.org"),
  (1,"504-621-8927","504-845-1427","jbutt@gmail.com"),
  (2,"810-292-9388","810-374-9840","josephine_darakjy@darakjy.org")

INSERT INTO usersAddress
	(user_id, address, city, county, state, zip)
VALUES 
  (4,"4545 Courthouse Rd","Westbury","Nassau","NY",11590),
  (3,"96263 Greenwood Pl","Warren","Knox","ME","04864"),
  (1,"539 Coldwater Canyon Ave","Bloomfield","Essex","NJ","07003"),
  (2,"4119 Metropolitan Dr","Los Angeles","Los Angeles","CA",90021),

INSERT INTO usersVehicles
	(user_id, brand, model, year, vin)
VALUES 
(1,"ford","se",2011,"2fmdk3gc4bbb02217"),
(2,"dodge","mpv",2018,"3c4pdcgg5jt346413"),
(3,"ford","door",2014,"1ftfw1et4efc23745"),
(4,"chevrolet","1500",2018,"3gcpcrec2jg473991"),


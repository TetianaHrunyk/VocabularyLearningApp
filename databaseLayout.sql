/*CREATE database vocs;*/


CREATE TABLE IF NOT EXISTS users (
  userId serial PRIMARY KEY,
  username VARCHAR(60) unique NOT null,
  email VARCHAR(60) unique NOT null ,
  password VARCHAR(40) not null,
  registered timestamp not null
);

CREATE TABLE IF NOT EXISTS decks (
  userId int references users on delete cascade,
  deckName VARCHAR(80) not null,
  created timestamp,
  PRIMARY key (userId, deckName)
);


CREATE TABLE IF NOT EXISTS flashcards (
  id serial,
  userId int,
  deckName VARCHAR(80),
  front VARCHAR(300) not null,
  back VARCHAR(300) not null,
  context VARCHAR(500),
  added timestamp,
  revised timestamp check (revised <= added),
  nat_for float,
  for_nat float,
  PRIMARY KEY (id, userId),
  foreign key (userId, deckName) references decks(userId, deckName)
  on delete cascade on update cascade
);



-- DROP DATABASE IF EXISTS filament_annotations;
-- CREATE DATABASE filament_annotations;
-- \c filament_annotations;

DROP TABLE IF EXISTS snippet CASCADE;
CREATE TABLE snippet(
  snippet_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

DROP TABLE IF EXISTS tag CASCADE;
CREATE TABLE tag(
  tag_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  color VARCHAR(7)
);

DROP TABLE IF EXISTS annotation;
CREATE TABLE annotation(
  annotation_id SERIAL PRIMARY KEY,
  start INTEGER,
  finish INTEGER,
  tag_id INTEGER REFERENCES tag(tag_id) ON DELETE CASCADE,
  snippet_id INTEGER REFERENCES snippet(snippet_id) ON DELETE CASCADE
);

------------ SEEDS ------------

-- SNIPPETS
INSERT INTO snippet (description) VALUES('Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.');

INSERT INTO snippet (description) VALUES('A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.');

INSERT INTO snippet (description) VALUES('On Monday night, Mr. Fallon will have a co-host for the first time: The rapper Cardi B, who just released her first album, "Invasion of Privacy."');

-- TAGS
INSERT INTO tag (name, color) VALUES('PERSON', '#84d2ff');
INSERT INTO tag (name, color) VALUES('PLACE', '#84d');
INSERT INTO tag (name, color) VALUES('DATE', '#8ff');
INSERT INTO tag (name, color) VALUES('WEATHER', '#d2ff');

-- ANNOTATIONS
INSERT INTO annotation (start, finish, tag_id, snippet_id) VALUES(64, 71, 2, 1);
INSERT INTO annotation (start, finish, tag_id, snippet_id) VALUES(76, 87, 2, 1);
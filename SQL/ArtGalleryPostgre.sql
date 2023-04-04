-- Before running this, you must CREATE DATABASE artgallery(in pgadmin or cmd), 
--and then run this query within the artgallery dbms using the query tool in PgAdmin. (Ask Patty for more info)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '"$user",public', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

ALTER DATABASE artgallery;

--To check if role already exists, if not then make the user
DO
$do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'artist') THEN

      RAISE NOTICE 'Role "artist" already exists. Skipping.';
   ELSE
      CREATE ROLE artist LOGIN PASSWORD 'artistPassword';
   END IF;
END
$do$;

--To check if role already exists, if not then make the user
DO
$do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'postgres') THEN

      RAISE NOTICE 'Role "artist" already exists. Skipping.';
   ELSE
      CREATE ROLE postgres LOGIN PASSWORD 'Ilovetea@3';
   END IF;
END
$do$;

COMMENT ON ROLE artist IS 'This is a backend table user for the artists.';
COMMENT ON ROLE postgres IS 'General admin user for dbms administrators';


/*drop the tables if it already exists*/
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS artwork;
DROP TABLE IF EXISTS artist;
DROP TABLE IF EXISTS roles;


--Must happen in-between table drop and create
--Constricting deaths to on or before 2023
DROP DOMAIN IF EXISTS public.DateBeforeToday;
CREATE DOMAIN public.DateBeforeToday AS text
CHECK ( Value <= '2023');
ALTER DOMAIN public.DateBeforeToday OWNER to postgres;

DROP DOMAIN IF EXISTS public.email;
CREATE DOMAIN public.email AS text
CHECK (VALUE ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER DOMAIN public.email OWNER to postgres;

DROP DOMAIN IF EXISTS public.ValidPrice;
CREATE DOMAIN public.ValidPrice AS NUMERIC(10, 2)
CHECK ( Value > 0 AND Value < 1000000);
ALTER DOMAIN public.ValidPrice OWNER to postgres;

/*create the artist table*/
CREATE TABLE IF NOT EXISTS public.artist (
  artist_id SERIAL NOT NULL,
  fname varchar(50) NOT NULL,
  lname varchar(50),
  description varchar(750),
  email email NOT NULL,
  date_of_birth DateBeforeToday,
  date_of_death DateBeforeToday,
  nationality varchar(50),
  preferred_artistic_medium varchar(50),
  PRIMARY KEY (artist_id)
);
ALTER TABLE public.artist OWNER TO postgres;

/*create the artwork table*/
CREATE TABLE IF NOT EXISTS public.artwork (
  artwork_id SERIAL NOT NULL ,
  artist_id int NOT NULL ,
  title varchar(100) NOT NULL,
  date_of_creation DateBeforeToday,
  description varchar(500),
  price ValidPrice NOT NULL,
  art_medium varchar(100),
  image_url varchar(100) NOT NULL,
  PRIMARY KEY (artwork_id),
  FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);
ALTER TABLE public.artwork OWNER TO postgres;

/*create the roles table*/
CREATE TABLE IF NOT EXISTS public.roles (
  role_id SERIAL NOT NULL,
  role_name varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  PRIMARY KEY (role_id)
);
ALTER TABLE public.roles OWNER TO postgres;

/*create the customer table*/
CREATE TABLE IF NOT EXISTS public.customer (
  user_id SERIAL NOT NULL,
  fname varchar(50) NOT NULL,
  role_id int NOT NULL,
  lname varchar(50),
  date_of_birth DateBeforeToday,
  username varchar(50),
  nationality varchar(50),
  preferred_art_medium varchar(50),
  email email NOT NULL,
  password varchar(100) NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);
ALTER TABLE public.customer OWNER TO postgres;

/*create the order table*/
CREATE TABLE IF NOT EXISTS public.orders (
  artwork_id int NOT NULL,
  user_id int NOT NULL ,
  order_creation_date date NOT NULL,
  amount int NOT NULL,
  PRIMARY KEY (artwork_id, user_id),
  FOREIGN KEY (artwork_id) REFERENCES artwork(artwork_id),
  FOREIGN KEY (user_id) REFERENCES customer(user_id)
);
ALTER TABLE public.orders OWNER TO postgres;



/*populate the artist with artist*/
INSERT INTO artist (fname, lname, email, date_of_birth,  date_of_death, nationality,  preferred_artistic_medium, description ) VALUES 
('Maud', 'Lewis', 'maudlewis@example.com', '1903-03-07', '1970-07-30', 'Canadian', 'Oil paint', 'Maud Lewis was a Nova Scotian folk artist known for her brightly colored and charmingly naive paintings of rural life in Nova Scotia. Despite suffering from a debilitating form of arthritis that left her physically impaired, she continued to paint and sell her work from her small house until her death. Her art has since become internationally recognized, and her life story has been the subject of several books and films. Additionally, she has an amazing art expo on the Halifax Boardwalk.'),
('William E.', 'deGarthe', 'william@degarthe.com', '1907-05-31', '1983-03-23', 'Finnish', 'Sculpture', 'William E. deGarthe (1907-1983) was a Canadian painter, sculptor, and poet known for his depictions of the rugged coastline of Nova Scotia. He immigrated to Canada from Finland in 1926 and settled in Halifax, where he studied at the Nova Scotia College of Art and Design. deGarthes work often featured maritime themes and reflected his deep love for the sea. He is perhaps best known for his large-scale mural, "The Fishermens Monument," which he carved into a granite cliff in Peggys Cove, Nova Scotia. deGarthes work has been exhibited widely in Canada and is part of the collections of several major Canadian art museums.'),
('Boardman', 'Robinson', 'boardman@robinson.com', '1876-09-06', '1952-09-05', 'American', 'Painting', 'Boardman Robinson was an American painter, illustrator, and muralist known for his social and political commentary in his art. He was born in Nova Scotia, however moved to Boston around the age of 23. There, was a prominent figure in the American art scene in the early 20th century and was closely associated with the Ashcan School, a group of artists who sought to portray the grittier and more realistic aspects of American urban life. Robinson also gained recognition for his political cartoons, which often criticized the government and social injustices of his time. His work has been exhibited in major museums and galleries throughout the United States.'),
('Tom', 'Forrestall', 'tforrestall@gmail.com', '1936-01-01', NULL, 'Canadian', 'Watercolor Painting', 'Tom Forrestall is a Canadian artist known for his highly realistic and detailed paintings of landscapes, animals, and people. He was born in Middleton, Nova Scotia and studied at Mount Allison University. He has been a fulltime professional artist since 1960. His works, chiefly painted in watercolour or tempera, are held by major galleries throughout Canada.'),
('Patty', 'Weld Viscount', 'patty.weld.viscount@gmail.com', '1964-12-01', NULL, 'Canadian', 'Acrylic Painting', 'Patty Weld Viscount is an amateur artist hailing from the beautiful province of Nova Scotia, Canada. With a passion for acrylic and oil based paintings, Patty draws inspiration from the breathtaking landscapes that surround her. Her love for capturing the essence of her local surroundings is evident in her art, particularly in her skillful depictions of the sunset sky. Using photographs as reference, Patty expertly captures the colors and textures of the natural world and translates them onto canvas. As a proud Nova Scotian, Pattys artwork is a celebration of the beauty that exists in her own backyard. Her art is a testament to the power of nature and a reminder of the importance of appreciating the world around us.'),
('Chantal', ' Boisvert', 'chantalBoisvert3@gmail.com', '1969-03-29', '2016-03-25', 'Canadian', 'Painting', 'Chantal Boisvert is an artist that liked to paint in her spare time. She was inspired by her friend and family and painted what was close to her heart.'),
('Jennifer', 'Reid', 'jlreid17@gmail.com', '1998-05-30', NULL, 'Canadian', 'Painting', 'Jennifer Reid paints only when she has to and only paints her cat Spooky that passed away a few years ago');
/*populate the artwork with art pieces*/
INSERT INTO artwork (artist_id, title, date_of_creation,  price,  art_medium, image_url ) VALUES

/*Maud Lewis' Art Work entries*/
(1, 'White Cat', 1964, 10000, 'Oil on panel', 'artImages/WhiteCat.jpg'),
(1, 'Lighthouse', 1960, 9000, 'Oil on panel', 'artImages/Lighthouse.jpg'),
(1, 'Hauling Logs Coastal View', 1965, 9500, 'Oil on board', 'artImages/HaulingLogsCoastalView.jpg'),
(1, 'Painted Clam Shell', 1965, 5000, 'Oil on clam shell', 'artImages/PaintedClamShell.jpg'),

/*William E. deGarthe's Art Work entries*/
(2, 'Misty Cove', '1965', 1140, 'Oil on Canvas', 'artImages/MistyCove.jpg'),
(2, 'Study of a Woman', '1963', 240, 'Oil on Canvas', 'artImages/StudyOfAWoman.jpg'),
(2, 'Two Boats in the Harbour', '1965', 767, 'Oil on Canvas', 'artImages/TwoBoatsInTheHarbour.jpg'),
(2, 'Harbour Scene with Docked Boats', '1967', 561, 'Oil on Canvas', 'artImages/HarbourSceneWithDockedBoats.jpg'),

/*Boardman Robinson's Art Work entries*/
(3, 'Christ and Socrates', '1935', 943, 'Watercolor and pencil on paper', 'artImages/ChristAndSocrates.jpg'),
(3, 'Studies of Drapery', '1937', 1200, 'Brushed ink and pencil on paper', 'artImages/StudiesOfDrapery.jpg'),
(3, 'Hitch Hikers', '1933', 1200, 'Pencil on paper', 'artImages/HitchHiker.jpg'),

/*Tom Forrestall's Art Work entries*/
(4, 'Hunter', '1962', 2300, 'Oil on panel', 'artImages/Hunter.jpg'),
(4, 'Cheuters Brook Camp', '2007', 3209, 'Watercolor on paper', 'artImages/CheutersBrookCamp.jpg'),
(4, 'The Lake', '2014', 9345, 'egg tempera on board', 'artImages/TheLake.jpg'),
(4, 'Holding an Arrow', '1988', 6579, 'egg tempera on board', 'artImages/HoldingAnArrowhead.jpg'),
(4, 'Bike In The Alley', '2017', 7900, 'Watercolor on paper', 'artImages/BikeInTheAlley.jpg'),

/*Patty Weld Viscount's Art Work entries*/
(5, 'Cotton Candy Clouds', '2018', 260, 'Acrylic on canvas', 'artImages/CottonCandyClouds.jpg'),
(5, 'Light and Spring', '2019', 240, 'Acrylic on canvas', 'artImages/LightAndSpring.jpg'),
(5, 'Sunflower Field PEI', '2023', 70, 'Acrylic on board', 'artImages/SunflowerFieldPei.jpg'),
(5, 'Beach Stones', '2019', 90, 'Acrylic on canvas', 'artImages/BeachStones.jpg'),
(5, 'Just So', '2021', 540, 'Acrylic on canvas', 'artImages/JustSo.jpg'),
(5, 'Wave and Rain', '2022', 80, 'Acrylic on canvas', 'artImages/WaveAndRain.jpg'),
(5, 'Long Sunset', '2022', 520, 'Acrylic on canvas', 'artImages/LongSunset.jpg'),
(5, 'Point Michaud Beach', '2022', 260, 'Acrylic on canvas', 'artImages/PointMichaudBeach.jpg'),

/*Chantal Boisvert's Art Work entries*/
(6, 'Dog Daze', '2018', 260, 'Acrylic on canvas', 'artImages/DogDaze.jpg'),
(6, 'Druken Snowman', '2015', 100, 'Acrylic on canvas', 'artImages/DrukenSnowman.jpg'),
(6, 'Now And Zen', '2015', 70, 'Acrylic on canvas', 'artImages/NowAndZen.jpg'),
(6, 'Cherry Night', '2015', 90, 'Acrylic on canvas', 'artImages/CherryNight.jpg'),
(6, 'Tulips And Flowers', '2015', 333, 'Acrylic on canvas', 'artImages/TulipsAndFlowers.jpg'),
(6, 'Humming Bird', '2015', 20, 'Acrylic on canvas', 'artImages/HummingBird.jpg'),
(6, 'Village', '2015', 520, 'Acrylic on canvas', 'artImages/Village.jpg'),
(6, 'CherryBlossom', '2015', 60, 'Acrylic on canvas', 'artImages/CherryBlossom.jpg'),
(6, 'SunriseInGrass', '2015', 150, 'Acrylic on canvas', 'artImages/SunriseInGrass.jpg'),
(6, 'Spooky And Chantal', '2015', 150, 'Acrylic on canvas', 'artImages/SpookyAndChantal.jpg'),
(6, 'Hockey Game', '2015', 200, 'Acrylic on canvas', 'artImages/HockeyGame.jpg'),
(6, 'Ice Rink', '2015', 200, 'Acrylic on canvas', 'artImages/IceRink.jpg'),

/*Jennifer Reid Art Work entries*/
(7, 'Spooky', '2015', 35, 'Acrylic on canvas', 'artImages/Spooky.jpg');


INSERT INTO roles (role_name, password) VALUES
('Manager', 'Cookies'),
('User', 'Corgi');

/*populate the customer table with records*/
INSERT INTO customer (fname, lname, date_of_birth,  username, nationality, role_id, preferred_art_medium, email, password) VALUES
('Patrick','Viscount', '2001-09-29', 'PattyBones', 'Canadian', 1, 'Sculptures', 'patviscount@gmail.com', 'Passw0rd'),
('Sarah','Reid', '1990-03-10', 'DShorty', 'Canadian', 1, 'Painting', 'secret@gmail.com', 'Please!@Work'),
('Brent','Rushmore', '2001-06-12', 'KingOfTheSlush', 'Czech Republic', 1,  'Oil Paintings', 'brentmaning@gmail.com', 'Plain text password in a database'),
('Mark','Markens', '2010-03-10', 'Not A Robot', 'Canadian', 1, 'Clay', 'notarobot@gmail.com', 'IDontKnow'),
('General','Customer', '2000-01-01', 'Art Customer', 'Canadian', 2, 'Oil painting', 'customer@gmail.com', 'NOTPassw0rd'),
('Manager','User', '2000-02-02', 'Management', 'Canadian', 1, 'All', 'Manager@gmail.com', 'Passw0rd');

/*populate the orders table with records*/
INSERT INTO orders (artwork_id, user_id, order_creation_date,  amount) VALUES
(1, 2, '2023-03-12', 1000000),
(2, 1, '2024-03-12', 100),
(3, 3, '1993-09-09', 9);

CREATE OR REPLACE FUNCTION delete_artist_artwork()
RETURNS TRIGGER AS
$$
BEGIN
    DELETE FROM artwork WHERE artist_id = OLD.artist_id;
    DELETE FROM orders WHERE artwork_id IN (SELECT artwork_id FROM artwork WHERE artist_id = OLD.artist_id);
    RETURN OLD;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER delete_artist_artwork_trigger
BEFORE DELETE ON artist
FOR EACH ROW
EXECUTE FUNCTION delete_artist_artwork();

CREATE OR REPLACE FUNCTION delete_artwork_orders()
RETURNS TRIGGER AS
$$
BEGIN
    DELETE FROM orders WHERE artwork_id = OLD.artwork_id;
    RETURN OLD;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER delete_artwork_orders_trigger
BEFORE DELETE ON artwork
FOR EACH ROW
EXECUTE FUNCTION delete_artwork_orders();

SELECT * FROM artwork;
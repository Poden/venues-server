BEGIN;

TRUNCATE
venues
RESTART IDENTITY;

INSERT INTO venues (id, venue_name, zipcode, website)
VALUES
  (1,'House of Blues','75202','https://www.houseofblues.com/dallas'),
  (2,'The Bomb Factory','75226','https://www.thebombfactory.com/'),
  (3,'South Side Ballroom','75215','https://southsideballroomdallas.com/'),
  (4,'Dos Equis Pavilion','75210','https://www.dallaspavilion.org/');
   SELECT setval('venues_id_seq', (SELECT max(id) FROM venues));

  COMMIT;
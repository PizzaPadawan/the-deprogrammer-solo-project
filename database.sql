
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "playlist"(
	"id" SERIAL PRIMARY KEY,
	"spotify_id" VARCHAR(22) NOT NULL,
);

CREATE TABLE "masterlist"(
	"id" SERIAL PRIMARY KEY,
	"playlist_id" INT REFERENCES "playlist" NOT NULL,
	"track" VARCHAR(350) NOT NULL,
	"album" VARCHAR(350) NOT NULL,
	"artist" VARCHAR(350) NOT NULL,
	"recording_date" DATE,
	"is_played" BOOLEAN DEFAULT FALSE,
	"game_mode" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "toplist"(
	"id" SERIAL PRIMARY KEY,
	"masterlist_id" INT REFERENCES "masterlist" NOT NULL,
	"user_id" INT REFERENCES "user" NOT NULL,
	"hidden" BOOLEAN DEFAULT FALSE,
	"notes" VARCHAR(1000)
);
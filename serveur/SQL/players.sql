BEGIN;

CREATE DOMAIN emailformat AS TEXT
CHECK (VALUE ~ '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');

DROP TABLE IF EXISTS "player";

-- Création de la table 'player'
CREATE TABLE player (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,            
    username TEXT NOT NULL UNIQUE,      
    email TEXT NOT NULL UNIQUE,      
    password TEXT NOT NULL UNIQUE,   
    team TEXT[] DEFAULT ARRAY[]::TEXT[],            
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);


-- Création d'un index unique sur l'email pour s'assurer de son caractère unique
CREATE UNIQUE INDEX idx_player_email ON player(email);


CREATE TABLE ingredient (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  ingredient_type_id INTEGER NOT NULL,
  other_type VARCHAR(255),
  created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_time TIMESTAMP
);

CREATE TABLE ingredient_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  UNIQUE (name)
);

CREATE TABLE unit_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  UNIQUE (name)
);

CREATE TABLE units (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(255) NOT NULL,
  unit_type_id INTEGER REFERENCES unit_type(id),
  UNIQUE (name, abbreviation, unit_type_id)
);

CREATE TABLE cuisine (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_time TIMESTAMP
);

CREATE TYPE recipe_difficulty_type AS ENUM ('easy', 'medium', 'hard');

CREATE TABLE recipe (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cuisine_id INTEGER REFERENCES cuisine(id),
  description TEXT,
  instructions TEXT NOT NULL,
  prep_time INTEGER CHECK (prep_time >= 0), -- in minutes
  cook_time INTEGER CHECK (cook_time >= 0), -- in minutes
  servings INTEGER CHECK (servings > 0),
  difficulty recipe_difficulty_type NOT NULL DEFAULT 'easy' :: recipe_difficulty_type,
  image_url VARCHAR(255),
  dietary_restrictions VARCHAR(255),
  ai_model_used TEXT,
  created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_time TIMESTAMP,
  UNIQUE (name, cuisine_id)
);

CREATE TYPE recipe_ingredient_unit_type AS ENUM ('imperial', 'metric');

CREATE TABLE recipe_ingredient (
  recipe_id INTEGER NOT NULL REFERENCES recipe(id) ON DELETE CASCADE,
  ingredient_id INTEGER NOT NULL REFERENCES ingredient(id) ON DELETE CASCADE,
  quantity FLOAT NOT NULL,
  unit_id INTEGER REFERENCES units(id),
  notes TEXT,
  created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (recipe_id, ingredient_id, unit_id)
);
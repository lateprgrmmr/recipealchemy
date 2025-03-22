CREATE TYPE ingredient_type AS ENUM (
  'meat',
  'vegetable',
  'fruit',
  'dairy',
  'grain',
  'spice',
  'herb',
  'sauce',
  'other'
);

CREATE TABLE ingredient (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type ingredient_type NOT NULL DEFAULT 'other'::ingredient_type,
  other_type VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE cuisine (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE TABLE recipe (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  cuisine_id INTEGER REFERENCES cuisine(id),
  description TEXT,
  instructions TEXT NOT NULL,
  prep_time INTEGER CHECK (prep_time >= 0), -- in minutes
  cook_time INTEGER CHECK (cook_time >= 0), -- in minutes
  servings INTEGER CHECK (servings > 0),
  difficulty INTEGER NOT NULL CHECK (difficulty >= 1 AND difficulty <= 5),
  image_url VARCHAR(255),
  dietary_restrictions VARCHAR(255),
  is_ai_generated BOOLEAN DEFAULT FALSE,
  ai_model_used TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipe_ingredient (
  recipe_id INTEGER NOT NULL REFERENCES recipe(id) ON DELETE CASCADE,
  ingredient_id INTEGER NOT NULL REFERENCES ingredient(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  unit VARCHAR(50) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (recipe_id, ingredient_id)
);
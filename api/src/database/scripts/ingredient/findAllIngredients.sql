SELECT
    i.id,
    i.name,
    it.id AS ingredient_type_id,
    it.name AS ingredient_type,
    i.other_type
FROM ingredient AS i
JOIN ingredient_type AS it ON i.ingredient_type_id = it.id
ORDER BY i.name;
SELECT
    r.id,
    r.name,
    r.description,
    JSONB_AGG(
        JSONB_BUILD_OBJECT(
            'id', i.id,
            'name', i.name,
            'type', it.name,
            'quantity', ri.quantity,
            'unit', u.name,
            'other_type', i.other_type
        )
    ) AS ingredients,
    r.instructions, -- commenting for now to avoid long text in response
    r.prep_time,
    r.cook_time,
    r.servings,
    r.difficulty,
    r.image_url,
    r.created_time,
    r.updated_time,
    r.deleted_time
FROM
    recipe r
LEFT JOIN 
    recipe_ingredient ri ON r.id = ri.recipe_id
JOIN 
    ingredient i ON ri.ingredient_id = i.id
LEFT JOIN 
    ingredient_type it ON i.ingredient_type_id = it.id
LEFT JOIN
    units u ON ri.unit_id = u.id
WHERE
    r.deleted_time IS NULL
GROUP BY
    r.id
ORDER BY
    r.name ASC;
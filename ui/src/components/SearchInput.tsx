import { FormControl, Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCuisines } from "../actions/Cuisine.action";
import { fetchIngredients } from "../actions/Ingredients.action";
import { Cuisine, Ingredient } from "../shared/types";

const SearchInput = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [cuisines, setCuisines] = useState<Cuisine[]>([]);
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

    useEffect(() => {
        // Fetch ingredients and cuisines from the API
        const getData = async () => {
            const allIngredients = await fetchIngredients();
            if (allIngredients) {
                setIngredients(allIngredients);
            }
            const allCuisines = await fetchCuisines();
            if (allCuisines) {
                setCuisines(allCuisines);
            }
        }
        getData();
    }, []);

    const handleIngredientChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setSelectedIngredients(value);
    };

    const handleCuisineChange = (event: any) => {
        const {
            target: { value },
        } = event;
        setSelectedCuisines(value);
    };

    return (
        <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px', height: '100%', width: '100%' }}>
            <Grid container spacing={5} justifyContent="center">
                <FormControl>
                        <InputLabel id="cuisine-select-input-label">Select Cuisine</InputLabel>
                        <Select
                            labelId="cuisine-select-input"
                            id="demo-simple-select"
                            multiple
                            value={selectedCuisines}
                            onChange={handleCuisineChange}
                            label="Select"
                        >
                            {cuisines.map((cuisine) => (
                                <MenuItem key={cuisine.id} value={cuisine.name}>
                                    {cuisine.name}
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl>
                <FormControl>
                        <InputLabel id="ingredient-select-input-label">Select Ingredients</InputLabel>
                        <Select
                            labelId="ingredient-select-input"
                            id="demo-simple-select"
                            multiple
                            value={selectedIngredients}
                            onChange={handleIngredientChange}
                            label="Select"
                        >
                            {ingredients.map((ingredient) => (
                                <MenuItem key={ingredient.id} value={ingredient.name}>
                                    {ingredient.name}
                                </MenuItem>
                            ))}
                        </Select>
                </FormControl >
            </Grid>
        </Paper>
    );
}

export default SearchInput;
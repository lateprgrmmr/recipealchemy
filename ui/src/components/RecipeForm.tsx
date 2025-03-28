import type React from "react"
import { useState } from "react"
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    OutlinedInput,
    Typography,
    SelectChangeEvent,
    Checkbox,
    ListItemText,
    Grid,
    TextField,
    ListSubheader,
    Dialog,
    Button,
    // ListSubheader,
} from "@mui/material"
import { Cuisine, Ingredient, IngredientType } from "../shared/types"

interface FormProps {
    cuisines: Cuisine[];
    ingredientTypes: IngredientType[];
    allIngredients: Ingredient[];
    isDialogOpen: boolean;
    onClose: () => void;
}

const RecipeForm = (props: FormProps) => {
    const { cuisines, ingredientTypes, allIngredients, isDialogOpen, onClose } = props
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
    const [selectedIngredientTypes, setSelectedIngredientTypes] = useState<string[]>([])
    const [recipeName, setRecipeName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")

    const handleChange = <T,>(
        event: SelectChangeEvent<T[]>,
        setter: React.Dispatch<React.SetStateAction<T[]>>,
    ) => {
        const value = event.target.value as T[]
        setter(value)
    }

    const getSelectionJson = () => {
        return JSON.stringify(
            {
                recipeName,
                description,
                instructions,
                cuisines: selectedCuisines,
                ingredientTypes: selectedIngredientTypes,
                ingredients: selectedIngredients,
            },
            null,
            2,
        )
    }

    const getGroupedIngredients = () => {
        const grouped: Record<number, {
            typeId: number,
            typeName: string,
            ingredients: Ingredient[]
        }> = {};

        // Initialize groups
        ingredientTypes.forEach(type => {
            grouped[type.id] = {
                typeId: type.id,
                typeName: type.name,
                ingredients: []
            };
        });
        
        // Group ingredients by type
        allIngredients.forEach(ingredient => {
            if (grouped[ingredient.ingredient_type_id]) {
                grouped[ingredient.ingredient_type_id].ingredients.push(ingredient);
            }
        });
        console.log('Grouped:', grouped);

        return Object.values(grouped).filter(group => group.ingredients.length > 0);
    };

    const handleCloseDialog = () => {
        setRecipeName("")
        setDescription("")
        setInstructions("")
        setSelectedCuisines([])
        setSelectedIngredientTypes([])
        setSelectedIngredients([])
        onClose()
    }
    // Log the grouped ingredients for debugging

    const groupedIngredients = getGroupedIngredients();
    console.log('Grouped Ingredients:', groupedIngredients);

    return (
        <Dialog
            open={isDialogOpen}
            fullWidth maxWidth="md"
            onClose={handleCloseDialog}
            scroll="body"
        >
            <Grid id="fuckall" sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Recipe Details
                </Typography>
                <form>
                    <Grid>
                        <Grid container xs={12} sm={12} spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Recipe Name"
                                    value={recipeName}
                                    onChange={(e) => setRecipeName(e.target.value)}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    margin="normal"
                                    multiline
                                    rows={3}
                                />
                                <TextField
                                    fullWidth
                                    label="Instructions"
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    margin="normal"
                                    multiline
                                    rows={5}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="cuisines-label">Cuisines</InputLabel>
                                    <Select
                                        labelId="cuisines-label"
                                        multiple
                                        value={selectedCuisines}
                                        onChange={(e) => handleChange<string>(e, setSelectedCuisines)}
                                        input={<OutlinedInput label="Cuisines" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                {(selected).map((cuisine) => (
                                                    <Chip key={cuisine} label={cuisine} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {cuisines.map((cuisine) => (
                                            <MenuItem key={cuisine.id} value={cuisine.name}>
                                                <Checkbox checked={selectedCuisines.includes(cuisine.name)} />
                                                <ListItemText primary={cuisine.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="ingredient-types-label">Ingredient Types</InputLabel>
                                    <Select
                                        labelId="ingredient-types-label"
                                        multiple
                                        value={selectedIngredientTypes}
                                        onChange={(e) => handleChange<string>(e, setSelectedIngredientTypes)}
                                        input={<OutlinedInput label="Ingredient Types" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {ingredientTypes?.length > 0 ? (
                                            ingredientTypes.map((type) => (
                                                <MenuItem key={type.id} value={type.name}>
                                                    <Checkbox checked={selectedIngredientTypes.includes(type.name)} />
                                                    <ListItemText primary={type.name} />
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No options</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>


                                <FormControl fullWidth margin="normal">
                                    <InputLabel id="ingredients-label">Ingredients</InputLabel>
                                    <Select
                                        labelId="ingredients-label"
                                        multiple
                                        value={selectedIngredients}
                                        onChange={(e) => handleChange<string>(e, setSelectedIngredients)}
                                        input={<OutlinedInput label="Ingredients" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                                {(selected).map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                    >
                                        {selectedIngredientTypes.length === 0 ? (
                                            allIngredients.map((ingredient) => (
                                                <MenuItem key={ingredient.id} value={ingredient.name}>
                                                    <Checkbox checked={selectedIngredients.includes(ingredient.name)} />
                                                    <ListItemText primary={ingredient.name} />
                                                </MenuItem>
                                            ))) : (
                                            allIngredients
                                                .filter(ingredient => selectedIngredientTypes.includes(ingredient.ingredient_type))
                                                .map((ingredient) => [
                                                    <ListSubheader key={ingredient.ingredient_type_id}>{ingredient.ingredient_type}</ListSubheader>,
                                                    <MenuItem key={ingredient.id} value={ingredient.name}>
                                                        <Checkbox checked={selectedIngredients.includes(ingredient.name)} />
                                                        <ListItemText primary={ingredient.name} />
                                                    </MenuItem>
                                                ])
                                        )}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth margin="normal" style={{ height: "50px" }}>
                                    <Button
                                        title="Add Recipe"
                                        variant="contained"
                                        color="primary"
                                        style={{ height: "50%" }}
                                        onClick={() => {
                                            console.log(getSelectionJson())
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="normal" style={{ height: "50px" }}>
                                    <Button
                                        title="Use AI to Generate Recipe"
                                        variant="contained"
                                        color="primary"
                                        style={{ height: "50%" }}
                                        onClick={handleCloseDialog}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

                <Grid sx={{ marginTop: 3, padding: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Selection JSON:
                    </Typography>
                    <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{getSelectionJson()}</pre>
                </Grid>
            </Grid >
        </Dialog>
    )
}

export default RecipeForm;
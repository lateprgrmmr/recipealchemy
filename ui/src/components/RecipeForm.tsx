import { useState } from "react"
import {
    FormControl,
    Typography,
    Checkbox,
    Grid,
    TextField,
    Dialog,
    Button,
    Autocomplete,
} from "@mui/material"
import { Cuisine, Ingredient, IngredientType } from "../shared/types"
import { IngredientTypeDisplayLookup, IngredientTypeEnum } from "../shared/utils";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import NewIngredientDialog from "./NewIngredient.dialog";


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
    const [selectedIngredientTypes, setSelectedIngredientTypes] = useState<IngredientTypeEnum[]>([])
    const [recipeName, setRecipeName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [isNewIngredientDialogOpen, setIsNewIngredientDialogOpen] = useState(false)

    const handleOpenNewIngredientDialog = () => {
        setIsNewIngredientDialogOpen(true)
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
            typeName: IngredientTypeEnum,
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
            <Grid container id="details-container" sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Recipe Details
                </Typography>
                <form>
                    <Grid spacing={2}>
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
                        <Grid >
                            <FormControl fullWidth margin="normal">
                                <Autocomplete
                                    multiple
                                    id="cuisines-autocomplete"
                                    options={cuisines}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option, { selected }) => {
                                        const { key, ...optionProps } = props;
                                        return (
                                            <li {...optionProps} key={key}>
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon />}
                                                    checkedIcon={<CheckBoxIcon />}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.name}
                                            </li>
                                        );

                                    }}
                                    style={{ width: "100%", marginTop: "10px" }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Cuisines" placeholder="Select Cuisines" />
                                    )}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Autocomplete
                                    multiple
                                    id="ingredient-types-autocomplete"
                                    options={ingredientTypes}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => IngredientTypeDisplayLookup[option.name]}
                                    renderOption={(props, option, { }) => {
                                        const { key, ...optionProps } = props;
                                        return (
                                            <li {...optionProps} key={key}>
                                                <Checkbox checked={selectedIngredientTypes.includes(option.name)} />
                                                {IngredientTypeDisplayLookup[option.name]}
                                            </li>
                                        );

                                    }}
                                    style={{ width: "100%", marginTop: "10px" }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Ingredient Types" placeholder="Select Ingredient Types" />
                                    )}
                                    onChange={(_, value) => {
                                        const selectedTypes = value.map((type) => type.name as IngredientTypeEnum);
                                        setSelectedIngredientTypes(selectedTypes);
                                    }}
                                />
                            </FormControl>

                            <FormControl fullWidth margin="normal">
                                <Autocomplete
                                    multiple
                                    id="ingredients-autocomplete"
                                    options={allIngredients}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option, { selected }) => {
                                        const { key, ...optionProps } = props;
                                        return (
                                            <li {...optionProps} key={key}>
                                                <Checkbox
                                                    icon={<CheckBoxOutlineBlankIcon />}
                                                    checkedIcon={<CheckBoxIcon />}
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.name}
                                            </li>
                                        );

                                    }}
                                    style={{ width: "100%", marginTop: "10px" }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Ingredients" placeholder="Select Ingredients" />
                                    )}
                                />

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    style={{ marginTop: "10px", width: "100%" }}
                                    onClick={handleOpenNewIngredientDialog}
                                >
                                    Need to add a missing ingredient?
                                </Button>

                            </FormControl>
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
                        <Grid style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            <FormControl fullWidth margin="normal" style={{ height: "150px" }}>
                                <Button
                                    title="Add Recipe"
                                    variant="contained"
                                    color="primary"
                                    style={{ height: "50%" }}
                                    onClick={() => {
                                        console.log(getSelectionJson())
                                    }}
                                >
                                    Add Recipe
                                </Button>
                            </FormControl>
                            <FormControl fullWidth margin="normal" style={{ height: "150px" }}>
                                <Button
                                    title="Use AI to Generate Recipe"
                                    variant="contained"
                                    color="primary"
                                    style={{ height: "50%" }}
                                    onClick={handleCloseDialog}
                                >
                                    Use AI to Generate Recipe
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>

                <Grid container justifyContent={"center"} alignItems="flex-end" sx={{ marginTop: 3, padding: 2 }}>
                    <Grid size={12} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Selection JSON:
                        </Typography>
                        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{getSelectionJson()}</pre>
                    </Grid>
                    <Grid size={12} sx={{ padding: 2 }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCloseDialog}
                            sx={{ alignSelf: "flex-end" }}
                        >
                            Bail
                        </Button>
                    </Grid>
                </Grid>
            </Grid >
            <NewIngredientDialog
                isOpen={isNewIngredientDialogOpen}
                onClose={() => setIsNewIngredientDialogOpen(false)}
            />
        </Dialog>
    )
}

export default RecipeForm;
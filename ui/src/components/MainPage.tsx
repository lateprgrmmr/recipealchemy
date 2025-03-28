import { makeStyles } from "@mui/styles";
// import Header from "./Header";
import { Button, Grid } from "@mui/material";
import RecipeTable from "./RecipeTable";
import { useEffect, useState } from "react";
import { Cuisine, Ingredient, IngredientType } from "../shared/types";
import RecipeForm from "./RecipeForm";
import { fetchIngredients, fetchIngredientTypes } from "../actions/Ingredients.action";
import { fetchCuisines } from "../actions/Cuisine.action";
import Header from "./Header";

const useStyles = makeStyles(({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    mainWrapper: {
        width: '100%',
        display: 'block',
    }
}), { name: 'MainRouter' });

const MainRouter = () => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [ingredientTypes, setIngredientTypes] = useState<IngredientType[]>([]);
    const [cuisines, setCuisines] = useState<Cuisine[]>([]);
    const [addRecipeDialogOpen, setAddRecipeDialogOpen] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            const ingredientResp = await fetchIngredients();
            const ingredientTypeResp = await fetchIngredientTypes();
            const cuisineResp = await fetchCuisines();
            if (!ingredientResp) {
                setIngredients([]);
            }
            if (!ingredientTypeResp) {
                setIngredientTypes([]);
            }
            if (!cuisineResp) {
                setCuisines([]);
            }
            setIngredients(ingredientResp);
            setIngredientTypes(ingredientTypeResp);
            setCuisines(cuisineResp);
        }
        getData();
    }, []);

    return (
        <Grid container className={`${classes.root}, ${classes.mainWrapper}`}>
            <Header />
            <Button
                variant="contained"
                color="primary"
                onClick={() => setAddRecipeDialogOpen(true)}
                style={{ margin: '16px' }}
                >
                Add Recipe
            </Button>
            <Grid className="fix-me-daddy">
                <RecipeForm
                    cuisines={cuisines}
                    ingredientTypes={ingredientTypes}
                    allIngredients={ingredients}
                    isDialogOpen={addRecipeDialogOpen}
                    onClose={() => setAddRecipeDialogOpen(false)}
                />
            </Grid>
            <Grid className="">
                <RecipeTable />
            </Grid>
        </Grid>
    );
}

export default MainRouter;
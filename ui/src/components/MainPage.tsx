import { makeStyles } from "@mui/styles";
import Header from "./Header";
import { Grid2, Paper } from "@mui/material";
import RecipeTable from "./RecipeTable";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../actions/Recipe.action";
import { TableData } from "../shared/types";

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
    const [data, setData] = useState<TableData[]>([]);
    const classes = useStyles();

    useEffect(() => {
        const getData = async () => {
            const response = await fetchRecipes();
            console.log('response', response);
            if (!response) {
                setData([]);
            }
            setData(data);
        }
        getData();
    }, [data]);

    console.log('Data:', data);
    return (
        <Paper className={classes.root}>
            <Grid2 container className={classes.mainWrapper}>
                <Header />
                <Grid2 className="">
                    <RecipeTable />
                </Grid2>
            </Grid2>
        </Paper>
    );
}

export default MainRouter;
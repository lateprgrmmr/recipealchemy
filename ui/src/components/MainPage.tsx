import { makeStyles } from "@mui/styles";
import Header from "./Header";
import { Grid2, Paper } from "@mui/material";
import RecipeTable, { dummyData } from "./RecipeTable";

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
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Grid2 container className={classes.mainWrapper}>
                <Header />
                <Grid2 className="">
                    <RecipeTable data={dummyData} />
                </Grid2>
            </Grid2>
        </Paper>
    );
}

export default MainRouter;
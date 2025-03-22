import { makeStyles } from "@mui/styles";
import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import ErrorPage from "./ErrorPage";
import Header from "./Header";
import SearchInput from "./SearchInput";

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
        <div>
            <Header />
            <div className={classes.root}>
                <div className={classes.mainWrapper}>
                    <SearchInput />
                </div>
            </div>
        </div>
    );
}

export default MainRouter;
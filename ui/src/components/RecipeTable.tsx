import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { DataGrid, getGridStringOperators, GridColDef } from "@mui/x-data-grid";
import { Recipe, RecipeIngredientUx } from "../shared/types";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../actions/Recipe.action";

const RecipeTable = () => {
    const [data, setData] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const response = await fetchRecipes();
            if (response) {
                setData(response);
            } else {
                setData([]);
            }
            setLoading(false);
        };
        getData();
    }, []);

    const recipeColumnDef: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 100,
            sortable: true,
        },
        {
            field: "name",
            headerName: "Recipe Name",
            width: 200,
            sortable: true,
            filterOperators: getGridStringOperators()
        },
        {
            field: "description",
            headerName: "Description",
            width: 300,
            sortable: true,
            filterOperators: getGridStringOperators()
        },
        {
            field: "instructions",
            headerName: "Instructions",
            width: 300,
            sortable: true,
            filterOperators: getGridStringOperators()
        },
        {
            field: "ingredients",
            headerName: "Ingredients",
            width: 300,
            sortable: true,
            filterOperators: getGridStringOperators(),
            renderCell: (params) => params.row.ingredients.map(
                (ing: RecipeIngredientUx) => `${ing.name} - ${ing.quantity} ${ing.unit}`).join(', '),
        },
        {
            field: 'image_url',
            headerName: 'Image',
            width: 200,
            sortable: true,
            renderCell: (params) => params.row.image_url ? <img src={params.row.image_url} alt="Recipe" style={{ width: '100%' }} /> : null
        }
    ]
// https://www.recipetineats.com/tachyon/2018/07/Spaghetti-Bolognese.jpg?resize=900%2C1260&zoom=1
    console.log('Data:', data);
    return (
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
                <Typography variant="h6" sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    Recipe List
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    {loading
                        ? <CircularProgress />
                        : <DataGrid
                            rows={data}
                            columns={recipeColumnDef}
                            filterModel={{
                                items: [{ field: 'name', operator: 'contains', value: '' }],
                            }}
                            disableColumnFilter={false} // Disabling column filter
                            // pageSize={5}  // Pagination - Set number of rows per page
                            checkboxSelection
                            sx={{ height: 400, width: '100%' }} // Ensuring grid takes full width and height
                        />}
                </div>
            </Card>
        </Box>
    );
}
export default RecipeTable;  // Exporting the Table component as default
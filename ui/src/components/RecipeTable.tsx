import { Box, Card, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Recipe } from "../shared/types";
import { useEffect, useState } from "react";
import { fetchRecipes } from "../actions/Recipe.action";

// interface RecipeTableProps {
//     data: TableData[];
// }

const RecipeTable = () => {
    const [data, setData] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const response = await fetchRecipes();
            console.log('response', response);
            if (response) {
                setData(response);
            } else {
                setData([]);
            }
            setLoading(false);
        };
        getData();
    }, []);

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
                            columns={[
                                { field: "id", headerName: "ID", width: 100, sortable: true },
                                { field: "recipeName", headerName: "Recipe Name", width: 200, sortable: true },
                                { field: "instructions", headerName: "Description", width: 300, sortable: true },
                                { field: "ingredients", headerName: "Servings", width: 300, sortable: true },
                            ]}
                            filterModel={{
                                items: [{ field: 'recipeName', operator: 'contains' }],
                            }}
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
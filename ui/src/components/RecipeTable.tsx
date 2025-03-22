import { Box, Card, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TableData } from "../shared/types";

export const dummyData: TableData[] = [
    {
        id: 1,
        recipeName: "Spaghetti Bolognese",
        ingredients: "Spaghetti, minced meat, tomato sauce",
        instructions: "Cook spaghetti, fry meat, add sauce",
    },
    {
        id: 2,
        recipeName: "Chicken Curry",
        ingredients: "Chicken, curry powder, coconut milk",
        instructions: "Fry chicken, add curry, add coconut milk",
    },
];

interface RecipeTableProps {
    data: TableData[];
}

const RecipeTable = (props: RecipeTableProps) => {
    const { data } = props;
    return (
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', overflow: 'hidden', boxShadow: 3 }}>
                <Typography variant="h6" sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                    Recipe List
                </Typography>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={[
                            { field: "recipeName", headerName: "Recipe Name", width: 200, sortable: true },
                            { field: "ingredients", headerName: "Ingredients", width: 300, sortable: true },
                            { field: "instructions", headerName: "Instructions", width: 300, sortable: true },
                        ]}
                        filterModel={{
                            items: [{ field: 'recipeName', operator: 'contains', value: '' }],
                        }}
                        // pageSize={5}  // Pagination - Set number of rows per page
                        checkboxSelection
                        sx={{ height: 400, width: '100%' }} // Ensuring grid takes full width and height
                    />
                </div>
            </Card>
        </Box>
    );
}
export default RecipeTable;  // Exporting the Table component as default
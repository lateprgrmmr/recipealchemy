import { Dialog } from "@mui/material";

interface NewIngredientDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewIngredientDialog = (props: NewIngredientDialogProps) => {
    const { isOpen, onClose } = props;
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <h2>New Ingredient</h2>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Quantity:
                    <input type="number" name="quantity" />
                </label>
                <button type="submit">Add Ingredient</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Dialog>
    );
}
export default NewIngredientDialog;
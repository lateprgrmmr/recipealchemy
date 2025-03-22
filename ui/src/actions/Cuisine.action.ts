import { getFromApi } from ".";
import { Cuisine } from "../shared/types";

export const fetchCuisines = async () => {
    try {
        console.log('Fetching cuisines...');
        const cuisines = await getFromApi<Cuisine[]>('http://localhost:5001/cuisines');
        if (!cuisines) {
            console.log('No cuisines found');
            throw new Error('Network response was not ok');
        }
        return cuisines;
    } catch (error) {
        return [];
    }
};
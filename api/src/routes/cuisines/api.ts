
export const getCuisines = async (db: any) => {
    return await db.cuisine.find();
}
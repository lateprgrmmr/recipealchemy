import * as t from 'io-ts';

export enum IngredientTypeEnum {
    beef = 'beef',
    dairy = 'dairy',
    fruit = 'fruit',
    grain = 'grain',
    herb = 'herb',
    meat_alternative = 'meat_alternative',
    oils_fats = 'oils_fats',
    other = 'other',
    sauce_condiment = 'sauce_condiment',
    other_protein = 'other_protein',
    pork = 'pork',
    poultry = 'poultry',
    seafood = 'seafood',
    spice = 'spice',
    sweetener = 'sweetener',
    vegetable = 'vegetable',
}

// const IngredientTypeDefinition = t.union([
//     t.literal(IngredientTypeEnum.beef),
//     t.literal(IngredientTypeEnum.dairy),
//     t.literal(IngredientTypeEnum.fruit),
//     t.literal(IngredientTypeEnum.grain),
//     t.literal(IngredientTypeEnum.herb),
//     t.literal(IngredientTypeEnum.meat_alternative),
//     t.literal(IngredientTypeEnum.oils_fats),
//     t.literal(IngredientTypeEnum.other),
//     t.literal(IngredientTypeEnum.sauce_condiment),
//     t.literal(IngredientTypeEnum.other_protein),
//     t.literal(IngredientTypeEnum.pork),
//     t.literal(IngredientTypeEnum.poultry),
//     t.literal(IngredientTypeEnum.seafood),
//     t.literal(IngredientTypeEnum.spice),
//     t.literal(IngredientTypeEnum.sweetener),
//     t.literal(IngredientTypeEnum.vegetable)
// ])

export const IngredientTypeDisplayLookup = {
    [IngredientTypeEnum.beef]: 'Beef',
    [IngredientTypeEnum.dairy]: 'Dairy',
    [IngredientTypeEnum.fruit]: 'Fruit',
    [IngredientTypeEnum.grain]: 'Grain',
    [IngredientTypeEnum.herb]: 'Herb',
    [IngredientTypeEnum.meat_alternative]: 'Meat Alternative',
    [IngredientTypeEnum.oils_fats]: 'Oils & Fats',
    [IngredientTypeEnum.other]: 'Other',
    [IngredientTypeEnum.sauce_condiment]: 'Sauce / Condiment',
    [IngredientTypeEnum.other_protein]: 'Other Protein',
    [IngredientTypeEnum.pork]: 'Pork',
    [IngredientTypeEnum.poultry]: 'Poultry',
    [IngredientTypeEnum.seafood]: 'Seafood',
    [IngredientTypeEnum.spice]: 'Spice',
    [IngredientTypeEnum.sweetener]: 'Sweetener',
    [IngredientTypeEnum.vegetable]: 'Vegetable'
}
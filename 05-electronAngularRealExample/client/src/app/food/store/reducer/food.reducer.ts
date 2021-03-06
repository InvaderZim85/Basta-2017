import { Action } from '@ngrx/store';

import { FoodItem } from '../../../shared/models/foodItem.model';
import * as FoodActions from '../actions/food.actions';

export interface FoodState {
    foodItems: FoodItem[],
    selectedItem: FoodItem
};

export const initialState: FoodState = {
    foodItems: [],
    selectedItem: new FoodItem()
};

export function foodItemsReducer(state = initialState, action: Action): FoodState {
    switch (action.type) {

        case FoodActions.ADD_FOOD_SUCCESS:
            const addFoodAction = <FoodActions.AddFoodSuccessAction>action;
            const lowerCaseObject = <FoodItem>keysToLowerCase(addFoodAction.foodItem);
            const itemAlreadyExists = state.foodItems.find(item => item.id === lowerCaseObject.id);

            return {
                ...state,
                foodItems: itemAlreadyExists ? state.foodItems : state.foodItems.concat(addFoodAction.foodItem)
            };

        case FoodActions.DELETE_FOOD_SUCCESS:
            const deleteFoodAction = <FoodActions.DeleteFoodSuccessAction>action;
            return {
                ...state,
                foodItems: state.foodItems.filter(item => item.id !== deleteFoodAction.foodItem.id)
            };

        case FoodActions.UPDATE_FOOD_SUCCESS:
            const updateFoodAction = <FoodActions.UpdateFoodSuccessAction>action;
            return {
                ...state,
                foodItems: state.foodItems.map((item: FoodItem) => {
                    return item.id === updateFoodAction.foodItem.id ? Object.assign({}, item, updateFoodAction.foodItem) : item;
                }),
                selectedItem: new FoodItem()
            };

        case FoodActions.LOAD_FOOD_SUCCESS:
            const loadFoodAction = <FoodActions.LoadFoodSuccessAction>action;
            return {
                ...state,
                foodItems: loadFoodAction.foodItems,
                selectedItem: new FoodItem()
            };

        case FoodActions.SELECT_FOOD_SUCCESS:
            const selectFoodAction = <FoodActions.SelectFoodSuccessAction>action;
            return {
                ...state,
                foodItems: state.foodItems,
                selectedItem: selectFoodAction.foodItem
            };

        default:
            return state;

    }
}

function keysToLowerCase(obj) {
    Object.keys(obj).forEach(function (key) {
        let k = key.toLowerCase();

        if (k !== key) {
            obj[k] = obj[key];
            delete obj[key];
        }
    });
    return (obj);
}

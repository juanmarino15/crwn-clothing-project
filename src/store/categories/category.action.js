import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = (categoriesArray) =>
	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSucess = (categoriesArray) =>
	createAction(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray
	);

export const fetchCategoriesFailed = (error) =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

//thunk
export const fetchCategoriesAsync = () => async (dispatch) => {
	dispatch(fetchCategoriesStart());

	try {
		const categoriesArray = await getCategoriesAndDocuments("categories");
		dispatch(fetchCategoriesSucess(categoriesArray)); //if successful start
	} catch (error) {
		dispatch(fetchCategoriesFailed(error));
	}
};

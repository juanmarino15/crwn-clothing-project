//this files will always hsot the logic to format the data coming from the firebase api
import { createSelector } from "reselect"; //to memoize results

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
	[selectCategoryReducer], //input selector
	(categoriesSlice) => categoriesSlice.categories
);

//memoized selector
export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) =>
		categories.reduce((acc, category) => {
			const { title, items } = category; //take off the title and items from the data
			acc[title.toLowerCase()] = items;
			return acc;
		}, {})
); //initial instance of object we want to create

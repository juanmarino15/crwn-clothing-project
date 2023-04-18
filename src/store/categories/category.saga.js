import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
	fetchCategoriesSucess,
	fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
	try {
		const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
		yield put(fetchCategoriesSucess(categoriesArray));
	} catch (error) {
		yield put(fetchCategoriesFailed(error));
	}
}

//generatore function
export function* onFetchCategories() {
	yield takeLatest(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
		fetchCategoriesAsync
	); //only yield the latest if you hear the same thing running
}

export function* categoriesSaga() {
	yield all([
		//run everything inside and only completes when everything is done
		call(onFetchCategories),
	]);
}

import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category.component";
import { useEffect } from "react";
import { fetchCategoriesAsync } from "../../store/categories/category.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { useDispatch } from "react-redux";

import "./shops.styles.scss";

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoriesAsync());
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />}></Route>
			<Route path=":category" element={<Category />}></Route>
		</Routes>
	);
};

export default Shop;

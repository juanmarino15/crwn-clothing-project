import "./category.styles.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { Fragment } from "react";

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]); //use effect will happen when category and categories map changes

	return (
		<Fragment>
			<h2 className="category-title">{category.toUpperCase()}</h2>
			<div className="category-container">
				{/* this is a safeguard, because products is async, we need to only display once products has fetched */}
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</Fragment>
	);
};

export default Category;
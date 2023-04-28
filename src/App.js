import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { Fragment, Suspense, useEffect } from "react";
import {
	getCurrentUser,
	onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import { GlobalStyle } from "./global.styles";
import Spinner from "./components/spinner/spinner.component";

const App = () => {
	const dispatch = useDispatch(); //to dispatch the action to all components needing it

	useEffect(() => {
		dispatch(checkUserSession());

		// const unsuscribe = onAuthStateChangedListener((user) => {
		// 	//if there is a user coming through
		// 	if (user) {
		// 		createUserDocumentFromAuth(user);
		// 	}
		// 	dispatch(setCurrentUser(user)); //setting  user state
		// });
		// return unsuscribe;
	}, []); //empty so only runs once(when mounting)

	return (
		<Suspense fallback={<Spinner />}>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<Navigation />}>
					<Route index element={<Home />} />
					{/* matching all routes to shop. whatever is after / it wont matter, will get routed to shop component, then re routed to where it needs to go */}
					<Route path="shop/*" element={<Shop />} />
					<Route path="auth" element={<Authentication />} />
					<Route path="checkout" element={<Checkout />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;

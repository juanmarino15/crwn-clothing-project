import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				{/* matching all routes to shop. whatever is after / it wont matter, will get routed to shop component, then re routed to where it needs to go */}
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;

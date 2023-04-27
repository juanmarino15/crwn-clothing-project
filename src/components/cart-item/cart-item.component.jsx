import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import { memo } from "react";

//memo avoid re rendering the component if an item was already included in the cart

const CartItem = memo(({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<span>{name}</span>
				<span>
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
});

export default CartItem;

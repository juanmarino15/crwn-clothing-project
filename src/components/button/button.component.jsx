import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
};

//children are h1, spans or anything we render inside the button
const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;

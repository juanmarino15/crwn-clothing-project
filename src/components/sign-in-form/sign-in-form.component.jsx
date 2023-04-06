import { useContext, useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { UserContext } from "../../context/user.context";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields); //keeping track of the states of the form
	const { email, password } = formFields; //destructuring

	// const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const signInWithGoogle = async () => {
		const { user } = await signInWithGooglePopup();
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const user = await signInAuthUserWithEmailAndPassword(email, password);
			// setCurrentUser(user); //passing the signed in user to be able to access the app
			resetFormFields();
		} catch (e) {
			//to switch between error codes
			switch (e.code) {
				case "auth/wrong-password":
					alert("incorrect password for email");
					break;
				case "auth/user-not-found":
					alert("no user associated with this email");
					break;
				default:
					console.log(e.message);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target; //binding the name of the input field to the state object

		setFormFields({ ...formFields, [name]: value });
	};

	//name is the bind from the input box to the defaultFormsField object. Value is the actual value that the object now contains
	return (
		<div className="sign-in-container">
			<h2>Already have an account?</h2>
			<span>Sign up your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>

				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogle}
					>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;

import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields); //keeping track of the states of the form
	const { displayName, email, password, confirmPassword } = formFields; //destructuring

	// const { setCurrentUser } = useContext(UserContext);

	console.log(formFields);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("passwords do not match");
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			// setCurrentUser(user);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (e) {
			if (e.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log("user creation ecountered an error" + e.message);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target; //binding the name of the input field to the state object

		setFormFields({ ...formFields, [name]: value });
	};

	//name is the bind from the input box to the defaultFormsField object. Value is the actual value that the object now contains
	return (
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
			<span>Sign up your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>

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

				<FormInput
					label="Confirm Password"
					type="password"
					required
					onChange={handleChange}
					name="confirmPassword"
					value={confirmPassword}
				/>

				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;

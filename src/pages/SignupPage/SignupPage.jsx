import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
	const [firstName, setFirstName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();

	const handleFirstName = (e) => setFirstName(e.target.value);
	const handleUsername = (e) => setUsername(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newUser = { firstName, username, password };

		axios
			.post(`${process.env.REACT_APP_API_URL}/auth/signup`, newUser)
			.then((response) => {
				navigate("/login");
			})
			.catch((err) => {
				console.log(err);
				setErrorMessage(err.response.data.errorMessage);
			});
	};

	return (
		<div className="cont">
			<h2 className="text-2xl font-bold">SignUp</h2>
			<div className="SignupPage">
				<form onSubmit={handleSubmit}>
					<label htmlFor="username">
						FirstName
						<input
							type="text"
							name="username"
							value={firstName}
							onChange={handleFirstName}
						/>
					</label>

					<label htmlFor="username">
						Username
						<input
							type="text"
							name="username"
							value={username}
							onChange={handleUsername}
						/>
					</label>

					<label htmlFor="Password">
						Password
						<input
							type="password"
							name="password"
							value={password}
							onChange={handlePassword}
						/>
					</label>

					<button>Sign Up</button>
				</form>

				{errorMessage && <p>{errorMessage}</p>}
				<p>Already have an account?</p>
				<Link to="/login">Login</Link>
			</div>
		</div>
	);
}

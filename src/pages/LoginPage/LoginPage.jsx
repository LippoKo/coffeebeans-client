import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();
	const { storeToken, authenticateUser } = useContext(AuthContext);

	const handleUsername = (e) => setUsername(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		const newUser = { username, password };

		axios
			.post(`${process.env.REACT_APP_API_URL}/auth/login`, newUser)
			.then((response) => {
				storeToken(response.data.authToken);
				authenticateUser();
				navigate("/");
			})
			.catch((err) => {
				setErrorMessage(err.response.data.errorMessage);
			});
	};

	return (
		<div className="LoginPage">
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
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

				<button type="submit">Login</button>
			</form>

			{errorMessage && <p>{errorMessage}</p>}
			<p>Don't have an account?</p>
			<Link to="/login">Login</Link>
		</div>
	);
}

export default LoginPage;

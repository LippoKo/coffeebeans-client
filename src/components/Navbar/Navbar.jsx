import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function Navbar() {
	const { loggedIn, user, logout } = useContext(AuthContext);

	return (
		<div className="Navbar">
			
			<Link to="/">
				<button>Home</button>
			</Link>

			{loggedIn && (
				<>
					<Link to="/profile">
						<button>Profile</button>
					</Link>
				</>
			)}

			{loggedIn && (
				<>
					<Link to="/beanslist">
						<button>BeansList</button>
					</Link>
					<Link to="/shoplist">
						<button>ShopList</button>
					</Link>
				</>
			)}

			{!loggedIn && (
				<>
					<Link to="/signup">
						<button>Signup</button>
					</Link>

					<Link to="/login">
						<button>Login</button>
					</Link>
				</>
			)}

			{loggedIn && (
				<>
					<button onClick={logout}>Logout</button>
				</>
			)}
		</div>
	);
}

export default Navbar;

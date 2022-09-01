import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";

function Navbar() {
	const { loggedIn, user, logout } = useContext(AuthContext);

	return (
		<>
			<div className="Nav navbar bg-indigo-700">
				<div className="navbar-start">
					{loggedIn && (
						<>
							<div className="dropdown">
								<label tabIndex="0" className="btn btn-ghost btn-circle">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-8 w-8"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="4"
											d="M4 6h16M4 12h16M4 18h7"
										/>
									</svg>
								</label>
								<ul
									tabIndex="0"
									className="menu menu-compact dropdown-content mt-3 shadow bg-base-100 rounded-box w-52"
								>
									<button className="btn btn-ghost normal-case text-sm">
										<Link to="/beanslist">CoffeeBeans</Link>
									</button>
									<button className="btn btn-ghost normal-case text-sm">
										<Link to="/shoplist">CoffeeShop</Link>
									</button>
									<button className="btn btn-ghost normal-case text-sm">
										<Link to="/addbeans">+ Add Beans</Link>
									</button>
									<button className="btn btn-ghost normal-case text-sm">
										<Link to="/addshop">+ Add Shop</Link>
									</button>
								</ul>
							</div>
						</>
					)}
				</div>
				<div className="navbar-center">
					<Link to="/">
						<button className="btn btn-ghost normal-case text-xl">
							CoffeeBeans Track
						</button>
					</Link>
				</div>
				{loggedIn && (
					<>
						<div className="navbar-end">
							<div className="dropdown dropdown-end">
								<label tabIndex="0" className="btn btn-ghost btn-circle avatar">
									<div className="w-8 rounded-full">
										<img src="https://placeimg.com/80/80/people" alt="..." />
									</div>
								</label>
								<ul
									tabIndex="0"
									className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
								>
									<li>
										<button className="btn btn-ghost normal-case text-sm">
											<Link to="/profile">Profile</Link>
										</button>
									</li>

									<li>
										<button
											className="btn btn-ghost normal-case text-sm"
											onClick={logout}
										>
											Logout
										</button>
									</li>
								</ul>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default Navbar;

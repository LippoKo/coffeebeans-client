import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function HomePage() {
	const [randomImage, setRandomImage] = useState("");

	const { loggedIn } = useContext(AuthContext);

	const getImages = async () => {
		try {
			let response = await axios.get(
				"https://api.unsplash.com/search/photos/?per_page=10&query=coffee",
				{
					headers: {
						Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
					},
				}
			);

			//console.log(response.data);
			setRandomImage(
				response.data.results[Math.floor(Math.random() * 10)].urls.raw
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getImages();
	}, []);

	return (
		<div>
			<section id="home">
				<h2 className="text-2xl font-bold">Welcome!</h2>
				<p className="text-lg">Are you looking for caffee?</p>
				<img
					className="home-image w-full"
					src={randomImage}
					alt="Random coffeeImage"
				/>
				<p>
					Coffee, beverage brewed from the roasted and ground seeds of the
					tropical evergreen coffee plants of African origin. Coffee is one of
					the three most popular beverages in the world (alongside water and
					tea) and one of the most profitable international commodities. Though
					coffee is the basis for an endless array of beverages, its popularity
					is mainly attributed to its invigorating effect, which is produced by
					caffeine, an alkaloid present in coffee.
				</p>
				<div className="divider-1"></div>
				<h2 className="text-2xl font-bold text-justify">
					What you can find here?
				</h2>
				<p>
					A selection of the best places to buy <b>CoffeeBeans</b> to prepare at
					home and also several <b>CoffeeShops</b> that other users have tried
					and decided to share with us.
					<br />
				</p>
				<div className="text">
					<h2 className="text-lg font-bold">And what can you do here?</h2>
					<p>
						Here you can either search for new places or add and share with
						others your favorite places to buy <b>CoffeeBeans</b>, find a{" "}
						<b>CoffeeShop</b> close to you and have a delicious coffee from
						different origins.
					</p>
				</div>
				<div>
					<img
						className="image w-full"
						src="https://cdn.britannica.com/16/138916-050-93D18857/coffee-beans-ground-paper-bags.jpg"
						alt="Coffee"
					/>
				</div>
				<div className="divider-2"></div>
				<div className="text">
					<h2 className="text-2xl font-bold text-start">About us</h2>
					<p>
					The idea for the project came through a joke with a really good friend (Gab) who loves coffee, so I thought why not create an application that my friend can find people like her who are passionate about coffee around the world and share places and experiences drinking delicious coffee.
					</p>
				</div>
				<div>
					<img
						className="image w-full"
						src="https://cdn.britannica.com/44/43944-004-5378C164/Coffee-plantation-Colombia.jpg?s=1500x700&q=85"
						alt="Coffee"
					/>
				</div>
				{!loggedIn && (
					<>
						<div className="divider-1"></div>
						<h2 className="text-lg font-bold">
							If you love a good coffee then join us as part of our community
						</h2>
						<div className="flex flex-col">
							<p>Register now it's free!</p>
							<Link to="/signup">
								<button className="btn btn-primary">Signup</button>
							</Link>
							<p>Already have an account?</p>
							<Link to="/login">
								<button className="btn btn-primary">Login</button>
							</Link>
						</div>
					</>
				)}
				<p></p>

				<div className="divider-2"></div>
			</section>
			<footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
				<div className="grid grid-flow-col gap-4">
					<button className="link link-hover">About us</button>
					<button className="link link-hover">GitHub</button>
					<button className="link link-hover">Linkedin</button>
				</div>
				<div>
					<div className="grid grid-flow-col gap-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className="fill-current"
						>
							<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className="fill-current"
						>
							<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
						</svg>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							className="fill-current"
						>
							<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
						</svg>
					</div>
				</div>
				<div>
					<p>
						Copyright © 2022 - All right reserved by <i>Luiz Lima</i>
					</p>
				</div>
			</footer>
		</div>
	);
}

export default HomePage;

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import BeansListPage from "./pages/BeansListPage/BeansListPage";
import ShopListPage from "./pages/ShopListPage/ShopListPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Private from "./components/Private/Private";
import BeansDetailsPage from "./pages/DetailsPage/BeansDetailsPage";
import ShopDetailsPage from "./pages/DetailsPage/ShopDetailsPage";
import EditBeansPage from "./pages/EditPage/EditBeansPage";
import EditShopPage from "./pages/EditPage/EditShopPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfilePage from "./pages/ProfilePage/EditProfilePage";
import AddBeans from "./components/AddCoffee/AddBeans";
import AddShop from "./components/AddCoffee/AddShop";

function App() {
	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/beanslist"
					element={
						<Private>
							<BeansListPage />
						</Private>
					}
				/>

				<Route
					path="/addbeans"
					element={
						<Private>
							<AddBeans />
						</Private>
					}
				/>

				<Route
					path="/beansdetails/:beansId"
					element={
						<Private>
							<BeansDetailsPage />
						</Private>
					}
				/>

				<Route
					path="/beansdetails/edit/:beansId"
					element={
						<Private>
							<EditBeansPage />
						</Private>
					}
				/>

				<Route
					path="/shoplist"
					element={
						<Private>
							<ShopListPage />
						</Private>
					}
				/>

				<Route
					path="/addshop"
					element={
						<Private>
							<AddShop />
						</Private>
					}
				/>

				<Route
					path="/shopdetails/:shopId"
					element={
						<Private>
							<ShopDetailsPage />
						</Private>
					}
				/>

				<Route
					path="/shopdetails/edit/:shopId"
					element={
						<Private>
							<EditShopPage />
						</Private>
					}
				/>

				<Route
					path="/profile"
					element={
						<Private>
							<ProfilePage />
						</Private>
					}
				/>

				<Route
					path="/profile/edit/:userId"
					element={
						<Private>
							<EditProfilePage />
						</Private>
					}
				/>

				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;

import { Dropdown } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Dropdown2() {
	return (
		<Dropdown>
			<Dropdown.Button flat>Menu</Dropdown.Button>
			<Dropdown.Menu aria-label="Static Actions">
				<Dropdown.Item key="new">
					<Link to="/profile">Profile</Link>
				</Dropdown.Item>
				<Dropdown.Item key="copy">Copy link</Dropdown.Item>
				<Dropdown.Item key="edit">Edit file</Dropdown.Item>
				<Dropdown.Item key="delete" color="error">
					Delete file
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
}

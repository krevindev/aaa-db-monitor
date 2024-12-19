import { Link } from "react-router-dom";

const NavItem = (props) => {
  return (
    <Link to={props.targetPath}>
      <h4 className="text-white py-5 hover:bg-green-500">{props.name}</h4>
    </Link>
  );
};

const navData = [
  { name: "Home", targetPath: "/" },
  { name: "Add User", targetPath: "/add_user" },
];

const Sidebar = () => {
  return (
    <div className="w-[10vw] h-screen bg-green-400 flex justify-center items-center flex-col">
      <ul className="w-full  text-center">
        {navData.map((dat, index) => (
          <NavItem key={index} name={dat.name} targetPath={dat.targetPath} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

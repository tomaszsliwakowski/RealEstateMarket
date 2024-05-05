import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";

type MenuRoutesType = {
  link: string;
  name: string;
};

const menuRoutes: MenuRoutesType[] = [
  { link: "/", name: "Home" },
  { link: "/", name: "About" },
  { link: "/", name: "Contact" },
  { link: "/", name: "Agents" },
  { link: "/", name: "Sign in" },
  { link: "/", name: "Sign up" },
];

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav>
      <div className="left">
        <Link className="logo" to="/">
          <img src="./logo.png" alt="logo" />
          <span>RealEstateMarket</span>
        </Link>
        {menuRoutes.slice(0, 4).map((item: MenuRoutesType, id: number) => (
          <Link key={id} to={item.link}>
            {item.name}
          </Link>
        ))}
      </div>
      <div className="right">
        <Link to="/">Sign in</Link>
        <Link className="register" to="/">
          Sign up
        </Link>
        <div className="menuSwitch">
          <img
            src="./menu.png"
            alt="menu icon"
            onClick={() => setOpen((prev: boolean) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          {menuRoutes.map((item: MenuRoutesType, id: number) => (
            <Link key={id} to={item.link}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

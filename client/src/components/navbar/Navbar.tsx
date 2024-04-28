import { useState } from "react";
import "./navbar.scss";

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
        <a className="logo" href="/">
          <img src="./logo.png" alt="logo" />
          <span>RealEstateMarket</span>
        </a>
        {menuRoutes.slice(0, 4).map((item: MenuRoutesType, id: number) => (
          <a key={id} href={item.link}>
            {item.name}
          </a>
        ))}
      </div>
      <div className="right">
        <a href="/">Sign in</a>
        <a className="register" href="/">
          Sign up
        </a>
        <div className="menuSwitch">
          <img
            src="./menu.png"
            alt="menu icon"
            onClick={() => setOpen((prev: boolean) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          {menuRoutes.map((item: MenuRoutesType, id: number) => (
            <a key={id} href={item.link}>
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

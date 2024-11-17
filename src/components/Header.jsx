import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { useState } from "react";

const pages = [
  { title: "Home", link: "/", display: true },
  { title: "About", link: "/", display: true },
  { title: "Login", link: "/", display: true },
  { title: "Register", link: "/", display: true },
  { title: "Logout", link: "/", display: false },
];

const Header = () => {
  const [collapsed, setCollapsed] = useState(true);

  // It will be open/expand menu or collapse menu (see normal or with the symbol)
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="bg-secondary">
      {/* light is white, color in reactstrap */}
      <Navbar color="faded" className="container" light expand="md">
        <NavbarBrand className="me-auto fs-3 text text-white">
          ToDo App
        </NavbarBrand>
        {/* Some funcionality logic */}
        {/* It is like a button */}
        <NavbarToggler onClick={toggleNavbar} className="me-2 bg-white" />
        {/* Collapse is a menu */}
        <Collapse isOpen={!collapsed} navbar>
          {
            // If display: true, the page will be displayed
            pages
              .filter((page) => page.display)
              .map((item, index) => (
                <Nav key={index} className="ml-auto">
                  <NavItem>
                    <NavLink className="text-white">{item.title}</NavLink>
                  </NavItem>
                </Nav>
              ))
          }
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

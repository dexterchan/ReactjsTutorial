import React from "react";

//Stateless Functional Component

const NavBar = props => {
  const { totalCounter } = props;
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar{" "}
        <span className="badge badge-pill bage-secondary">{totalCounter}</span>
      </a>
    </nav>
  );
};

export default NavBar;

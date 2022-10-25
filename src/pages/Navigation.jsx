
import { Outlet, Link } from "react-router-dom";
function Navigation() {
  return (
    <>
      <nav>
<h1>Welcome to AltSchool</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Navigation
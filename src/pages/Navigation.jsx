import { Outlet, NavLink } from "react-router-dom";
import './Navigation.css';
function Navigation() {
  return (
    <>
      <nav>
<h1>Welcome to AltSchool</h1>
        <ul>
          <li>
            <NavLink style={({ isActive }) =>
          isActive ? { color: 'red' } : { color: 'black' } }to="/" className='navigate'>Home</NavLink>
          </li>
          <li>
            <NavLink    style={({ isActive }) =>
          isActive ? { color: 'red' } : { color: 'black' }}to="/nestedroute" className='navigate'>NestedRoute</NavLink>
          </li>
          <li>
            <NavLink    style={({ isActive }) =>
          isActive ? { color: 'red' } : { color: 'black' }}to="/errorboundary" className='navigate'>ErrorBoundary</NavLink>
          </li>
        
        </ul>
      </nav>
      <Outlet />
    </>
  )
};

export default Navigation
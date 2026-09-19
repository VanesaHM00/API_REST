import { NavLink, Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar sticky-top mb-4">
      <div className="container">
        
        <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/">
          <span className="fs-4">🎬</span>
          <span>CINEMA<span className="text-purple">APP</span></span>
        </Link>

       
        <button 
          className="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto gap-1 py-2 py-lg-0">
            <NavLink 
              className={({ isActive }) => `nav-link custom-link ${isActive ? 'active-link' : ''}`} 
              to="/generos"
            >
              🎭 Géneros
            </NavLink>
            <NavLink 
              className={({ isActive }) => `nav-link custom-link ${isActive ? 'active-link' : ''}`} 
              to="/directores"
            >
              🎬 Directores
            </NavLink>
            <NavLink 
              className={({ isActive }) => `nav-link custom-link ${isActive ? 'active-link' : ''}`} 
              to="/productoras"
            >
              🏢 Productoras
            </NavLink>
            <NavLink 
              className={({ isActive }) => `nav-link custom-link ${isActive ? 'active-link' : ''}`} 
              to="/tipos"
            >
              🏷️ Tipos
            </NavLink>
            <NavLink 
              className={({ isActive }) => `nav-link custom-link ${isActive ? 'active-link' : ''}`} 
              to="/media"
            >
              🍿 Películas y Series
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
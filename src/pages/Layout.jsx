import { Outlet, Link, useLocation } from "react-router-dom"; 


function Layout() { 
    const location = useLocation();

    const showNavbar = location.pathname === "/signup" || location.pathname === "/signin" || location.pathname === "/failed" || location.pathname==="/";

    return ( 
        <div>
           
           

            {showNavbar && (
                <nav className="navbar container">
                    <div className="container-fluid">
                        <img className="navbar-brand" src="images/logo.png" alt="Logo" />

                        <div className="btn-group" role="button">
                            <button className="btn btn-outline-info">
                                <Link to="/signup" style={{ textDecoration: "none" }}>Sign Up</Link>
                            </button>
                            <button className="btn btn-outline-info">
                                <Link to="/signin" style={{ textDecoration: "none" }}>Sign In</Link>
                            </button>
                        </div>
                    </div>
                </nav>
            )}

            <Outlet />
        </div>
    );
}

export default Layout;
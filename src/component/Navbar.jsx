
import React,{useEffect,useRef} from "react"
import { Logout } from "@mui/icons-material"
import axios from "axios";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import HistoryIcon from '@mui/icons-material/History';
import FirstPageIcon from '@mui/icons-material/FirstPage';
function Navbar(props){
    const baseUrl= "http://localhost:5000"

    axios.post(baseUrl +"/home/:id")
         .then(res=>{
            console.log(res.data)
         })

    // for logout tooltip


    const buttonRef = useRef(null);
     useEffect(() => {
    // Initialize tooltip
     const tooltip = new window.bootstrap.Tooltip(buttonRef.current);
   // Cleanup
    return () => {
      tooltip.dispose();
    };
   }, []);



    return(
    <div className="container navbarSec" >
        <nav className="navbar bg-body-tertiary fixed-top navSec container">
            <div className="container-fluid">
                <a href="/home" style={{textDecoration:"none",fontFamily:"Montserrat"}}>   <img className="navbar-brand" src="images/logo.png" alt="Logo" /> News Aggregator</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="offcanvas offcanvas-end "
                    tabindex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header offcanvas-nav">
                        <h6 className="offcanvas-title" id="offcanvasNavbarLabel"><AccountCircleRoundedIcon /> {props.name}</h6>
                        
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-header offcanvas-nav">
                        
                        <p className="offcanvas-title" id="offcanvasNavbarLabel"><FingerprintIcon /> {props.id}</p>
                       
                    </div>
                    <div className="offcanvas-body ">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 offcanvas-nav ">
                            <li className="nav-item">
                                <a className="nav-link " role="button" href="/"><FirstPageIcon />First Page</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" role="button" href="/h-history"><HistoryIcon />History</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" role="button" href="/home"><HomeIcon />Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" role="button" href="/headlines"><ArticleIcon />Headlines</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" role="button" href="/everything"><ArticleIcon />Everything</a>
                            </li>

                            <li className="nav-item">
                            <a className="nav-link "  ref={buttonRef} onClick={props.onLogout} role="button" href={`${baseUrl}/logout`} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="LogOut">
                             <Logout />Logout
                            </a>
                            </li>

                            </ul>
                           
                        </div>
                     </div>
                    </div>
                </nav>
    </div>
    )
}

export default Navbar
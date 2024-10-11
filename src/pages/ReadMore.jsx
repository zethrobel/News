import React,{useEffect,useState} from "react"
import { useLocation,useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../component/Navbar"
import Footer from "../component/Footer"
function ReadMore(){
    const navigate= useNavigate()
    const location= useLocation()
    const [userAuthenticated, setUserAuthenticated] = useState(false)
    const [userData, setUserData] = useState({})
    const baseUrl = "http://localhost:5000"

    const { title, content, img, description, link, pubDate, author, source } = location.state

    useEffect(()=>{
       const checkAuth = async () => {
            try {
                const res = await axios.get(baseUrl + "/home", { withCredentials: true });
                setUserAuthenticated(true);
                fetchData();
            } catch (err) {
                console.error(err);
                setUserAuthenticated(false);
                navigate("/signin");
            }
        };

        const fetchData = async () => {
            try {
                const userProfile = await axios.get(baseUrl + "/profile", { withCredentials: true });
                setUserData(userProfile.data);
            } catch (err) {
                console.error(err);
            }
        };

        checkAuth();
    }, [navigate]);
    
    return(
        <div>
          <Navbar name={userData.username} id={userData.id} />
    <div className="container bootstrap snippets bootdey"> 
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="well blog">
              <a>
                  <div className="date primary">
                      <span className="blog-date">M:{pubDate.slice(5,7)}</span>
                       <span className="blog-number">{pubDate.slice(8,10)}</span>
                  </div>
                  <div className="row">
                      <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                          <div className="image">
                              <img src={img}alt="" />
                          </div>
                      </div>
                      <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
                          <div className="blog-details">
                              <h2>{title}</h2>
                              <p>{author}, {source.name}, {pubDate.slice(0,10)}</p>

                          </div>
                      </div>
                  </div>
              </a>
          </div>
      </div>
      </div>
                    <div className="readMore-details">
                     <p><strong>{description}</strong></p>
                     <p>{content}</p>
                     <a href={link}>Read more on {source.name}</a>
                    
                    </div>
      </div>

            <Footer />
        </div>
    )
}
export default ReadMore
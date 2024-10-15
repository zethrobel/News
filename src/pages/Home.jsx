import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Home() {
    const navigate = useNavigate();
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const baseUrl = "https://news-backend-sj97.onrender.com"

       useEffect(() => {
        const checkAuth = async () => {
            try {
                console.log(`${baseUrl}/home`);
                const res = await axios.get(`${baseUrl}/home`, {
                    withCredentials: true,
                    validateStatus: function (status) {
                        return status < 500; // Resolve only if the status code is less than 500
                    }
                });
                
                // Check if response status indicates authentication success
                if (res.status === 200) {
                    console.log(res.data);
                    setUserAuthenticated(true);
                    fetchData();
                } else {
                    setUserAuthenticated(false);
                    navigate("/signin");
                }
            } catch (err) {
                console.error(err);
                setUserAuthenticated(false);
                navigate("/signin");
            }
        };

        const fetchData = async () => {
            try {
                const userProfile = await axios.get(`${baseUrl}/profile`, {
                    withCredentials: true,
                    validateStatus: function (status) {
                        return status < 500; // Resolve only if the status code is less than 500
                    }
                });
                setUserData(userProfile.data);
            } catch (err) {
                console.error(err);
            }
        };

        checkAuth();
    }, [navigate]);


    return (
        <div>
            <Navbar name={userData.username} id={userData.id} />
            <div className="container">
                <div className="homeDescription">
                    <h4 >Explore the Latest News!</h4>
                    <hr />
                    <p><strong>Headlines Button:</strong> Click this to see the top trending news stories related to the subject you're interested in.</p>
                    <p><strong>Everything Button:</strong> If you want to dive deeper, click here to get all available news articles on that subject.</p>
                    <p>Happy reading!</p>
                    <hr />
                </div>
                <div className="homeButton">
                    <Link className="btn btn-outline-info btn-lg" to="/headlines" role="button">Headlines</Link>
                    <Link className="btn btn-outline-info btn-lg" to="/everything" role="button">Everything</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;

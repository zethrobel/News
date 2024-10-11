import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import SearchArea from "../component/SearchArea";
import News from "../component/News";
import { TailSpin } from 'react-loader-spinner';
function Headlines() {
    const navigate = useNavigate();
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [userData, setUserData] = useState({});
    const [searchedData, setSearchedData] = useState([]);
    const [loading,setLoading]=useState(true)
    const baseUrl = "http://localhost:5000";

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                const response = await axios.get(baseUrl + "/headlines");
                setSearchedData(response.data.articles || []);
                
                 // Store default articles in local storage when first loaded
                localStorage.setItem('searchedData', JSON.stringify(response.data.articles || []))
            } catch (error) {
                console.error(error);
                
            }
            finally {
             setLoading(false);
            }

            
        };

         // Check local storage for previously searched articles
        const localSearchedData = localStorage.getItem('searchedData');
        if (localSearchedData) {
            setSearchedData(JSON.parse(localSearchedData));
             setLoading(false);
        } else {
            fetchHeadlines();
            
        }
        

        const checkAuth = async () => {
            try {
                const res = await axios.get(baseUrl + "/home", { withCredentials: true });
                setUserAuthenticated(true);
                fetchData();
                
            } catch (err) {
                console.error(err);
                setUserAuthenticated(false);
                localStorage.removeItem('searchedData'); // Clear local storage on session expiration
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

   const addSearch = async (event, newSearch) => {
        setLoading(true); // Start loading spinner
        try {
            const res = await axios.post(baseUrl + "/headlines", { searchHeadlines: newSearch }, { withCredentials: true });
            const articles = res.data.articles || [];
            setSearchedData(articles);
            // Store search results in local storage
            localStorage.setItem('searchedData', JSON.stringify(articles));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Stop loading spinner once the data is fetched
        }
    }
    
    function handleLogout(){
        axios.post(baseUrl + "/logout", {}, { withCredentials: true })
            .then(() => {
                localStorage.removeItem('searchedData'); // Clear local storage on logout
                navigate("/signin");
            })
            .catch(err => console.error(err));
    }

    if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TailSpin color="#00BFFF" height={80} width={80} /> {/* Your spinner component */}
      </div>
    );
  }

    return (
        <div className="container">
            <Navbar name={userData.username} id={userData.id}  onLogout={handleLogout}/>
            <SearchArea
                name="searchHeadlines"
                newsCatagory="Top Headlines"
                placeHolder="business entertainment general health science sports technology"
                onSearch={addSearch}
            />
            <div className="row">
                {searchedData.map((article, index) => (
                    <News
                        key={index}
                        img={article.urlToImage}
                        title={article.title}
                        content={article.content}
                        description={article.description}
                        url={article.url}
                        publishedAt={article.publishedAt}
                        author={article.author}
                        source={article.source}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Headlines;

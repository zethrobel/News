import React,{useState,useEffect,useRef} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import History from "../component/History";
import { DeleteForeverRounded } from "@mui/icons-material";

function HeadlinesHistory(){
    const navigate = useNavigate();
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [historyHeadlines,setHistoryHeadlines]= useState([])
    const [userData,setUserData]=useState({})
   
    const baseUrl = "https://news-backend-sj97.onrender.com";

    useEffect(() => {
         const fetchHeadlinesHistory = async () =>{
              try{
                const response = await axios.get(baseUrl + "/headlines/history", {withCredentials: true})
                setHistoryHeadlines(response.data)
                console.log(response.data)

                 }
              catch(err){
                console.error(err)
                }
         }
        const checkAuth = async () => {
               try {
                // Ensure withCredentials is true to send the session cookie
                const res = await axios.get(baseUrl + "/home", {withCredentials: true});
                console.log(res.data); // Log the response for debugging
                setUserAuthenticated(true);
                fetchData()
                
                } catch (err) {
                console.error(err);
                setUserAuthenticated(false);
                navigate("/signin"); // Navigate to signin if not authenticated
                }
           
        };
         const fetchData= async () => {
                try{
                //get the user profile from the backend
                const userProfile = await axios.get(baseUrl + "/profile", {withCredentials: true}); 
                setUserData(userProfile.data)
                console.log(userProfile.data)
                console.log(userData)
                }
                catch(err){
                console.error(err)
            }
         }

           if (userAuthenticated) {
                  fetchHeadlinesHistory();
                 }
    checkAuth();
    }, [navigate,userAuthenticated]);
    
    //for Delete All
    const buttonRef = useRef(null);
     useEffect(() => {
    // Initialize tooltip
     const tooltip = new window.bootstrap.Tooltip(buttonRef.current);
   // Cleanup
    return () => {
      tooltip.dispose();
    };
   }, []);
    
     
    const deleteHead = async (id) => {
        try {
            await axios.delete(`${baseUrl}/headlines/history/delete/${id}`, { withCredentials: true });
            // Update state immediately to reflect deletion
            setHistoryHeadlines(historyHeadlines.filter(headline => headline._id !== id));
        } catch (err) {
            console.error(err);
        }
    };
   
   const  deleteAll= async ()=>{
       try{
       await axios.delete(`${baseUrl}/headlines/history/deleteAll`,{ withCredentials: true })
        setHistoryHeadlines([])
       }
       catch(err){
        console.error(err)
       }
   }   

    return(
        <div>
        
         <Navbar 
           name={userData.username}
           id={userData.id} 
                      />

          <div className="history text-center">
             <div className="btn-group" role="group" aria-label="Basic example">
                    <a role="button" href="/h-history" className="btn btn-outline-info ">Headlines History</a>
                    <a role="button" href= "/e-history" className="btn btn-outline-info ">Everything History</a>
                    
                </div> 
                <div className=" text-end">
                      <button ref={buttonRef} onClick={deleteAll} className="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete All"><DeleteForeverRounded /></button>
                </div>
          </div>
        {historyHeadlines.map((data,index)=>(
          
          <History
            key={index} 
            image={data.headlinesUrlToImage}
            title={data.headlinesTitle}
            date={data.headlinesPublishedAt}
            catagory={data.headlineCatagory}
            description={data.headlinesDescription}
            content={data.headlinesContent}
            author={data.headlinesAuthor}
            link={data.headlinesUrl}
            source={data.headlinesSource.name}
            onDelete={() => deleteHead(data._id)}
          />
          
        ))}

           <Footer /> 

        </div>
    )
}

export default HeadlinesHistory
import React,{useState,useEffect,useRef} from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import History from "../component/History";
import { DeleteForeverOutlined } from "@mui/icons-material";
function EverythingHistory(){
     const navigate = useNavigate();
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [userData,setUserData]=useState({})
    const [historyEverything,setHistoryEverything]=useState([])
    const baseUrl = "https://news-backend-sj97.onrender.com";

    useEffect(() => {
           const fetchEverythingHistory = async () =>{
              try{
                const response = await axios.get(baseUrl + "/everything/history", {withCredentials: true})
                setHistoryEverything(response.data)
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
                  fetchEverythingHistory();
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
     
    const deleteEvery = async (id) => {
        try {
            await axios.delete(`${baseUrl}/everything/history/delete/${id}`, { withCredentials: true });
            // Update state immediately to reflect deletion
            setHistoryEverything(historyEverything.filter(evthing => evthing._id !== id));
        } catch (err) {
            console.error(err);
        }
    };
   
   const  deleteAll= async ()=>{
       try{
       await axios.delete(`${baseUrl}/everything/history/deleteAll`,{ withCredentials: true })
        setHistoryEverything([])
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
                      <button ref={buttonRef} onClick={deleteAll} className="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete All"><DeleteForeverOutlined /></button>
                </div> 
          </div>

        {historyEverything.map((data,index)=>(
          <History
            key={index} 
            image={data.everythingUrlToImage}
            title={data.everythingTitle}
            date={data.everythingPublishedAt}
            catagory={data.everythingCatagory}
            description={data.everythingDescription}
            content={data.everythingContent}
            author={data.everythingAuthor}
            link={data.everythingUrl}
            source={data.everythingSource.name}
            onDelete={() => deleteEvery(data._id)}
          />
        ))}

           <Footer /> 

        </div>
    )
}

export default EverythingHistory
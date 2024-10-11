import React,{useEffect, useState} from "react";
import LoginIcon from '@mui/icons-material/Login';
import FacebookIcon from '@mui/icons-material/Facebook';
import { FacebookOutlined } from "@mui/icons-material";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useNavigate } from "react-router-dom";
import Input from "./../component/Input";
import axios from "axios";
import Footer from "../component/Footer";
import { TailSpin } from 'react-loader-spinner';
function SignUp(){
    //const date= new Date().toLocaleDateString()
    const baseUrl= "http://localhost:5000"
    const [newsUser,setNewsUser]= useState([])
    const [loading,setLoading]= useState(false)
    const navigate= useNavigate()

    useEffect(() => {
   axios.get(baseUrl + "/signup")
     .then((res) => {
       setNewsUser(res.data);
       //setLoading(true)
     })
     .catch((err) => {
       console.error(err);
     });
   }, []);

   
 const handleSubmit = (event) => {
        event.preventDefault();

        // Pass the user data to the addUser function
        const newUser = {username:newsUser.username,password:newsUser.password };
        addUser(newUser);
    } 


 function addUser(newUser) {
        setLoading(true);
        axios.post(baseUrl + "/signup", newUser)
            .then((res) => {
                console.log(res.data);
                // After registering, try to auto-login
                return axios.post(baseUrl + "/signin", {
                    username: newUser.username,
                    password: newUser.password
                }, { withCredentials: true }); // Include withCredentials
            })
            .then((res) => {
                console.log(res.data);
                navigate("/home"); // Navigate to the home page after successful login
            })
            .catch((err) => {
                console.error(err);
                navigate("/failed"); // Error handling
            })
            .finally(() => {
                // Set loading to false only after all promises are settled
                setLoading(false);
            });
    }

if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <TailSpin color="#00BFFF" height={80} width={80} /> {/* Your spinner component */}
      </div>
    );
  }

  

return (
        <div>
            <main className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>
                    <img
                        className="mb-4"
                        src="images/logo.png"
                        alt="logo"
                        width="180"
                        height="150"/>
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                   
               
                    <div>
                   <Input onAdd={addUser} />
                    
                    </div> 
                   
                   
                     <div>
                    
                     Or Sign up with
                     
                    <a className="buttonMargin form-control btn btn-outline-danger w-100 py-2" type="button" href={`${baseUrl}/auth/google`} role="button"><GoogleIcon />  Google</a>
                    <a className="buttonMargin form-control btn btn-outline-primary w-100 py-2" type="submit"  href={`${baseUrl}/auth/facebook`} role="button"><FacebookOutlined />  facebook </a>
                    <a className="buttonMargin form-control btn btn-outline-dark w-100 py-2" type="submit"  href={`${baseUrl}/auth/github`} role="button" ><GitHubIcon />  Github </a>
                    </div>
                    <p className="coverParagraph">Already have an account, <a href="/signin" style={{textDecoration:"none"}}> Sign in</a>. 
                     Or <a href="/" style={{textDecoration:"none"}}>back</a></p>
                    {/* <p className="mt-5 mb-3 text-body-secondary">&copy; {date} robelZeleke </p> */}

                </form>
                  <Footer />
            </main>

        </div>
    )
}

export default SignUp
import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import {FacebookOutlined} from "@mui/icons-material";
import Input from "../component/Input";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Footer from "../component/Footer";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';
function SignIn() {
    const date = new Date().toLocaleDateString()
    const baseUrl = "https://news-backend-sj97.onrender.com"
    const [newsUser, setNewsUser] = useState([])
    const [loading, setLoading] = useState(true) //loading state
    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get(baseUrl + "/home")
            .then((res) => {
                setNewsUser(res.data);
               // setLoading(true) //loading becomes false after data fetched
            })
            .catch((err) => {
                console.error(err);
                setLoading(false) //loading becomes false if there is error
            });
    }, []);

    function checkUser(newUser) {
        setLoading(true)
       axios.post(baseUrl + "/signin", newUser, {withCredentials: true})
            .then((res) => {
                console.log(res.data);
                navigate("/home");
            })
            .catch((err) => {
                console.error(err);
                navigate("/failed");
            })
            .finally(() => {
                // Set loading to false only after all promises are settled
                setLoading(false);
            })
          }
        

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page

        const newUser = {
            username: newsUser.username,
            password: newsUser.password
        };
        checkUser(newUser);
    };
     
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
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div >
                        <Input onAdd={checkUser}/>

                    </div>

                    <div>

                        Or Sign in with

                       <a className="buttonMargin form-control btn btn-outline-danger w-100 py-2" type="button" href={`${baseUrl}/auth/google`} role="button"><GoogleIcon />  Google</a>
                       <a className="buttonMargin form-control btn btn-outline-primary w-100 py-2" type="submit"  href={`${baseUrl}/auth/facebook`} role="button"><FacebookOutlined />  facebook </a>
                       <a className="buttonMargin form-control btn btn-outline-dark w-100 py-2" type="submit"  href={`${baseUrl}/auth/github`} role="button" ><GitHubIcon />  Github </a>
                   
                    </div>

                    <p className="coverParagraph">Don't have an account,
                        <a
                            href="/signup"
                            style={{
                                textDecoration: "none"
                            }}>
                            Create One</a>. Or
                        <a
                            href="/"
                            style={{
                                textDecoration: "none"
                            }}>back</a>
                    </p>
                    
                </form>
                <Footer />
            </main>

        </div>
    )
}

export default SignIn
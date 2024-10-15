import React,{useState,useEffect} from "react"
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";

function Input(props){
    //  const [isAuthenticated,setAuthenticate]=useState(false)
    //  const navigate=useNavigate()
    const [newsUser,setNewsUser]= useState({
        username:"",
        password:""
    })


     function userHandler(event){
       const {name,value}=event.target

       setNewsUser(preValue=>{
        return{
            ... preValue,
            [name]:value
        }
       })
    }
   function submitUser(event) {
    event.preventDefault()
    props.onAdd(newsUser);
    setNewsUser({username: "", password: ""});

}
   
    return (
        <div>
            <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com/ username"
                            onChange={userHandler}
                            name="username"
                            value={newsUser.username}    
                            required
                                
                            />
                        <label for="floatingInput">User Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                           
                            type="password"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={userHandler}
                            name='password'
                            value={newsUser.password}    
                            required

                            />
                        <label for="floatingPassword">Password</label>
                        
                    </div>
                    <div>
                    <button onClick={submitUser}  className=" buttonMargin form-control btn btn-outline-info w-100 py-2" type="submit"><LoginIcon /></button>
                    
                    </div> 
        </div>
    )
}

export default Input
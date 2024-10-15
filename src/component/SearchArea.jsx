import React, {useState} from "react"
import { Search } from "@mui/icons-material"

function SearchArea(props){
    
    const [search,setSearch]= useState("")

    function searchHandler(event){
      
     setSearch(event.target.value)

    }

    function submitsearch(event){
      event.preventDefault()
        props.onSearch(event,search);
       
        setSearch("");
    }

    return(
   <div>   
  <div><p>{props.newsCatagory}</p></div>    
  <div className="input-group mb-3">
    
    <input
        type="text"
        name={props.name}
        value={search}
        className="form-control"
        placeholder={props.placeHolder}
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
        onChange={searchHandler}  
        />
    <button onClick={submitsearch} className="btn btn-outline-info" type="submit" id="button-addon2"><Search /></button>
</div>
</div>
    )
}

export default SearchArea
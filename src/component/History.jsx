import React from "react"
import { DeleteOutline } from "@mui/icons-material";

function History(props){
   
   
    return (
    <div> 
    <div className="history-list-container">
      
     
      <div className="history-items shadow-lg p-3 mb-5 bg-body-tertiary rounded ">
       
         
            <div  className="history-item">
              <img src={props.image} alt={props.title} />
              <div className="history-item-details">
                <h2>{props.title}</h2>
             
             </div>
            </div>
                <p>{props.catagory}</p>
                <p>{props.description}</p>
                <p> {props.content}</p>
                <p><i>Published date:</i> {props.date}</p>
                <p><i>Source:</i> {props.author+", "+props.source}</p>
                <a href={props.link}>Read from {props.source}</a>
                <div className="text-end"><button className="delete-button " onClick={props.onDelete}><DeleteOutline /></button></div>
                
      </div>
    </div>
     
    </div> 
  );
}

export default History
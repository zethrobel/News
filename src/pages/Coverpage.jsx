import React from "react"
import sourceImages from "../component/images"


function Coverpage(){
    return(
          <div className="container">
             <img src="/images/News Aggregator.jpg" className="container img-fluid front-img"/>
             <p className="coverParagraph">Welcome to News aggregator, your one-stop shop for the latest news and information from across the globe.
              We curate and aggregate content from trusted sources, providing you with concise and comprehensive view of the world's happenings.
              Whether you're interested in politics, technology, entertainment or anything between we have you covered. Stay informed and engaged with our 
              easy-to-navigate interface, allowing you to personalize your experience and stay up-to-date on the topics that matter most of you. </p> 
             
           <div style={{height:"150px"}}>
              
                <h3 className="imageHeader">Our sources are</h3>
            <div>
                    {sourceImages.map((image, index) => (
                        <img key={index} className="img-thumbnail img-fluid w-source h-100 d-inline-block" src={image.src} alt={`Source ${index + 1}`} />
                    ))}
              </div>  
              
            
            <div className="footerNote">
            <p className="coverParagraph">Stay informed and engaged with the world's most important stories. <a style={{textDecoration:"none"}} href="/signup">Sign up</a> or <a style={{textDecoration:"none"}} href="/signin">Sign in</a> today 
            for exculisve access to the latest news from trusted sources, personalized updates and insightful analysis - ensuring you're always in the know. 
            </p>
           </div> 
           </div>

           
          </div>
    
    )
}
export default Coverpage
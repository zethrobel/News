import React from "react";
import { useNavigate } from "react-router-dom";
function News(props) {
  const title = props.title || "";
  const content = props.content || "";
  const navigate= useNavigate()

  function readMoreHandler() {
    
    navigate("/readmore", {
        state: {
            title: title,
            content: content,
            img: props.img,
            description: props.description,
            link: props.url,
            pubDate: props.publishedAt,
            author: props.author,
            source: props.source
        }
    })
}

  return (
    <div className="col-md-6 col-xs-12">
      <div className="panel" id="store-list">
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-5 ">
              <a href="#">
                <img src={props.img} className="img-responsive" alt="news" />
              </a>
            </div>
            <div className="col-sm-7">
              <h4 className="title-store">
                <strong>
                  <a href="#">{title.substring(0, 30) +" ... " + title.substring(title.length-15,title.length)}</a>
                </strong>
              </h4>
              <hr />
              <p>
                {content.substring(0, 100)+ " ... "}
              </p>
              <p>
                <a onClick={readMoreHandler} role="button" className="btn btn-outline-info pull-right" data-original-title="">
                  Read More
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;

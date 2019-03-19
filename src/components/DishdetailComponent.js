import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";

function renderDish(dish) {
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div />;
  }
}

function renderComments(comments) {
  if (comments != null) {
    const commentList = comments.map(comment => {
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit"
      };
      const formattedDate = new Date(comment.date).toLocaleDateString(
        "en-US",
        options
      );

      return (
        <div>
          <ul key={comment.id} className="list-unstyled">
            <li>{comment.comment}</li>
            <li>
              --{comment.author} {formattedDate}
            </li>
          </ul>
        </div>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        {commentList}
      </div>
    );
  }
}

const DishdetailComponent = props => {
  return (
    <div className="container">
          <div className="row">
              <Breadcrumb>

                  <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                  <h3>{props.dish.name}</h3>
                  <hr />
              </div>
          </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">{renderDish(props.dish)}</div>
        <div className="col-12 col-md-5 m-1">
          {renderComments(props.comments)}
        </div>
      </div>
    </div>
  );
};

export default DishdetailComponent;

import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUri";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  handleSubmit(values) {
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggle}>
          <span class="fa fa-pencil fa-lg" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Label htmlFor="rating">Rating</Label>
              <Control.select
                model=".rating"
                name="rating"
                className="form-control"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
              <Label htmlFor="author">Your Name</Label>
              <Control.text
                model=".author"
                className="form-control"
                id="author"
                name="author"
                placeholder="Youre Name"
                validators={{
                  required,
                  minLength: minLength(3),
                  maxLength: maxLength(15)
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                messages={{
                  required: "Required",
                  minLength: "Must be greater than 2 characters",
                  maxLength: "Must be 15 characters or less"
                }}
              />
              <Label htmlFor="comment">Comment</Label>
              <Control.textarea
                model=".comment"
                id="comment"
                name="comment"
                rows="6"
                className="form-control"
              />
              <br />
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function renderDish(dish) {
  if (dish != null) {
    return (
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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

function RenderComments({ comments, addComment, dishId }) {
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
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  }
}

const DishdetailComponent = props => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
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
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default DishdetailComponent;

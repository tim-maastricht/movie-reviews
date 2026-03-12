import { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import MovieDataService from "../services/movies";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddReview = ({ user }) => {
  const { id } = useParams(); // movie id from the URL
  const location = useLocation(); // for passing current review if editing
  const navigate = useNavigate();

  const [review, setReview] = useState(
    location.state?.currentReview?.review || "",
  );

  // keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false);

  // handle create vs edit based on 'editing'
  const editing = Boolean(location.state?.currentReview);

  const onChangeReview = (e) => {
    const review = e.target.value; // assign for readability
    setReview(review);
  };

  const saveReview = () => {
    if (!user) return;

    const data = {
      review: review,
      name: user.name,
      user_id: user.id,
      movie_id: id, // using id from useParams()
    };

    MovieDataService.createReview(data)
      .then((response) => {
        setSubmitted(true);
        navigate(`/movies/${id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  return (
    <div style={{ paddingTop: "6%"}}>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={`/movies/${id}`}>Back to movie</Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={onChangeReview}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveReview}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddReview;

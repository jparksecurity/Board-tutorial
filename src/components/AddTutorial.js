import React, { useState } from "react";
import PropTypes from "prop-types";
import TutorialDataService from "../services/tutorial";

AddTutorial.propTypes = {};

export default function AddTutorial(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const saveTutorial = () => {
    // let data = {
    //   title: title,
    //   description: description,
    //   published: false,
    // };

    // TutorialDataService.create(data)
    TutorialDataService.create({
      title: title,
      description: description,
      published: false,
      key: 0,
    })
      // .then(() => {
      //   console.log("Created new item successfully");
      //   setSubmitted(true);
      // })
      // .catch((e) => {
      //   console.log(e);
      // });
  };

  const newTutorial = () => {
    setTitle("");
    setDescription("");
    setPublished(false);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

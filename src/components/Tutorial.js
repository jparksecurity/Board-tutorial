import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TutorialDataService from "../services/tutorial";

Tutorial.propTypes = {};

export default function Tutorial(props) {
  const [currentTutorial, setCurrentTutorial] = useState({
    // key: null,
    name: "",
    title: "",
    description: "",
    fireurl: [],
    published: false,
  });
  //   const [currentTutorial, setCurrentTutorial] = useState(props.tutorial);
  const [message, setMessage] = useState("");

  // 임시
  const getDerivedStateFromProps = (nextProps, prevState) => {
    const { tutorial } = nextProps;
    if (prevState.currentTutorial.key !== tutorial.key) {
      return {
        currentTutorial: tutorial,
        message: "",
      };
    }

    return prevState.currentTutorial;
  };

  // ComponentDidMount
  useEffect(() => {
    setCurrentTutorial(props.tutorial);
    console.log(props.tutorial);
  }, [props.tutorial.title, props.tutorial.description]);

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setCurrentTutorial(function (prevState) {
      return {
        ...prevState,
        title: title,
      };
    });
  };

  const onChangeDescription = (e) => {
    const description = e.target.value;
    setCurrentTutorial((prevState) => ({
      ...prevState,
      description: description,
    }));
  };

  const updatePublished = (status) => {
    console.log("status 변경중p");
    console.log(status);
    setCurrentTutorial({ ...currentTutorial, published: status });
    const data = currentTutorial;
    console.log("tut 변경중p");
    console.log(currentTutorial.published);
    TutorialDataService.update(currentTutorial.key, { published: status });
  };

  const updateTutorial = () => {
    const data = currentTutorial;
    console.log("currentTutkey");
    console.log(currentTutorial.key);
    TutorialDataService.update(currentTutorial.key, data);
    props.refreshList();
  };

  const deleteTutorial = () => {
    // if (TutorialDataService.delete(currentTutorial.key)) {
    TutorialDataService.delete(currentTutorial.key);
    props.refreshList();
    // }
  };

  console.log("tut 변경중");
  console.log(currentTutorial);

  return (
    <div>
      <h4>Tutorial</h4>
      {currentTutorial ? (
        <div className="edit-form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              {currentTutorial.name}
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fileurl">FileUrl</label>
              {currentTutorial.fileurl}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentTutorial.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
}

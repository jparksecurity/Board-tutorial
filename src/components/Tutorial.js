import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import TutorialDataService from "../services/tutorial";

Tutorial.propTypes = {};

var atag = "";

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
  const aRef = useRef();

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

    atag = props.tutorial.fileurl;
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
  console.log(atag);

  return (
    <div>
      <h4>Tutorial</h4>
      {currentTutorial ? (
        <div className="edit-form">
          <form>
            <div style={{ backgroundColor: "skyblue", marginRight: "10px" }}>
              <label htmlFor="name" style={{ marginRight: "10px" }}>
                작성자 :
              </label>
              {currentTutorial.name}
            </div>

            <ul
              className="list-group"
              style={{
                marginTop: "20px",
                marginRight: "20px",
                marginBottom: "20px",
              }}
            >
              {currentTutorial && (
                // currentTutorial.fileurl.map((url, index) => (
                //   <li key={index}>{url}</li>
                // ))}
                // <li key={index}>
                <li>
                  {currentTutorial.fname}
                  <a
                    href={currentTutorial.fileurl}
                    style={{ marginLeft: "10px" }}
                    download
                  >
                    Download
                  </a>
                </li>
              )}
            </ul>

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

            {/* <div className="form-group">
              <label htmlFor="fileurl">FileUrl</label>
              {currentTutorial.fileurl}
      </div> */}

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
            {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div> */}
          </form>

          {/* {currentTutorial.published ? (
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
          )} */}

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

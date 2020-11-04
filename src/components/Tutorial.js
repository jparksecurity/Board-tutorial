import React, { useState } from "react";
import TutorialDataService from "../services/tutorial";

export default function Tutorial({ tutorial, refreshList }) {
    const [currentTutorial, setCurrentTutorial] = useState(tutorial);

    console.log('tutorial', tutorial);

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
    refreshList();
  };

  const deleteTutorial = () => {
    TutorialDataService.delete(currentTutorial.key);
    refreshList();
  };

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
              {currentTutorial.fileurl.map((url, index) => (
                <li>
                  {currentTutorial.fname[index]}
                  <a
                    href={url}
                    style={{ marginLeft: "10px" }}
                    download
                  >
                    Download
                  </a>
                </li>
                ))}
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

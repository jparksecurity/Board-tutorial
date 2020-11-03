import React, { useState } from "react";
import PropTypes from "prop-types";
import TutorialDataService from "../services/tutorial";
import UploadMultipleFiles from "./multipleFiles/UploadMultipleFiles";

AddTutorial.propTypes = {};

export default function AddTutorial(props) {
  const submitted = false;

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          {/* <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button> */}
        </div>
      ) : (
        <div>
          

          <div className="form-group">
            <label>Upload</label>
            <UploadMultipleFiles
            // onChangeFileUrl={onChangeFileUrl}
            // title={title}
            // setTitle={setTitle}
            // description={description}
            // setDescription={setDescription}
            // submitted={setSubmitted}
            // fileUrl={setFileUrl}
            />
          </div>

          {/* <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button> */}
        </div>
      )}
    </div>
  );
}

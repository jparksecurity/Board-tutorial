import React, { useEffect, useState } from "react";
import TutorialDataService from "../services/tutorial";
import Tutorial from "./Tutorial";

export default function TutorialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const loadTutorialData = () => {
    TutorialDataService.getAll().then((snapshot) => {
      setTutorials(snapshot.docs.map(item => ({ ...item.data() })));
    });
  }

  useEffect(() => {
    loadTutorialData();
  }, []);

  const refreshList = () => {
    loadTutorialData();
    setCurrentIndex(-1);
  };

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll();
    refreshList();
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setCurrentIndex(index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentIndex >= 0 ? (
          <Tutorial tutorial={tutorials[currentIndex]} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
}

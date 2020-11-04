import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TutorialDataService from "../services/tutorial";
import Tutorial from "./Tutorial";

TutorialsList.propTypes = {};

export default function TutorialsList(props) {
  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  var url = [];

  const onDataChange = (items, snapshot) => {
    let tus = [];

    items.forEach((item, i) => {
      // let key = item.data().key;
      let name = item.data().name;
      let title = item.data().title;
      let description = item.data().desc;
      const fileurl = item.data().fileurl.map(element => element.downloadURL);
      let fname = item.data().fname[0];

      tus.push({
        // key: key,
        name: name,
        title: title,
        description: description,
        fileurl: fileurl,
        fname: fname,
      });
    });
    console.log(tus);
    setTutorials(tus);
  };

  useEffect(() => {
    TutorialDataService.getAll().then((snapshot) => {
      console.log("데이터 가져옴");
      console.log(snapshot.docs.map((doc) => doc.data()));
      // console.log(snapshot.docs.map((doc) => doc.data()));
      onDataChange(snapshot.docs, snapshot);
    });
  }, []);

  const refreshList = () => {
    TutorialDataService.getAll().then((snapshot) => {
      console.log("데이터 가져옴");
      console.log(snapshot.docs.map((doc) => doc.data()));
      onDataChange(snapshot.docs);
    });

    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.deleteAll();
    refreshList();
  };

  // console.log("currentTuRkey");
  // console.log(currentTutorial.key);
  console.log(tutorials);
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
                onClick={() => setActiveTutorial(tutorial, index)}
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
        {currentTutorial ? (
          <Tutorial tutorial={currentTutorial} refreshList={refreshList} />
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

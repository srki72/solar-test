import React, { useState, useEffect } from "react";

import "./App.css";

const searchSolarProjects =
  "https://api.cdgm.energysage.com/api/v1/projects/search/";

function App() {
  const [solarData, setSolarData] = useState([]);
  
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getSolarProjectFetch();
  }, []);

  const getSolarProjectFetch = async () => {
    const response = await fetch(searchSolarProjects);

    const jsonData = await response.json();

    setSolarData(jsonData);
  };



  let solarDataN = solarData.filter((data) => {

    let searchCondition = data.is_active;
    if (searchText!=='') {
      searchCondition = searchCondition && (searchText === data.address.state || searchText === data.address.zip_code);
    }
    return searchCondition;
  });

  console.warn(solarDataN.lenght);

  let solarDataPackage = solarDataN.map((data) => {
    return (
      <li className="data-container-one">
        <div className="info-item">Title: {data.name}</div>
        <div className="info-item">
          {" "}
          Expected go Live: {data.expected_go_live}
        </div>
        <div className="info-item">
          Average Review Score: {data.average_review_score}
        </div>
      </li>
    );
  });


  function handleOnChange(event) {
    setSearchText(event.target.value);
  }


  return (
    <div>
      <div className="input_field">
        <input className="search_data" type="text" onChange={handleOnChange} />
      </div>

      <div className="App">
        <ul className="data-container">{solarDataPackage}</ul>
      </div>
    </div>
  );
}

export default App;

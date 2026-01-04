//Import useState to store data and useEffect to run code when the component loads
import { useState, useEffect} from "react";

//
import { Routes, Route } from "react-router-dom";

//Import JSON file that contains all property data
import propertiesData from "./data/properties.json";

import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import PropertyPage from "./pages/PropertyPage";

//Main react component for the property search application
function App() {
  //Store all properties from JSON file
  const [properties, setProperties] = useState([]);
  //Store filtered search results
  const [filteredProperties, setFilteredProperties] = useState([]);


  useEffect(() => {
    //Load JSON data into state what app starts
    setProperties(propertiesData.properties);
  }, []);

  return (
    <Routes>
      <Route>
        path="/"
        element={
          <SearchPage>
            properties={properties}
            setFilteredProperties={setFilteredProperties}
          </SearchPage>
        }
      </Route>

      <Route>
        path="/results"
        element={<ResultsPage>Properties={properties}</ResultsPage>}
      </Route>

      <Route>
        path="/property/:id"
        element={
          <PropertyPage>
            properties={properties}
          </PropertyPage>
        }
      </Route>

    </Routes>
  );
}

export default App;
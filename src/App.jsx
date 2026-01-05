//Import useState to store data and useEffect to run code when the component loads
import { useState, useEffect} from "react";
//Import routing components from react router
import { Routes, Route } from "react-router-dom";

//Import JSON file that contains all property data
import propertiesData from "./data/properties.json";

//Import page level components
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import PropertyPage from "./pages/PropertyPage";

//Main react component for the property search application
function App() {
  //Store all properties from JSON file
  const [properties, setProperties] = useState([]);
  //Store filtered search results
  const [filteredProperties, setFilteredProperties] = useState([]);
  //Store favourite properties
  const [favourites, setFavourites] = useState([]);


  useEffect(() => {
    //Load JSON data into state what app starts
    setProperties(propertiesData.properties);
  }, []);

  return (
    //Controls page navigation
    <Routes>
      {/*Search page route*/}
      {/*Displays search form and favourites list*/}
      <Route
        path="/"
        element={
          <SearchPage
            properties={properties}
            setFilteredProperties={setFilteredProperties}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        }
      />
      
      {/*Results page route*/}
      {/*Displays properties that match the search criteria*/}
      <Route
        path="/results"
        element={
          <ResultsPage
            filteredProperties={filteredProperties}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        }
      />

      {/*Property details page route*/}
      {/*Displays full details of a single property*/}
      <Route
        path="/property/:id"
        element={
          <PropertyPage
            properties={properties}
            favourites={favourites}
            setFavourites={setFavourites}
          />
        }
      />

    </Routes>
  );
}

export default App;
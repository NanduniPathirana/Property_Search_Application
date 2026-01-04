//Import useState to store data and useEffect to run code when the component loads
import { useState, useEffect} from "react";

//Import JSON file that contains all property data
import propertiesData from "./data/properties.json";

//Main react component for the property search application
function App() {
  //Store all properties from JSON file
  const [properties, setProperties] = useState([]);
  //Store filtered search results
  const [filteredProperties, setFilteredProperties] = useState([]);

}
  useEffect(() => {
    //Load JSON data into state what app starts
    setProperties(propertiesData.properties);
  }, []);


export default App;
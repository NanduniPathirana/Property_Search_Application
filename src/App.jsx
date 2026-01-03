//Main react component for the property search application
import { useState } from "react";
function App() {
  //Store selected property type
  const [propertyType, setPropertyType] = useState("any")
  return (
    //Main container for the search pages
    <div className="app">
      <h1>Believe in Finding</h1>
      <h2>with the SL's largest choice of properties </h2>

      <p>
        Search properties to buy
      </p>

      {/* Collect user inputs to seearch properties*/}
      <form className="search-form">

        {/* Allows user to specify the type of property */}
        <div className="search-group">
          <label htmlFor="propertyType">
            Property Type
          </label>

          <select id="propertyType" name="propertyType">
            <option value="house">House</option>
            <option value="flay">Flat</option>
            <option value="any">Any</option>
          </select>
        </div>

        {/* Allows user to specify the price range */}
        <div className="search-group">
          {/* Minimum price input */}
          <label htmlFor="minPrice">Minimum Price</label>
          <input
             type="number"
             id="minPrice"
             name="minPrice"
             placeholder="Min Price"
          />

          {/* Maximum price input */}
          <label htmlFor="maxPrice">Maximum Price</label>
          <input
             type="number"
             id="maxPrice"
             name="maxPrice"
             placeholder="Max Price"
          />
        </div>

        {/* Allows user to specify the number of bedrooms */}
        <div className="search-group">
          {/* Minimum bedrooms input */}
          <label htmlFor="minBedrooms">Minimum Bedrooms</label>
          <input 
             type="number"
             id="minBedrooms"
             name="minBedrooms"
             placeholder="Min Bedrooms"
          />

          {/* Maximum bedrooms input */}
          <label htmlFor="maxBedrooms">Maximum Bedrooms</label>
          <input 
             type="number"
             id="maxBedrooms"
             name="maxBedrooms"
             placeholder="Max Bedrooms"
          />
        </div>

        {/* Allows users to search properties added after a specific date */}
        <div className="search-group">
          {/* Added after a specific date */}
          <label htmlFor="dateAdded">Date Added</label>
          <input
             type="date"
             id="dateAdded"
             name="dateAdded"
          />
        </div>

        {/* Allows users to enter the 1st part of the postcode */}
        <div className="search-group">
          <label htmlFor="postCode">Postcode</label>
          <input
             type="text"
             id="postcode"
             name="postcode"
             placeholder="e.g.-BR1, NW1"
          />
        </div>

      </form>

    </div>
  )
}

export default App;
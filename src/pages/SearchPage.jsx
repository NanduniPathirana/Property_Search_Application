// React hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//React UI widgets
import Select from "react-select";
import Slider from "rc-slider";
import DatePicker from "react-datepicker";

//Widgets styles
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";

//Search Page Component
function SearchPage({ 
    properties, 
    setFilteredProperties,
    favourites,
    setFavourites
}) {

    //React router hook for navigate
    const navigate = useNavigate();

    //State variables for search criteria

    //Store selected property type
    const [propertyType, setPropertyType] = useState({ value: "any", label: "Any" })
    //Store minimum price
    const [minPrice, setMinPrice] = useState("");
    //Store maximum price
    const [maxPrice, setMaxPrice] = useState("");
    //Store minimum bedrooms
    const [minBedrooms, setMinBedrooms] = useState("");
    //Store maximum bedrooms
    const [maxBedrooms, setMaxBedrooms] = useState("");
    //Store the selected date (React Datepicker)
    const [dateAdded, setDateAdded] = useState(null);
    //Store the postcode
    const [postCode, setPostcode] = useState("");

    //Options for react-select
    const propertyTypeOptions = [
        { value: "any", label: "Any" },
        { value: "house", label: "House" },
        { value: "flat", label: "Flat" }
    ];

    // Options for bedrooms select
    const bedroomOptions = [
        { value: "", label: "Any" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6+" }
    ];

    // Options for price select
    const minPriceOptions = [
        { value: "", label: "No min" },
        { value: "50000", label: "£50,000" },
        { value: "100000", label: "£100,000" },
        { value: "150000", label: "£150,000" },
        { value: "200000", label: "£200,000" },
        { value: "250000", label: "£250,000" },
        { value: "300000", label: "£300,000" },
        { value: "400000", label: "£400,000" },
        { value: "500000", label: "£500,000" },
        { value: "750000", label: "£750,000" },
        { value: "1000000", label: "£1,000,000" }
    ];

    const maxPriceOptions = [
        { value: "", label: "No max" },
        { value: "50000", label: "£50,000" },
        { value: "100000", label: "£100,000" },
        { value: "150000", label: "£150,000" },
        { value: "200000", label: "£200,000" },
        { value: "250000", label: "£250,000" },
        { value: "300000", label: "£300,000" },
        { value: "400000", label: "£400,000" },
        { value: "500000", label: "£500,000" },
        { value: "750000", label: "£750,000" },
        { value: "1000000", label: "£1,000,000" },
        { value: "1500000", label: "£1,500,000" }
    ];

    //Create the search handler function 
    const handleSearch = () => {
        const results = properties.filter((property) => {

            //Match property type
            const matchType = propertyType.value == "any" ||
                property.type.toLowerCase() === propertyType.value;

            // Match price range
            const matchMinPrice = minPrice === "" || property.price >= Number(minPrice);
            const matchMaxPrice = maxPrice === "" || property.price <= Number(maxPrice);

            // Match bedrooms
            const matchMinBedrooms = minBedrooms === "" || property.bedrooms >= Number(minBedrooms);
            const matchMaxBedrooms = maxBedrooms === "" || property.bedrooms <= Number(maxBedrooms);

            // Match postcode
            const matchPostcode =
                postCode === "" ||
                property.location.toLowerCase().includes(postCode.toLowerCase());

            // Match date added
            const propertyDate = new Date(
                `${property.added.month} ${property.added.day}, ${property.added.year}`
            );

            const matchDate =
                !dateAdded || propertyDate >= dateAdded;

            //Return only if all conditions match
            return (
                matchType &&
                matchMinPrice &&
                matchMaxPrice &&
                matchMinBedrooms &&
                matchMaxBedrooms &&
                matchPostcode &&
                matchDate
            );
        });

        //Saved filtered results
        setFilteredProperties(results);

        //Navigate to results page
        navigate("/results")
    };


    return (
        //Main container for the search pages
        <div className="search-page">
            <h1>Believe in Finding</h1>
            <h2>with the UK's largest choice of properties </h2>
            <p>Search properties to buy</p>

            {/* Collect user inputs to search properties*/}
            <div className="search-form">
                {/* Allows user to specify the type of property */}
                <div className="search-group">
                    <label>Property Type</label>
                    <Select
                        options={propertyTypeOptions}
                        value={propertyType}
                        onChange={(option) => setPropertyType(option)}
                        className="react-select-container"
                        classNamePrefix="react-select"
                    />
                </div>

                {/* Allows user to specify the price range */}
                <div className="search-group price-group">
                    <label>Price</label>
                    <div className="price-selects">
                        <Select 
                            options={minPriceOptions}
                            placeholder="Min Price"
                            onChange={(option) => setMinPrice(option ? option.value : "")}
                            isClearable
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                        <span className="price-separator">to</span>
                        <Select 
                            options={maxPriceOptions}
                            placeholder="Max Price"
                            onChange={(option) => setMaxPrice(option ? option.value : "")}
                            isClearable
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>        
                </div>
            

                {/* Allows user to specify the number of bedrooms */}
                <div className="search-group bedrooms-group">
                    <label>Bedrooms</label>
                    <div className="bedroom-selects">
                        <Select 
                            options={bedroomOptions}
                            placeholder="Min"
                            onChange={(option) => setMinBedrooms(option ? option.value : "")}
                            isClearable
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                        <span className="bedroom-separator">to</span>
                        <Select 
                            options={bedroomOptions}
                            placeholder="Max"
                            onChange={(option) => setMaxBedrooms(option ? option.value : "")}
                            isClearable
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>

                {/* Allows users to search properties added after a specific date */}
                <div className="search-group">
                    {/* Added after a specific date */}
                    <label>Date Added</label>                    
                    <DatePicker
                        selected={dateAdded}
                        onChange={(date) => setDateAdded(date)}
                        placeholderText="Select date"
                        dateFormat="dd/MM/yyyy"
                        className="datepicker-input"
                        maxDate={new Date()}
                    />
                </div>

                {/* Allows users to enter the 1st part of the postcode */}
                <div className="search-group">
                    <label>Postcode</label>
                    <input
                        type="text"
                        name="postcode"
                        placeholder="e.g.-BR1, NW1"
                        value={postCode}
                        onChange={ (e) => setPostcode(e.target.value)}
                        maxLength="10"
                    />
                </div>

                {/* Search Button*/}
                <button type="button" onClick={handleSearch}>
                    Search Properties
                </button>
            </div>
            

            {/*FAVOURITES DROP ZONE*/}
            <div className="favourites-zone">
                <h3>Favourites</h3>

                {favourites.length === 0 && <p>No favourites yet</p>}

                {favourites.map((fav) => (
                    <div key={fav.id} className="favourite-item">
                        <div className="favourite-details">
                            <strong>{fav.type}</strong> – £{fav.price.toLocaleString()}
                            <br />
                            <span className="favourite-location">{fav.location}</span>
                        </div>
                        
                        <button
                            onClick={() =>
                                setFavourites(favourites.filter((f) => f.id !== fav.id))
                            }
                        >
                            ❌
                        </button>
                    </div>
                ))}

                {favourites.length > 0 && (
                    <button onClick={() => setFavourites([])}>
                        Clear Favourites
                    </button>
                )}
            </div>

        </div>
    );
}  

export default SearchPage;
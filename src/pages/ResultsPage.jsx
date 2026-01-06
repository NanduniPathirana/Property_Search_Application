import { Link } from "react-router-dom";
import { getImage } from "../utils/imageLoader";

//Results page component
function ResultsPage({filteredProperties, favourites, setFavourites}) {
    
        // Add property to favourites (only once)
        const addToFavourites = (property) => {
            const alreadyAdded = favourites.some((fav) => fav.id === property.id);

            if (!alreadyAdded) {
                setFavourites([...favourites, property]);
            }
        };
        // Handle case where no results are found
        if (!filteredProperties || filteredProperties.length === 0) {
            return (
                <div className="results-page">
                    <h2>No properties found.</h2>
                    {/* Link back to search page*/}
                    <Link to="/">Back to Search</Link>
                </div>
            );
        }
        //Display search results
        return (
            <div className="results-page">
                <h2>Available Properties</h2>

                <div className="results-list">
                    {filteredProperties.map((property) => (
                        <div key={property.id} className="property-card">

                            {/* Property Main image */}
                            <div className="property-image">
                                <img 
                                   src={getImage(property.picture)}
                                   alt={property.type}
                                />
                            </div>

                            {/*Property summary*/}
                            <div className="property-details">
                                {/*Price*/}
                                <h3 className="price">
                                    £{property.price.toLocaleString()}
                                </h3>

                                {/*Property information*/}
                                <p className="meta">
                                    <strong>Type:</strong> {property.type} <br />
                                    <strong>Bedrooms:</strong> {property.bedrooms} <br />
                                    <strong>Location:</strong> {property.location}
                                </p>

                                {/*Property description*/}
                                <p className="short-description">
                                    {property.description.substring(0,150)}...
                                </p>

                                {/*Buttons*/}
                                <div className="card-actions">

                                    {/*Link to property page*/}
                                    <Link
                                       to={`/property/${property.id}`}
                                    className="view-property-details"
                                    >
                                        View Property
                                    </Link>

                                    {/*Add to favourites button*/}
                                    <button
                                        className="fav-btn"
                                        onClick={() => addToFavourites(property)}
                                        disabled={favourites.some((fav) => fav.id === property.id)}
                                    >
                                        {favourites.some((fav) => fav.id === property.id)
                                          ? "Added ❤️"
                                          : "❤️ Add to Favourites"}
                                        
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
}


export default ResultsPage;
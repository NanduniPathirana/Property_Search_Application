import { Link } from "react-router-dom";
//Results page component
function ResultsPage({filteredProperties}) {
        // If no results found
        if (!filteredProperties || filteredProperties.length === 0) {
            return (
                <div className="results-page">
                    <h2>No properties found.</h2>
                    <Link to="/">Back to Search</Link>
                </div>
            );
        }

        return (
            <div className="results-page">
                <h2>Available Properties</h2>

                <div className="results-list">
                    {filteredProperties.map((property) => (
                        <div key={property.id} className="property-card">

                            {/* Main image */}
                            <div className="property-image">
                                <img 
                                   src={property.picture}
                                   alt={property.type}
                                />
                            </div>

                            {/*Property details*/}
                            <div className="property-details">
                                {/*Price*/}
                                <h3 className="price">
                                    {property.price.toLocalString()}
                                </h3>

                                {/*Property information*/}
                                <p className="meta">
                                    <strong>Type:</strong> {property.type}
                                    <strong>Bedrooms:</strong> {property.bedrooms} <br />
                                    <strong>Location:</strong> {property.location}
                                </p>

                                {/*Property description*/}
                                <p className="short-description">
                                    {property.description.substring(0,150)}...
                                </p>

                                {/*Link to property page*/}
                                <Link
                                   to={`/property/${property.id}`}
                                   className="view-property-btn"
                                >
                                    View Property
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
}


export default ResultsPage;
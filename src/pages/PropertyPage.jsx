import { useParams } from "react-router-dom";
import { useState } from "react";

//Property page component
function PropertyPage({properties}) {
    // Get property id
    const { id } = useParams();

    //Find the selected property from JSON data
    const property = properties.find((p) => p.id === id);

    //State for control the main displayed image
    const [mainImage, setMainImage] = useState(property.picture);
    
    //State for control which tab is active
    const [activeTab, setActiveTab] = useState("description");

    //State for handle favourite button
    const [isFavourite, setIsFavourite] = useState(false);

    //if property is not found
    if (!property) {
        return <p>Property not found.</p>;
    }

    return (
        <div className="property-page">
            <div className="image-section">
                <img 
                   src={mainImage}
                   alt="Main property view"
                   className="main-image"
                />
            </div>

            {/*Thumbnail images*/}
            <div className="thumbnail-section">
                {property.images.map((img, index) => (
                    <img 
                       key={index}
                       src={img}
                       alt={`property view ${index + 1}`}
                       className="thumbnail"
                       onClick={() => setMainImage(img)}
                    />
                ))}
            </div>

            {/*Property short description*/}
            <div className="property-summary">
                <h2>{property.type}</h2>
                <h3>{property.price.toLocaleString()}</h3>
                <p>{property.location}</p>
            </div>

                {/*Favourite Button*/}
                <button 
                    className="favourite-btn"
                    onClick={() => setIsFavourite(true)}
                    disabled={isFavourite}
                >
                    {isFavourite ? "Added to Favourites": "Add to Favourites"}
                </button>
            

            {/*React tabs for description, floorplan, and map*/}
            <div className="tabs">
                {/*Tab headers*/}
                <div className="tab-buttons">
                    <button onClick={() => setActiveTab("description")}>
                        Description
                    </button>
                    <button onClick={() => setActiveTab("floorplan")}>
                        Floor Plan
                    </button>
                    <button onClick={() => setActiveTab("map")}>
                        Map
                    </button>
                </div>

                {/*Tab content*/}
                <div className="tab-content">

                    {/*Description Tab*/}
                    {activeTab === "description" && (
                        <div>
                            <p>{property.description}</p>
                        </div>
                    )}

                    {/*Floorplan Tab*/}
                    {activeTab === "floorplan" && (
                        <div>
                            <img 
                               src={property.floorPlan}
                               alt="Floor plan"
                               className="floor-plan"
                            />
                        </div>
                    )}

                    {/*Google map Tab*/}
                    {activeTab === "map" && (
                        <iframe  
                            title="Google Map"
                            src={property.map}
                            width="100%"
                            height="300"
                            loading="lazy"
                        ></iframe>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PropertyPage;
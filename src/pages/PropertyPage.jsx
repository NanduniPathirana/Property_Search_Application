import { useParams } from "react-router-dom";
import { useState } from "react";
import { getImage } from "../utils/imageLoader";


//Property page component
function PropertyPage({properties, favourites, setFavourites}) {
    // Get property id
    const { id } = useParams();

    //Find the selected property from JSON data
    if (!properties || properties.length === 0) {
        return <p>Loading property...</p>;
    }
    const property = properties.find((p) => p.id === id);

    //if property is not found
    if (!property) {
        return <p>Property not found.</p>;
    }

    //State for control the main displayed image
    const [mainImage, setMainImage] = useState(property.picture);
    
    //State for control which tab is active
    const [activeTab, setActiveTab] = useState("description");

    //check if property is already favourite
    const isFavourite = favourites.some((fav) => fav.id === property.id);

    //Add to favourites (only once)
    const addToFavourites =() => {
        if (!isFavourite) {
            setFavourites([...favourites, property]);
        }
    };
    const handleDropAdd = (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("propertyId");

        if (draggedId === property.id && !isFavourite) {
            setFavourites([...favourites, property]);
        }
    };

    //Remove from favourites
    function removeFromFavourites() {
        setFavourites(favourites.filter((fav) => fav.id !== property.id));
    }

    //Clear all favourites
    const clearFavourites = () => {
        setFavourites([]);
    };

    //Drag start handler
    const handleDragStart = (e) => {
        e.dataTransfer.setData("propertyId", property.id);
    };

    //Drop handler(remove when dragged out)
    const handleDropRemove = (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("propertyId");

        if (draggedId === property.id && isFavourite) {
            removeFromFavourites();
        }
    };

    return (
        <div className="property-page">
            <div className="image-section">
                <img 
                   src={getImage(mainImage)}
                   alt="Main property view"
                   className="main-image"
                />
            </div>

            {/*Thumbnail images*/}
            <div className="thumbnail-section">
                {property.images.map((img, index) => (
                    <img 
                       key={index}
                       src={getImage(img)}
                       alt={`property view ${index + 1}`}
                       className="thumbnail"
                       onClick={() => setMainImage(img)}
                    />
                ))}
            </div>

            {/*Property short description*/}
            <div className="property-summary">
                <h2>{property.type}</h2>
                <h3>£{property.price.toLocaleString()}</h3>
                <p>{property.location}</p>
            

                {/*Favourite Button*/}
                {!isFavourite ? (
                    <button 
                        aria-label="add-to-favourites-button"
                        draggable
                        onDragStart={handleDragStart}
                        onClick={addToFavourites}
                    >        
                        ❤️ Add to Favourites
                    </button>
                ) : (
                    <button 
                        aria-label="remove-from-favourites-button"
                        draggable
                        onDragStart={handleDragStart}
                        onClick={removeFromFavourites}
                    >
                        ❌ Remove from Favourites 
                    </button>
                )}
            </div>

            {/* ADD DROP ZONE */}
            {!isFavourite && (
                <div
                    className="add-drop-zone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropAdd}
                >
                    Drop here to add to favourites
                </div>
            )}

            {/* REMOVE DROP ZONE */}
            {isFavourite && (
                <div
                    className="remove-drop-zone"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropRemove}
                >
                    Drag here to remove from favourites
                </div>
            )}           

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
                               src={getImage(property.floorPlan)}
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
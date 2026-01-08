import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PropertyPage from "../pages/PropertyPage";

test("Property page loads correct property details", () => {
  const properties = [
    { id: "p1", 
      type: "House", 
      price: 300000, 
      location: "London", 
      description: "Test description", 
      images: [], 
      picture: null, 
    }
  ];

  render(
    <MemoryRouter initialEntries={["/property/p1"]}>
      <Routes>
        <Route
          path="/property/:id"
          element={
            <PropertyPage
              properties={properties}
              favourites={[]}
              setFavourites={() => {}}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/house/i)).toBeInTheDocument();
  expect(screen.getByText(/london/i)).toBeInTheDocument();
});

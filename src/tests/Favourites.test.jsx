import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import PropertyPage from "../pages/PropertyPage";

const mockProperty = {
  id: "p1",
  type: "House",
  price: 300000,
  location: "London",
  description: "",
  images: [],
  picture: null,
};

test("User can add property to favourites", () => {
  const setFavourites = vi.fn();

  render(
    <MemoryRouter initialEntries={["/property/p1"]}>
      <Routes>
        <Route
          path="/property/:id"
          element={
            <PropertyPage
              properties={[mockProperty]}
              favourites={[]}
              setFavourites={setFavourites}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(
    screen.getByLabelText("add-to-favourites-button")
  );

  expect(setFavourites).toHaveBeenCalled();
});

test("User can remove property from favourites", () => {
  const setFavourites = vi.fn();

  render(
    <MemoryRouter initialEntries={["/property/p1"]}>
      <Routes>
        <Route
          path="/property/:id"
          element={
            <PropertyPage
              properties={[mockProperty]}
              favourites={[mockProperty]}
              setFavourites={setFavourites}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(
    screen.getByLabelText("remove-from-favourites-button")
  );

  expect(setFavourites).toHaveBeenCalled();
});



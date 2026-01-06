import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ResultsPage from "../pages/ResultsPage";

test("Results page displays property cards", () => {
  render(
    <BrowserRouter>
      <ResultsPage
        filteredProperties={[
          {
            id: "p1",
            type: "House",
            price: 300000,
            bedrooms: 3,
            location: "London",
            description: "Nice house",
            picture: null,
          },
        ]}
        favourites={[]}
        setFavourites={() => {}}
      />
    </BrowserRouter>
  );

  expect(screen.getAllByText(/house/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/300,000/i)).toBeInTheDocument();
});

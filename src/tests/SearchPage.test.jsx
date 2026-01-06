import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import SearchPage from "../pages/SearchPage";

test("Search page renders property type select widget", () => {
  render(
    <BrowserRouter>
      <SearchPage
        properties={[]}
        setFilteredProperties={vi.fn()}
        favourites={[]}
        setFavourites={vi.fn()}
      />
    </BrowserRouter>
  );

  expect(
    screen.getByLabelText("property-type-select")
  ).toBeInTheDocument();
});

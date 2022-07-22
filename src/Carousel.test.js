import React from "react";
import { render,screen, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test('Renders  without crashing', () => {
  render(<Carousel/>)
})

test('It matched snapshot', () => {
const {asFragment} = render(<Carousel/>)
expect(asFragment()).toMatchSnapshot()
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


test('hide the arrows', ()=> {
  const {getByTestId} = render(<Carousel/>)
  const leftArrow = screen.getByTestId('left-arrow')
  const rightArrow = screen.getByTestId('right-arrow')

  expect (leftArrow).toHaveClass('Carousel-hide')
  expect (rightArrow).not.toHaveClass('Carousel-hide')

  fireEvent.click(rightArrow);
 expect(leftArrow).not.toHaveClass('Carousel-hide');
 expect(rightArrow).not.toHaveClass('Carousel-hide');

})

test('works when you click on the left arrow', () => {
  const { getByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  
  fireEvent.click(rightArrow);

  // move back to the left, expect the first image to show
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

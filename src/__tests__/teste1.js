import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App";
import SearchResult from "../views/SearchResult/SearchResult";

it("should have SãoPaulo in redirect", () => {
  const props = {
    match: {
      params: {
        city_id: "5fa0b349b20d4824443f6f2e",
      },
    },
    // city_id: "5fa0b349b20d4824443f6f2e",
  };
  console.log(props.match.params.city_id);
  const search = shallow(<SearchResult {...props} />);
  expect(toJson(search)).toMatchSnapshot();
});

import React from "react";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import Testing from "../Testing";
import SearchResult from "../views/SearchResult/SearchResult";
import ResultCard from "../views/SearchResult/SearchResult";

it("should have SãoPaulo in redirect", () => {
  const props = {
    match: {
      params: {
        city_id: "5fa0b349b20d4824443f6f2e",
      },
    },
  };
  const search = shallow(<ResultCard {...props} />);
  expect(toJson(search)).toMatchSnapshot();
});

it("should have nothing in redirect", () => {
  const props = {
    match: {
      params: {
        city_id: "",
      },
    },
  };
  const search = shallow(<ResultCard {...props} />);
  expect(toJson(search)).toMatchSnapshot();
});

import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App";
import SearchResult from '../views/SearchResult'

it("Should Have Description", () => {
  //console.log(props.match.params.city_id);
  const localStorage = {"description": "Boa noite"}
  const search = shallow(<SearchResult/>);
  expect(toJson(search)).toMatchSnapshot();
});

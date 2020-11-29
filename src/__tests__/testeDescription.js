import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App";
import Travels from '../views/Homepage/Travels';

it("Should Have Description", () => {
  
  //console.log(props.match.params.city_id);
  const localStorage = {"description": "Boa noite"}
  const search = shallow(<Travels/>);
  expect(toJson(search)).toMatchSnapshot();
});

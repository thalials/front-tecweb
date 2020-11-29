import React, { createContext } from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import App from "../App";
import SearchResult from "../views/SearchResult/SearchResult";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { CardActions, CardContent, Typography } from "@material-ui/core";
import ResultCard from "../views/SearchResult/Components/ResultCard";
import axios from "axios";
import api from "../API/Requests";


// jest.mock("axios", () => {
//   const mock = jest.fn().mockResolvedValue({ data: {} });
//   return {
//     create: mock,
//     get: mock,
//   };
// });

afterEach(cleanup);

it("should intercept the request with a load indicator", async () => {
  const props = {
    id: "5fa0b346b20d4824443f4f76",
  };

  jest.mock("../API/Requests");

  // axios.get.mockResolvedValue({});

  // await waitFor(() => expect(axios.create).toHaveBeenCalledTimes(0));

  const search = shallow(<ResultCard {...props} />);
  expect(toJson(search)).toMatchSnapshot();
});

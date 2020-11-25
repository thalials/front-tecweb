import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import Travels from '../views/Homepage/Travels/Travels';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';


import { Mms } from '@material-ui/icons';

test("should render text", () => {
    render(<Travels/>)

    const header = screen.getByText("Descrição");
    expect(header).toBeInTheDocument();
})

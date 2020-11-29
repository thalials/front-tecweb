import react from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Converter from "../views/Homepage/Converter/Converter";
import axios from 'axios';

afterEach(cleanup)


it("Ver se existe um botão para clicar", () => {

    const { getByText } = render(<Converter />);

    const convertBut = getByText("Converter");
    console.log(convertBut)
    expect(convertBut).toBeInTheDocument()

    const texto = getByText("0");
    console.log(texto)
    expect(texto).toBeInTheDocument()
})
import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
// import Typography from "@material-ui/core/Typography";
import "./style.css";
import { Typography, Button } from "@material-ui/core";

class Converter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      moedaA_valor: "",
      moedaB_valor: 0,
      moedaA: "",
      moedaB: ""
    };

    this.converter = this.converter.bind(this);
  }

  converter() {
    var axios = require("axios").default;

    var options = {
      method: 'GET',
      url: 'https://currency-converter13.p.rapidapi.com/convert',
      params: {from: this.state.moedaA, to: this.state.moedaB, amount: this.state.moedaA_valor},
      headers: {
        'x-rapidapi-key': 'aa394b6c07msh4aecdede9d91db9p156c6djsndda38dccc8b9',
        'x-rapidapi-host': 'currency-converter13.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(response => {
      this.setState({moedaB_valor: response.data.amount})
      console.log(response.data);
      
    }).catch(error => {
      this.setState({moedaB_valor: "moeda ou valor invalido"})
      console.error(error);
    });

  }

  render() {
    return (
      <div className="conversor">
        <div className="input-valor">
        <TextField
          id="standard-basic"
          label="Converter de"
          onChange={(event) => {
            this.setState({ moedaA: event.target.value });
          }}
        />
        </div>
        <div className="input-valor">
        <TextField
          id="standard-basic"
          label="Converter para"
          onChange={(event) => {
            this.setState({ moedaB: event.target.value });
          }}
        />
        </div>
        <div className="input-valor">
        <TextField
          id="standard-basic"
          label="Valor"
          onChange={(event) => {
            this.setState({ moedaA_valor: event.target.value });
          }}
        />
        </div>

        <div className="button">
        <Button
          color="default"
          variant="contained"
          onClick={this.converter}> 
          Converter 
        </Button>
        </div>

        <Typography >
          <div className="valor-convertido"> valor convertido: <div className="conversao"> {this.state.moedaB_valor} </div>  </div>
        </Typography>
      </div>
    );
  }
}
export default Converter;

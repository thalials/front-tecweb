import React, { Component } from "react";
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
    };

    this.converter = this.converter.bind(this);
  }

  converter() {
    let de_para = `${this.props.moedaA}_${this.props.moedaB}`;

    let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=20741cb2f37fb4f4958d`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        let cotacao = json[de_para];
        let moedaB_valor = (
          parseFloat(this.state.moedaA_valor) * cotacao
        ).toFixed(2);
        this.setState({ moedaB_valor });
      });
  }

  render() {
    return (
      <div className="conversor">
          <span className="title-conversor">
            <Typography>
            {this.props.moedaA} para {this.props.moedaB}
            </Typography>
          </span>

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

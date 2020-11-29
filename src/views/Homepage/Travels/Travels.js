import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  listUserPlaces,
  createQRCodeURI,
  toggleLike,
} from "../../../API/Requests";
import LoadingIndicator from "../../../Components/LoadingIndicator";
import Note from "../../../Components/Note";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import { CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ReactComponent as ReactLogo1 } from "../../../assets/instagram.svg";

import { getCityId } from "../../../Helpers";

import "./style.css";

const description = localStorage.getItem("description");

function Travels() {
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    listUserPlaces().then((placesArray) => {
      setPlaces(placesArray);
      setLoading(false);
    });
  }, []);

  return (
    <div className="outer">
      <div className="description-container">
        <div className="description-title">
          <p> Descrição do seu perfil</p>
        </div>
        <span className="description">{description}</span>
      </div>
      <div className="travels-outer-container">
        {loading ? (
          <LoadingIndicator width={30} />
        ) : (
          places.map((place) => <DisplayPlace key={place._id} place={place} />)
        )}
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
function DisplayPlace({ place }) {
  const { city, annotations, createdAt } = place;
  const { name, lat, lng, country } = city;
  const [cityName, setCityName] = useState(city.name);
  const [likedByMe, setLikedByMe] = useState(true);
  const [likes, setLikes] = useState(city.likes);
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(annotations);
  const emptyNotes = useRef(0);
  const splittedCityName = city?.name?.split(/\s/);

  const qrCodeURI = createQRCodeURI(window.location.href + "/" + city._id);
  const time = new Date().toLocaleString();

  const classes = useStyles();
  const acronym = city?.name
    ?.split(/\s/)
    ?.reduce((response, word) => (response += word.slice(0, 1)), "");

  function removeFromList(_id) {
    if (!_id) {
      setNotes((prev) => prev.slice(0, prev.length - 1));
      emptyNotes.current -= 1;
    } else {
      setNotes((prev) => prev.filter((note) => note._id !== _id));
    }
  }

  function addNote() {
    if (emptyNotes.current == 0) {
      emptyNotes.current += 1;
      setNotes(notes.concat([{ place: place._id, writable: true }]));
    }
  }

  function fixLastAdded(_id) {
    setNotes((prev) => {
      prev.slice(-1)._id = _id;
      return prev;
    });
    emptyNotes.current = 0;
  }

  return (
    <div className="places-card">
      <Card className="result-card-outer">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {acronym}
            </Avatar>
          }
          title={name}
          subheader={time}
        />

        <CardMedia className="city-map">
          <img
            src={`https://source.unsplash.com/800x300/?nature,outdoor,${splittedCityName.join(
              "+"
            )}`}
          />
        </CardMedia>

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Clique para ver mais detalhes desse lugar =)
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <div className="likes">
            <IconButton
              className="favorite"
              aria-label="add to favorites"
              onClick={() => {
                toggleLike(city._id);
                setLikedByMe(false);
                setLikes((prev) => prev - 1);
              }}
              color="secondary"
            >
              {likedByMe ? <Favorite /> : <FavoriteBorderOutlined />}
            </IconButton>
            {likes === 0
              ? "Ninguém curtiu essa cidade ainda"
              : likes === 1 && !likedByMe
              ? "Uma pessoa curtiu essa cidade"
              : likes === 1 && likedByMe
              ? "Apenas você curtiu essa cidade"
              : `${likes} pessoas curtiram essa cidade`}
          </div>

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={() => {
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph className="country-continent">
              <span className="label">Continente: </span>
              {country.continent.name}
            </Typography>

            <Typography paragraph className="country-name">
              <span className="label">País: </span>
              {country.name} ({country.native})
            </Typography>

            <Typography paragraph className="country-capital">
              <span className="label">Capital: </span>
              <Link to={getCityId(country.capital)}>{country.capital}</Link>
            </Typography>

            <Typography paragraph className="country-phone">
              <span className="label">Telefone (DDI): </span>+{country.phone}
            </Typography>

            {!!country.currency.length && (
              <div className="country-currency">
                <span className="label">Moeda(s) utilizada(s) nesse país:</span>
                <ul className="currency-list">
                  {country.currency.map((cur, index) => (
                    <li key={index} className="currency-item">
                      {`1 USD equivale a ${cur.price} ${cur.unit}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="country-languages">
              <span className="label">
                Linguagem(ns) utilizada(s) nesse país:
              </span>
              <ul className="language-list">
                {country.languages.map((item, index) => (
                  <li key={index} className="language-item">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>

            {notes.map((note) => (
              <Note
                key={note._id || "EmptyNote"}
                data={note}
                removeFromList={removeFromList}
                fixLastAdded={fixLastAdded}
                writable={note.writable || false}
              />
            ))}

            <div className="add-notes">
              <button onClick={addNote}>Adicionar uma nota</button>
            </div>

            <div className="print-share">
              <Link to={`/${city._id}`}>
                <img
                  src={qrCodeURI}
                  className="share-qrcode"
                  width="100"
                  height="100"
                />
              </Link>
              <IconButton aria-label="share" onClick={() => window.print()}>
                <ShareIcon />
              </IconButton>
              Compartilhe com seus amigos e amigas!
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default Travels;

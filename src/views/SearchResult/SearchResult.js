import React, { useEffect, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";
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
import { ReactComponent as ReactLogo } from "../../assets/logo_wiki.svg";
import { ReactComponent as ReactLogo1 } from "../../assets/instagram.svg";
import { ReactComponent as ReactLogo2 } from "../../assets/facebook.svg";
import { ReactComponent as ReactLogo3 } from "../../assets/panorama.svg";
import { ReactComponent as ReactLogo4 } from "../../assets/youtube.svg";
import { ReactComponent as ReactLogoMap } from "../../assets/info.svg";

import { createQRCodeURI, toggleLike, getCityInfo } from "../../API/Requests";
import { getCityId } from "../../Helpers";
import "./styles.css";
import Header from "../../Components/Header";
import LoadingIndicator from "../../Components/LoadingIndicator/LoadingIndicator";

function SearchResult(props) {
  console.log(props);
  const _id = props.match.params.city_id;

  return (
    <div>
      <Header />
      <section className="search-result-main">
        <ResultCard id={_id} />
      </section>
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

function ResultCard(props) {
  const { id } = props;
  const [city, setCity] = useState({});
  const [country, setCountry] = useState({});
  const [cityName, setCityName] = useState();
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [likedByMe, setLikedByMe] = useState(false);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(false);

  const qrCodeURI = createQRCodeURI(window.location.href);

  const splittedCityName = city?.name?.split(/\s/);
  const acronym = splittedCityName?.reduce(
    (response, word) => (response += word.slice(0, 1)),
    ""
  );

  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  async function handleLike() {
    toggleLike(id).then((placeIsLiked) => {
      setLikedByMe(placeIsLiked);
      if (placeIsLiked) {
        setLikes((prev) => prev + 1);
      } else {
        setLikes((prev) => prev - 1);
      }
    });
  }

  const curTime = new Date().toLocaleString();

  useLayoutEffect(() => {
    setLoading(true);
    (async () => {
      await getCityInfo(id)
        .then((city) => {
          setCountry(city.country);
          setCity(city);
          setLikes(city.likes);
          setLikedByMe(city.likedByMe);
          setCityName(city.name);
        })
        .catch(() => {
          setError(true);
        });
    })().then(() => {
      setLoading(false);
    });
  }, [id]);

  //   const city_name = city.name;
  //   const city_name_insta = city_name.replace(" ", "");

  return (
    <>
      {error ? (
        <EmptyFeedback />
      ) : loading ? (
        <LoadingIndicator width={30} />
      ) : (
        <div
          className="search-result-outer"
          style={{
            background: `url(https://source.unsplash.com/3200x1800/?landscape,${splittedCityName.join(
              "+"
            )})`,
            backgroundSize: "cover",
          }}
        >
          <div className="search-result-card">
            <Card className="result-card-outer">
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {acronym}
                  </Avatar>
                }
                title={city.name}
                subheader={curTime}
              />

              <CardMedia className="city-map">
                <iframe
                  src={`https://maps.google.com/maps?q=${city.lat}, ${city.lng}&z=12&output=embed`}
                  width="100%"
                  height="300px"
                  frameBorder="0"
                ></iframe>
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
                    onClick={handleLike}
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
                <p>oi</p>

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
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
                    Continent: {country.continent.name}
                  </Typography>

                  <Typography paragraph className="country-name">
                    <span className="label">País: </span>
                    Country: {country.name} ({country.native})
                  </Typography>

                  <Typography paragraph className="country-capital">
                    <span className="label">Capital: </span>
                    <Link to={getCityId(country.capital)}>
                      {country.capital}
                    </Link>
                  </Typography>

                  <Typography paragraph className="country-phone">
                    <span className="label">Telefone (DDI): </span>+
                    {country.phone}
                  </Typography>

                  {!!country?.currency?.length && (
                    <div className="country-currency">
                      <span className="label">
                        Moeda(s) utilizada(s) nesse país:
                      </span>
                      <ul className="currency-list">
                        {country.currency.map((cur, index) => (
                          <li key={index} className="currency-item">
                            {`1 USD equivale a ${cur.price} ${cur.unit}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Typography>
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
                  </Typography>

                  <div className="print-share">
                    <div className="wiki">
                      <img
                        src={qrCodeURI}
                        className="share-qrcode"
                        width="100"
                        height="100"
                      />

                      <a href={`https://pt.wikipedia.org/wiki/${city.name}`}>
                        <ReactLogo />
                      </a>
                      <a
                        href={`https://www.instagram.com/explore/tags/${cityName
                          .split(" ")
                          .join("")}/`}
                      >
                        <ReactLogo1 className="insta_logo" />
                      </a>
                      <a
                        href={`https://www.facebook.com/search/places/?q=${city.name}`}
                      >
                        <ReactLogo2 className="insta_logo" />
                      </a>
                      <a
                        href={`https://www.google.com/search?q=${city.name}+fotos+cidade&sxsrf=ALeKk01RQe-7Q4UgGrTXi8QaHjGgEu8LTg:1606083309236&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi-mYHJlpftAhV9F7kGHf0tCwUQ_AUoAnoECAUQBA&biw=1536&bih=722`}
                      >
                        <ReactLogo3 className="insta_logo" />
                      </a>
                      <a
                        href={`https://www.youtube.com/results?search_query=${city.name}+cidade`}
                      >
                        <ReactLogo4 className="insta_logo" />
                      </a>
                      <a href={`https://www.dicasdeviagem.com/?s=${city.name}`}>
                        <ReactLogoMap width={100} height={100} />
                      </a>
                    </div>
                    <IconButton
                      aria-label="share"
                      onClick={() => window.print()}
                    >
                      <ShareIcon />
                    </IconButton>
                    Compartilhe com seus amigos e amigas!
                  </div>
                </CardContent>
              </Collapse>
            </Card>{" "}
          </div>
        </div>
      )}
    </>
  );
}

function EmptyFeedback() {
  return <div>Não foi possível recuperar informações sobre esse lugar</div>;
}

export default SearchResult;

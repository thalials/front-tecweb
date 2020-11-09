import React, { useEffect, useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Header from '../../Components/Header';
import LoadingIndicator from '../../Components/LoadingIndicator/LoadingIndicator';
import { createQRCodeURI, toggleLike, getCityInfo } from '../../API/Requests';

import './styles.css';

function SearchResult(props) {
    const _id = props.match.params.city_id;

    return (
        <div>
            <Header />
            <section className='search-result-main'>
                <div className='search-result-outer'>
                    <div className='search-result-card'>
                        <ResultCard id={_id} />
                    </div>
                </div>
            </section>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345
    },
    media: {
        height: 0,
        paddingTop: '56.25%' // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: red[500]
    }
}));

function ResultCard(props) {
    const { id } = props;
    const [city, setCity] = useState({});
    const [country, setCountry] = useState({});
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(true);
    const [likedByMe, setLikedByMe] = useState(false);
    const [likes, setLikes] = useState(0);
    const [error, setError] = useState(false);

    const qrCodeURI = createQRCodeURI(window.location.href);

    const acronym = city?.name
        ?.split(/\s/)
        ?.reduce((response, word) => (response += word.slice(0, 1)), '');

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
                })
                .catch(() => {
                    setError(true);
                });
        })().then(() => {
            setLoading(false);
        });
    }, [id]);

    return (
        <>
            {error ? (
                <EmptyFeedback />
            ) : loading ? (
                <LoadingIndicator width={30} />
            ) : (
                <Card className='result-card-outer'>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label='recipe'
                                className={classes.avatar}>
                                {acronym}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label='settings'>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={city.name}
                        subheader={curTime}
                    />

                    <CardMedia className='city-map'>
                        <iframe
                            src={`https://maps.google.com/maps?q=${city.lat}, ${city.lng}&z=12&output=embed`}
                            width='100%'
                            height='300px'
                            frameBorder='0'></iframe>
                    </CardMedia>

                    <CardContent>
                        <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'>
                            Clique para ver mais detalhes desse lugar =)
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <div className='likes'>
                            <IconButton
                                className='favorite'
                                aria-label='add to favorites'
                                onClick={handleLike}
                                color='secondary'>
                                {likedByMe ? (
                                    <Favorite />
                                ) : (
                                    <FavoriteBorderOutlined />
                                )}
                            </IconButton>
                            {likes === 0
                                ? 'Ninguém curtiu essa cidade ainda'
                                : likes === 1 && !likedByMe
                                ? 'Uma pessoa curtiu essa cidade'
                                : likes === 1 && likedByMe
                                ? 'Apenas você curtiu essa cidade'
                                : `${likes} pessoas curtiram essa cidade`}
                        </div>

                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label='show more'>
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                            <Typography paragraph className='country-continent'>
                                Continent: {country.continent.name}
                            </Typography>

                            <Typography paragraph className='country-name'>
                                Country: {country.name} ({country.native})
                            </Typography>

                            <Typography paragraph className='country-capital'>
                                Capital: {country.capital}
                            </Typography>

                            <Typography paragraph className='country-phone'>
                                Phone: +{country.phone}
                            </Typography>

                            {!!country.currency.length && (
                                <Typography> 
                                <div className='country-currency'>
                                    Moeda(s) utilizada(s) nesse país:
                                    <ul className='currency-list'>
                                        {country.currency.map((cur, index) => (
                                            <li
                                                key={index}
                                                className='currency-item'>
                                                1 {cur.unit} equivale a USD{' '}
                                                {cur.price}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                </Typography>
                            )}
                            <Typography>
                            <div className='country-languages'>
                                Language(s):
                                <ul className='language-list'>
                                    {country.languages.map((item, index) => (
                                        <li
                                            key={index}
                                            className='language-item'>
                                            {item.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            </Typography>
                            <div className='print-share'>
                                <img
                                    src={qrCodeURI}
                                    className='share-qrcode'
                                    width='150'
                                    height='150'
                                />
                                <IconButton
                                    aria-label='share'
                                    onClick={() => window.print()}>
                                    <ShareIcon />
                                </IconButton>
                                Compartilhe com seus amigos e amigas!
                            </div>
                        </CardContent>
                    </Collapse>
                </Card>
            )}
        </>
    );
}

function EmptyFeedback() {
    return <div>Não foi possível recuperar informações sobre esse lugar</div>;
}

export default SearchResult;

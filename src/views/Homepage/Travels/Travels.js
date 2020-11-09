import React, { useRef, useState, useEffect } from 'react';

import { listUserPlaces } from '../../../API/Requests';
import LoadingIndicator from '../../../Components/LoadingIndicator';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
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

import { createQRCodeURI } from '../../../API/Requests';

import './style.css'

function Travels() {
    const [places, setPlaces] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        listUserPlaces().then((placesArray) => {
            setPlaces(placesArray);
            setLoading(false);
            // console.log(places.length);
        });
    }, []);

    return (
        <div className='travels-outer-container'>
            {loading ? (
                <LoadingIndicator width={30} />
            ) : (
                places.map((place) => <DisplayPlace place={place} />)
            )}
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
function DisplayPlace({ place }) {
    const { city, anotations, createdAt } = place;
    const { name, lat, lng, country } = city;
    const [likedByMe, setLikedByMe] = useState(true);
    const [likes, setLikes] = useState(city.likes);
    const [expanded, setExpanded] = useState(false);

    const qrCodeURI = createQRCodeURI(window.location.href);

    const classes = useStyles();
    const acronym = city?.name
        ?.split(/\s/)
        ?.reduce((response, word) => (response += word.slice(0, 1)), '');

    return (
        <div className='places-card'>
            <Card className='result-card-outer'>
                <CardHeader
                    avatar={
                        <Avatar aria-label='recipe' className={classes.avatar}>
                            {acronym}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label='settings'>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={city.name}
                    subheader={createdAt}
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
                            onClick={() => {
                                // handleLike
                            }}
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
                        onClick={() => {
                            setExpanded(!expanded);
                        }}
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
                        )}

                        <div className='country-languages'>
                            Language(s):
                            <ul className='language-list'>
                                {country.languages.map((item, index) => (
                                    <li key={index} className='language-item'>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
        </div>
    );
}

export default Travels;

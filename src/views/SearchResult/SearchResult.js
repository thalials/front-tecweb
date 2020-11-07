import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import axios from 'axios';
import Header from '../../Components/Header';
import LoadingIndicator from '../../Components/LoadingIndicator/LoadingIndicator';
import api from '../../api';

import './styles.css';
import { CardHeader } from '@material-ui/core';

function SearchResult(props) {
    const _id = props.match.params.city_id;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            await api
                .get(`/places/${_id}`)
                .then(async (res) => {
                    let currency = res.data.city.country.currency;
                    let currencyList = currency.join(',');
                    // extrair
                    await axios
                        .get(
                            `https://api.exchangeratesapi.io/latest?base=USD&symbols=${currencyList}`
                        )
                        .then(({ data }) => {
                            currency = currency.map((cur) => {
                                return {
                                    unit: cur,
                                    price: data.rates[cur].toFixed(2)
                                };
                            });
                            res.data.city.country.currency = currency;
                        });
                    setData(res.data);
                })
                .then(() => setLoading(false))
                .catch((err) => console.log(err));
        })();
    }, [_id]);

    return (
        <div>
            <Header />
            <section className="search-result-main">
                <div className='search-result-outer'>
                    <div className='search-result-card'>
                        {loading ? (
                            <LoadingIndicator width={30} />
                        ) : Object.entries(data).length ? (
                            <ResultCard data={data} />
                        ) : (
                                    <EmptyFeedback />
                                )}
                    </div>
                </div>
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
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function ResultCard(props) {
    const { city } = props.data;
    const { country, lat, lng, _id } = city;
    const acronym = city.name.split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [ count, setCount ] = useState(0);
    // const count = 0;
    const handleClickCount = () => {
        setCount(count + 1);
    };

    const curTime= new Date().toLocaleString();
      

    return (
        <Card className='result-card-outer'>

            <CardHeader
                avatar = {
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {acronym}
                    </Avatar>
                }
                action = {
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title = { city.name }
                subheader = { curTime } 
            />

            <CardMedia className='city-map'>
                <iframe
                    src={`https://maps.google.com/maps?q=${lat}, ${lng}&z=12&output=embed`}
                    width='100%'
                    height='300px'
                    frameborder='0'>
                </iframe>
            </CardMedia>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Clique para ver mais detalhes desse lugar =)
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                <div className='print-share'> 
                    <IconButton 
                    aria-label="add to favorites"
                    onClick = { handleClickCount }>
                        <FavoriteIcon />
                    </IconButton>
                    Liked by: { count }
                </div>
                
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

                    <Typography paragraph className='country-currency'>
                        Currency:
                        <ul className='currency-list'>
                            {country.currency.map((cur) => (
                                <li className='currency-item'>
                                    {cur.unit} - {cur.price}
                                </li>
                            ))}
                        </ul>
                    </Typography>

                    <Typography paragraph className='country-languages'>
                        Language(s):
                        <ul className='language-list'>
                            {country.languages.map((item) => (
                                <li className='language-item'>{item.name}</li>
                            ))}
                        </ul>
                    </Typography>
                    <div className='print-share'>
                        <IconButton aria-label="share"
                            onClick = {() => window.print() } >
                            <ShareIcon />
                        </IconButton>
                        Share this with your friends!
                    </div>               
                    
                </CardContent>
            </Collapse>
        </Card>
    );
}

function EmptyFeedback() {
    return <div>Nãofoi possível recuperar informações sobre esse lugar</div>;
}

const dummyData = {
    city: {
        _id: '5fa0b349b20d4824443f6f2e',
        name: 'São Paulo',
        lat: '-23.5475',
        lng: '-46.63611',
        country: {
            currency: ['BRL'],
            languages: [
                {
                    name: 'Portuguese',
                    native: 'Português',
                    initials: 'pt'
                }
            ],
            name: 'Brazil',
            native: 'Brasil',
            phone: '55',
            capital: 'Brasília',
            initials: 'BR',
            continent: {
                name: 'South America',
                initials: 'SA'
            }
        }
    }
};

export default SearchResult;

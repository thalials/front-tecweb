import React, { useRef, useState, useReducer } from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import LoadingIndicator from '../../../Components/LoadingIndicator';

// import { Container } from './styles';

function Travels() {
    const travel = useRef('');
    const handleSubmit = event => {
        event.preventDefault();
        // alert('You have submitted the form.');
        setSubmitting(true);

        // setTimeout(() => {
        //     setSubmitting(false);
        // }, 3000)
    }
    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const [submitting, setSubmitting] = useState(false);

    const formReducer = (state, event) => {
        return {
            ...state,
            [event.name]: event.value
        }
    }

    const [formData, setFormData] = useReducer(formReducer, {});

    return (
        <>
            {submitting &&
                <div>
                    You are submitting the following:
                <ul>
                        {Object.entries(formData).map(([name, value]) => (
                            <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                        ))}
                    </ul>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>Viagens anteriores</p>
                        <input name="name"
                            onChange={handleChange}
                        />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default Travels;
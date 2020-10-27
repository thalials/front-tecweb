import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function cadastrar() {
        const user = {
            name: name,
            email: email, 
            password: password
        };
    
        axios.post('http://localhost:3000/auth/register', user)
            .then(res => {
                console.log(res);
            }
                
            )
            .catch(erro => console.log(erro))
    }

    return (
    <div>
        <div> 
            Nome  <input onChange={(e) => setName(e.target.value)} type="text"/> 
        </div>
        <div> 
            Email <input onChange={(e) => setEmail(e.target.value)} type="email"/> 
        </div>
        <div> 
            Senha <input onChange={(e) => setPassword(e.target.value)} type="password"/> 
        </div>
        <button onClick= { cadastrar }> cadastrar </button>
    </div>    
        
    )

}
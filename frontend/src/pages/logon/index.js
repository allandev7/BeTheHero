import React, {useState} from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'
import { FiLogIn } from 'react-icons/fi'
import {Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

function Logon({ children }) {

    const [id, setId] = useState('');

    const history = useHistory();

    async function login (e){
        e.preventDefault();

        try {
            const resposta = await api.post('login', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', resposta.data.name);

            history.push('/profile');

        } catch (error) {
            alert("Não foi possivel fazer o login");
        }
    }


    return (
        <div className="logonContainer">
            <section className="form">


                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={login}>
                    <h1>Faça seu logon</h1>

                    <input type="text" placeholder="Sua ID" 
                    value={id}
                    onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link className="link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={herosImg} alt="Heroes" />
        </div>
    )
}

export default Logon;
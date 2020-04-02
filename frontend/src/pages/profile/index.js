import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import './styles.css'
import api from '../../services/api'
import { FiPower, FiTrash2 } from 'react-icons/fi'



export default function Profile() {

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(resp => {
            setIncidents(resp.data);
        })
    }, [ongId]);

    async function deletar (id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incidents => incidents.id!==id));
        } catch (error) {
            alert('Erro ao deletar caso')
        }
    }

    async function logout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profileContainer">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower onClick={logout} size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadstrados</h1>

            <ul>
                {incidents.map(caso => (
                    <li key={caso.id}>
                        <strong>CASO:</strong>
                        <p>{caso.title}</p>

                        <strong>DESCRIÇÃO: </strong>
                        <p>{caso.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(caso.value)}</p>

                        <button type="button">
                            <FiTrash2 onClick={() => deletar(caso.id)} size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
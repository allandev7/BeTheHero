import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import api from '../../services/api'

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function registrar(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data , {
                headers:{
                    Authorization: ongId,
                }
            });
            alert('Caso cadastrado com sucesso');
            history.push('/profile')
        } catch (error) {
            alert( 'Erro ao cadastrar caso');
        }
    }

    return (
        <div className="registerContainer">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrarmos o seu herói.</p>

                    <Link className="link" to="/profile">
                        <FiHome size={16} color="#E02041" />
                          Voltar para home
                    </Link>
                </section>
                <form onSubmit={registrar}>
                    <input placeholder="Titulo do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>)
}
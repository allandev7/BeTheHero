import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import { Link,useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

function Register({ children }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function cadastrar(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            cidade,
            uf
        };

        try {
            const resposta = await api.post('ongs', data);
            console.log(resposta);  
            alert(`Seu ID de Acesso ${resposta.data.id}`);
            history.push('/');
        } catch (error) {
            alert(`Erro no cadastro`);
        }

    }

    return (
        <div className="registerContainer">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={cadastrar}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsApp(e.target.value)} />

                    <div className="inputGroup">
                        <input placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)} />
                        <input placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{ width: 80 }} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
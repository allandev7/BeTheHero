import React, {useEffect, useState} from 'react';
import {Feather} from '@expo/vector-icons'
import { Text, View,Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents() {

  const [incident, setIncident] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);



  async function getDados(){

    if(loading ){
      return;
    }

    if(total> 0 && incident.length === total){
      return;
    }

    setLoading(true);

    const response = await api.get(`incidents?page=${page}`);

    setIncident([...incident, ...response.data]);
    setPage(page+1);
    setLoading(false);
    setTotal(response.headers['x-total-count']);
  }

  useEffect(()=>{
    getDados();
  },[])

  const navigation = useNavigation();

  function navigationToDetail(incident){
    navigation.navigate('Details', {incident});
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}/>
        <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>
              {total} casos.
            </Text>
        </Text>
      </View>

      <Text style={styles.title}>
        Bem Vindo!
      </Text>
      <Text style={styles.description}>Escolha um dos casos</Text>

      <FlatList
      style={styles.incidentsList}
      data={incident}
      keyExtractor={c => String(c.id)}
      onEndReached={getDados}
      onEndReachedThreshold={0.2} //quanto pro fim precisa
      showsVerticalScrollIndicator={false}
      renderItem={({item:x}) => (
        <View style={styles.incident}>
          <Text style={styles.incidentTitle}>
            ONG:
          </Text>
          <Text style={styles.incidentValue}>
            {x.name}
          </Text>

          <Text style={styles.incidentTitle}>
            Caso:
          </Text>
          <Text style={styles.incidentValue}>
            {x.title}
          </Text>

          <Text style={styles.incidentTitle}>
            Valor:
          </Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(x.value)}
          </Text>
          <TouchableOpacity style={styles.btnDetails} onPress={()=> navigationToDetail(x)}>
            <Text style={styles.txtBtn}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#E02041"/>
          </TouchableOpacity>
        </View>
      )}
      />
      </View>
  );
}

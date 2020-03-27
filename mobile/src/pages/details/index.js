import React from 'react';
import { Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
export default function Details() {
  const route = useRoute();
  const navigation = useNavigation();

  const incident = route.params.incident;
  const message = `Olá ${incident.name}, Estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)} `;
  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}` ,
      recipients: [incident.email],
      body: message
    })
  }

  function sendWhatsapp(params) {
    Linking.openURL(`whatsapp://send?phone=${incident.telefone}&text=${message}`)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={20} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentTitle, { marginTop: 0 }]}>
          ONG:
          </Text>
        <Text style={styles.incidentValue}>
          {incident.name} de {incident.cidade}/{incident.uf}
        </Text>

        <Text style={styles.incidentTitle}>
          Caso:
          </Text>
        <Text style={styles.incidentValue}>
          {incident.title}
        </Text>

        <Text style={styles.incidentTitle}>
          Valor:
          </Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o heroi deste caso.</Text>
        <Text style={styles.heroDescription}>Seja o heroi deste caso.</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => { sendWhatsapp() }} style={styles.action}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { sendEmail() }} style={styles.action}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour ajouter un utilisateur
  const addUser = async () => {
    try {
      const response = await fetch('http://localhost:8080/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Succès', 'Utilisateur ajouté avec succès');
      } else {
        Alert.alert('Erreur', result.message || 'Échec de l’ajout');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur s’est produite');
    }
  };

  // Fonction pour authentifier un utilisateur
  const authenticate = async () => {
    try {
      const response = await fetch('http://localhost:8080/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Succès', 'Authentification réussie');
      } else {
        Alert.alert('Erreur', result.message || 'Échec de l’authentification');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur s’est produite');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom d'utilisateur</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer le nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrer le mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Ajouter Utilisateur" onPress={addUser} />
        <Button title="S'authentifier" onPress={authenticate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;

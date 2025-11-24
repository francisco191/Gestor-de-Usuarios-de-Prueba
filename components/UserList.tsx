// Componente para mostrar la lista de usuarios
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function UserList({ usuarios, cargando, error }: any) {
  // Si está cargando, mostrar spinner
  if (cargando) {
    return (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Cargando...</Text>
      </View>
    );
  }

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <Text style={{ color: 'red', padding: 10, textAlign: 'center' }}>
        Error: {error}
      </Text>
    );
  }

  // Si no hay usuarios
  if (usuarios.length === 0) {
    return (
      <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
        No hay usuarios
      </Text>
    );
  }

  // Mostrar la lista
  return (
    <FlatList
      data={usuarios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.tarjeta}>
          <Text style={styles.nombre}>
            {item.first_name} {item.last_name}
          </Text>
          {item.email && (
            <Text style={{ color: '#555', fontSize: 14 }}>
              📧 {item.email}
            </Text>
          )}
          {item.job && (
            <Text style={{ color: '#007AFF', fontSize: 14, fontWeight: '600' }}>
              💼 {item.job}
            </Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});


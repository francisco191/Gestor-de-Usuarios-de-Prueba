// Formulario para crear usuarios
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserForm({ onCrearUsuario, cargando }: any) {
  const [nombre, setNombre] = useState('');
  const [trabajo, setTrabajo] = useState('');

  const handleSubmit = () => {
    // Validar que no estén vacíos
    if (!nombre.trim() || !trabajo.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    console.log('Enviando formulario:', nombre, trabajo);
    
    // Llamar la función que nos pasaron
    onCrearUsuario(nombre, trabajo);

    // Limpiar los campos
    setNombre('');
    setTrabajo('');
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Crear Nuevo Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        editable={!cargando}
      />

      <TextInput
        style={styles.input}
        placeholder="Trabajo (ej: Developer)"
        value={trabajo}
        onChangeText={setTrabajo}
        editable={!cargando}
      />

      <TouchableOpacity
        style={[
          styles.boton,
          (!nombre.trim() || !trabajo.trim() || cargando) && styles.botonDeshabilitado,
        ]}
        onPress={handleSubmit}
        disabled={!nombre.trim() || !trabajo.trim() || cargando}
      >
        <Text style={styles.textoBoton}>
          {cargando ? 'Creando...' : 'Crear Usuario'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  botonDeshabilitado: {
    backgroundColor: '#ccc',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, createUser } from '../../src/features/users/usersSlice.js';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';

export default function HomeScreen() {
  const dispatch = useDispatch<any>();
  const { items, status, error, currentPage, totalPages } = useSelector(
    (state: any) => state.users
  );

  // Estado para el toast de éxito
  const [mostrarToast, setMostrarToast] = useState(false);
  const [opacidadToast] = useState(new Animated.Value(0));

  // Cargar usuarios cuando inicia la app
  useEffect(() => {
    console.log('Cargando usuarios...');
    dispatch((fetchUsers as any)(1));
  }, []);

  // Función para mostrar el toast
  const mostrarMensajeExito = () => {
    setMostrarToast(true);
    
    // Animar entrada
    Animated.sequence([
      Animated.timing(opacidadToast, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacidadToast, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMostrarToast(false);
    });
  };

  // Función para crear usuario
  const handleCrearUsuario = (nombre: string, trabajo: string) => {
    console.log('Creando usuario:', nombre, trabajo);
    
    dispatch(
      (createUser as any)({
        name: nombre,
        job: trabajo,
      })
    );

    // Mostrar mensaje de éxito
    mostrarMensajeExito();
  };

  // Cambiar de página
  const cambiarPagina = (pagina: number) => {
    console.log('Cambiando a página', pagina);
    dispatch((fetchUsers as any)(pagina));
  };

  const cargando = status === 'loading';

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gestor de Usuarios de Prueba</Text>

      {/* Toast de éxito */}
      {mostrarToast && (
        <Animated.View
          style={[
            styles.toast,
            { opacity: opacidadToast },
          ]}
        >
          <Text style={styles.toastTexto}>✅ Usuario creado exitosamente</Text>
        </Animated.View>
      )}

      {/* Componente de lista */}
      <UserList usuarios={items} cargando={cargando} error={error} />

      {/* Botones de paginación */}
      {items.length > 0 && !cargando && (
        <View style={styles.paginacion}>
          <TouchableOpacity
            style={[
              styles.botonPagina,
              currentPage === 1 && { backgroundColor: '#ccc' },
            ]}
            onPress={() => cambiarPagina(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.textoBoton}>← Anterior</Text>
          </TouchableOpacity>

          <Text>
            Página {currentPage} de {totalPages}
          </Text>

          <TouchableOpacity
            style={[
              styles.botonPagina,
              currentPage === totalPages && { backgroundColor: '#ccc' },
            ]}
            onPress={() => cambiarPagina(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Text style={styles.textoBoton}>Siguiente →</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Componente de formulario */}
      <UserForm onCrearUsuario={handleCrearUsuario} cargando={cargando} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  toast: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  toastTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paginacion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  botonPagina: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: '600',
  },
});

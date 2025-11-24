// Redux slice para manejar usuarios
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  totalPages: 1,
};

// Traer usuarios de la API
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1) => {
    const response = await fetch(
      `https://reqres.in/api/users?page=${page}`,
      {
        headers: {
          'x-api-key': 'reqres-free-v1',
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

// Crear un nuevo usuario
export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUser) => {
    const response = await fetch(
      'https://reqres.in/api/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1',
        },
        body: JSON.stringify(newUser),
      }
    );
    const data = await response.json();
    console.log('Usuario creado:', data);
    return data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cuando está cargando
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      // Cuando se cargaron los usuarios
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      // Si hubo un error
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Crear usuario
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Agregar el usuario nuevo al principio
        const newUser = action.payload;
        const nombre = newUser.name.split(' ');
        state.items.unshift({
          id: newUser.id,
          first_name: nombre[0],
          last_name: nombre[1] || '',
          email: `${newUser.name.toLowerCase().replace(/\s/g, '.')}@example.com`,
          job: newUser.job,
        });
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiGet } from '../../api/pokemon';

const initialState = {};

export const pokemonGetOne = createAsyncThunk('pokemon/getOne', async (pokemon: string) => {
  const { data, status } = await apiGet(`/pokemon/${pokemon}`);

  if (status === 200) {
    return data;
  }
  return {};
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    create(state, action) {
      return action.payload;
    },
    clear() {
      return initialState;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(pokemonGetOne.pending, (state, action) => {
        console.log('Executou a requisição...');
      })
      .addCase(pokemonGetOne.fulfilled, (state, action) => {
        return action.payload;
      });
  }
});

export const { create, clear } = pokemonSlice.actions;
export default pokemonSlice.reducer;

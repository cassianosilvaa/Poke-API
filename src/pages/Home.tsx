import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { pokemonGetOne } from '../store/modules/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const Home: React.FC = () => {
  const [busca, setBusca] = useState<string>('');
  const pokemonRedux = useAppSelector(state => state.pokemon);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(pokemonGetOne('pikachu'));
  }, []);

  const handleClick = () => {
    console.log(busca);
  };
  return (
    <React.Fragment>
      <Typography variant="h1">Escolha um pokemon</Typography>
      <TextField label="buscar" onChange={ev => setBusca(ev.target.value)} value={busca || ''} />
      <Button variant="contained" onClick={handleClick}>
        Pesquisar
      </Button>
      <Paper elevation={2}>
        <Typography variant="h6">{pokemonRedux.name}</Typography>
        <img src={pokemonRedux.sprites.front_shiny} />
      </Paper>
    </React.Fragment>
  );
};

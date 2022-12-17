import { Button, Card, Container, List, ListItem, ListItemText, Paper, TextField, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { pokemonGetOne } from '../store/modules/pokemonSlice';

export const Home: React.FC = () => {
  const [busca, setBusca] = useState<string>('');
  const pokemonRedux = useAppSelector(state => state.pokemon);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(pokemonGetOne('pikachu'));
  // }, []);

  const handleClick = () => {
    if (busca.length > 2) {
      dispatch(pokemonGetOne(busca));
      console.log(pokemonRedux);
      return;
    }
    alert('Não foi encontrado.');
  };
  return (
    <>
      <Container sx={{ marginY: '50px', padding: '10px', width: '650px' }}>
        <Typography variant="h2" align="center">
          Escolha um pokemon
        </Typography>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item sx={{ display: 'flex', justifyContent: 'center' }} xs={9}>
            <TextField
              label="buscar"
              fullWidth
              sx={{ margin: '14px' }}
              onChange={ev => setBusca(ev.target.value)}
              value={busca || ''}
            />
          </Grid>
          <Grid item xs={3} alignItems={'center'}>
            <Button fullWidth variant="contained" onClick={handleClick}>
              Pesquisar
            </Button>
          </Grid>
        </Grid>
        {pokemonRedux.name && (
          <Paper
            elevation={2}
            sx={{
              border: '1px solid',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Card sx={{ width: 220, marginY: 5 }}>
              <CardMedia component="img" height="140" image={pokemonRedux?.sprites?.front_shiny} alt="" />
            </Card>
            <Typography textTransform={'uppercase'} variant="h6" fontWeight={'bold'}>{`O nome do Pokemon é: ${
              pokemonRedux.name || ''
            } `}</Typography>

            <List>
              <ListItem>
                <ListItemText primary={`Experiência base: ${pokemonRedux.base_experience}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Altura: ${pokemonRedux.height}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Peso: ${pokemonRedux.weight}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={'Habilidades:'}
                  secondary={
                    pokemonRedux.abilities &&
                    pokemonRedux?.abilities.map((item: any) => {
                      return <ListItem key={item.ability.url}>{item.ability.name}</ListItem>;
                    })
                  }
                />
              </ListItem>
            </List>
          </Paper>
        )}
      </Container>
    </>
  );
};

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Teste se página contém heading h2 com o texto Encountered pokémons', () => {
    const textContentPage = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(textContentPage).toBeInTheDocument();
  });
  it('Teste se o botão tem o texto Próximo pokémon', () => {
    const btnProxPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnProxPokemon).toBeInTheDocument();
    // https://testing-library.com/docs/react-testing-library/example-intro/
    expect(btnProxPokemon).toHaveTextContent(/próximo pokémon/i);
  });
  it('O proximo pokemon deve ser renderizado  a clicks consecutivos', () => {
    const pokemonInicial = screen.getByText(/pikachu/i);
    expect(pokemonInicial).toBeInTheDocument();
    const btnProxPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnProxPokemon);
    const pokemonCharmander = screen.getByText(/Charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();
    userEvent.click(btnProxPokemon);
    const pokemonCaterpie = screen.getByText(/Caterpie/i);
    expect(pokemonCaterpie).toBeInTheDocument();
    userEvent.click(btnProxPokemon);
    const pokemonEkans = screen.getByText(/Ekans/i);
    expect(pokemonEkans).toBeInTheDocument();
    userEvent.click(btnProxPokemon);
    const pokemonAlakazam = screen.getByText(/Alakazam/i);
    expect(pokemonAlakazam).toBeDefined();
    userEvent.click(btnProxPokemon);
    const pokemonMew = screen.getByAltText(/Mew/i);
    expect(pokemonMew).toBeDefined();
    userEvent.click(btnProxPokemon);
    const pokemonRapidash = screen.getByText(/Rapidash/i);
    expect(pokemonRapidash).toBeDefined();
    userEvent.click(btnProxPokemon);
    const pokemonSnorlax = screen.getByText(/Snorlax/i);
    expect(pokemonSnorlax).toBeDefined();
    userEvent.click(btnProxPokemon);
    const pokemonDragonair = screen.getByText(/Dragonair/i);
    expect(pokemonDragonair).toBeDefined();
    userEvent.click(btnProxPokemon);
    expect(pokemonInicial).toBeInTheDocument();
  });
  it('Teste se a Pokedex tem os botões de filtro', () => {
    const BTNUMEROS = 7;
    const botoesDeFiltro = screen.getAllByTestId('pokemon-type-button');
    expect(botoesDeFiltro).toHaveLength(BTNUMEROS);
  });
  it('Btn Tipo Selecioando, a Pokédex deve circular nos pokémons daquele tipo', () => {
    const btnFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(btnFire);
    const textPokemonCharmander = screen.getByText(/charmander/i);
    expect(textPokemonCharmander).toBeInTheDocument();
    const proximoPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(proximoPokemon);
    const textPokemonRapidash = screen.getByText(/Rapidash/i);
    expect(textPokemonRapidash).toBeInTheDocument();
  });
  it('O texto do botão deve corresponder ao nome do tipo', () => {
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[2]);
    expect(buttons[2]).toHaveTextContent(/Fire/i);
    const textoFire = screen.getByTestId('pokemon-type');
    expect(textoFire).toBeInTheDocument();
    expect(textoFire).toHaveTextContent('Fire');
  });
  it('O botão All deve está sempre visível ', () => {
    const buttons = screen.getAllByRole('button');
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(buttons[0]);
    expect(btnAll).toBeDefined();
    userEvent.click(buttons[1]);
    expect(btnAll).toBeDefined();
    userEvent.click(buttons[2]);
    expect(btnAll).toBeDefined();
    userEvent.click(buttons[3]);
    expect(btnAll).toBeDefined();
    userEvent.click(buttons[4]);
    expect(btnAll).toBeDefined();
    userEvent.click(buttons[5]);
    expect(btnAll).toBeDefined();
    userEvent.click(buttons[6]);
    expect(btnAll).toBeDefined();
    userEvent.click(buttons[7]);
    expect(btnAll).toBeDefined();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    // botão para resetar filtro é o all, vamos capturar o btnAll
    const btnAll = screen.getByRole('button', { name: /all/i });
    const btnProxPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const cardPikachu = screen.getByText(/pikachu/i);
    expect(cardPikachu).toBeDefined();
    userEvent.click(btnProxPokemon);
    const cardCharmander = screen.getByText(/Charmander/i);
    expect(cardCharmander).toBeDefined();
    userEvent.click(btnProxPokemon);
    const cardCaterpie = screen.getByText(/Caterpie/i);
    expect(cardCaterpie).toBeDefined();
  });
  it('Ao carregar a página, o filtro selecionado deverá ser All;', () => {
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
  });
});

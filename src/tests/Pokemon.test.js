import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela;', () => {
    renderWithRouter(<App />);
    const pokemonInicial = screen.getByText(/pikachu/i);
    expect(pokemonInicial).toBeInTheDocument();
  });

  it('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const typeEletric = screen.getByTestId('pokemon-type');
    expect(typeEletric).toHaveTextContent('Electric');
  });

  it('O peso médio | unidade de medida do pokemon', () => {
    renderWithRouter(<App />);
    const dadosPeso = screen.getByTestId('pokemon-weight');
    expect(dadosPeso).toHaveTextContent('Average weight: 6.0 kg');
  });
  it('Testar se a Img do Pokemon Renderiza, Ela deve conter atributo src', () => {
    renderWithRouter(<App />);
    const imagemPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imagemPokemon).toBeInTheDocument();
    expect(imagemPokemon).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagemPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste o card possui um link de navegacao', () => {
    renderWithRouter(<App />);
    const linkNavegacao = screen.getByRole('link', { name: /more details/i });
    expect(linkNavegacao).toBeInTheDocument();
    expect(linkNavegacao).toHaveAttribute('href', '/pokemons/25');
  });
  it('Teste se ao clicar no link é direcionado para a pag detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    const detail = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detail);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um incone estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText(/more details/i);
    userEvent.click(moreDetails);
    const checked = screen.getByRole('checkbox');
    userEvent.click(checked);
    const favorited = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
    expect(favorited).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});

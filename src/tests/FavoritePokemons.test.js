import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testando o Componente Favorites ', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    renderWithRouter(<FavoritePokemons />);
  });

  it('Teste se renderiza No favorite pokemon found, sem pokémons favoritos.', () => {
    const mensagem = screen.getByText(/no favorite pokemon found/i);
    expect(mensagem).toBeInTheDocument();
  });

  it('Teste se e exibido todos os cards de pokemons favoritados', () => {
    // 1 capture o botão electric
    const botaoElectric = screen.getByRole('button', { name: /electric/i });
    // em seguida click nele
    userEvent.click(botaoElectric);
    // verificar se o link More details renderiza na tela
    const linkMore = screen.getByRole('link', { name: /More details/i });
    expect(linkMore).toBeDefined();
    // em seguida clicar sobre ele
    userEvent.click(linkMore);
    // verifica se o campo Pokémon favoritado? renderiza
    const checked = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    // capitura o campo checked favorite e clica nele para marcar
    userEvent.click(checked);
    // verifica se o campo agora tá marcado
    // https://gitlab.cci.drexel.edu/mm4845/starlink-tracker/-/tree/ffcaa26266e40cf2da94139f74e08befba769077/front-end/node_modules/@testing-library/jest-dom
    expect(checked).toBeChecked();
    // em seguida verificar se tá checked

    // verificar se o link Favorite Pokémons renderiza na tela
    const linkFavotires = screen.getByRole('link', { name: /favorite pokémons/i });
    // clicar nele
    userEvent.click(linkFavotires);
    // verificar se o card pikachu renderiza na tela
    const pikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
  });
});

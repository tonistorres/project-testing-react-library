import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando Componente <App />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Testar se o primeiro link deve possuir o texto Home', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeDefined();
  });

  it('Testar se O segundo link deve possuir o texto About', () => {
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeDefined();
  });

  it('Testar se O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const linkFavorites = screen.getByRole('link', { name: /Favorite pokémons/i });
    expect(linkFavorites).toBeDefined();
  });

  it('Testar se Aplicacao e redirecionada Pagina inicial no clik link Home', () => {
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const textoNoDocumento = screen
      .getByRole('heading', { name: /encountered pokémons/i });
    expect(textoNoDocumento).toBeDefined();
  });

  it('Testar se Aplicacao e redirecionada Pagina About no clik link About', () => {
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const textoNoDocumento = screen
      .getByRole('heading', { name: /About Pokédex/i });
    expect(textoNoDocumento).toBeDefined();
  });

  it('Testar se App e redireciona P/ Favorites no clik link Favorites Pokemons', () => {
    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorites);
    const textoNoDocumento = screen
      .getByText(/no favorite pokemon found/i);
    expect(textoNoDocumento).toBeDefined();
  });

  it('Rota inexistente navaga Not Fund', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/_rotainexistente_');
    const imagemNoDocumento = screen
      .getByRole('img',
        { name: /pikachu crying because the page requested was not found/i });
    expect(imagemNoDocumento).toBeDefined();
  });
});

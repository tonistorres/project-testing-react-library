import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o Componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const paragrafOne = screen
      .getByText(/this application simulates a pokédex,/i);
    const paragrafoTwo = screen
      .getByText(/One can filter Pokémons by type/i);
    const imagemDocumento = screen.getByRole('img', { name: /pokédex/i });
    expect(paragrafOne).toBeDefined();
    expect(paragrafoTwo).toBeDefined();
    expect(imagemDocumento).toBeDefined();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const titleAbout = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(titleAbout).toBeDefined();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragrafoUm = screen.getByText(/This application simulates a Pokédex/i);
    const paragrafoDois = screen.getByText(/Pokémons by type, and see more details/i);
    expect(paragrafoUm).toBeInTheDocument();
    expect(paragrafoDois).toBeInTheDocument();
  });
  // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
  it('Teste se o link da img descrito na const é o mesmo rederizado na page ', () => {
    const LINKASERTESTADO = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const linkimg = screen.getByRole('img', { name: /pokédex/i });
    expect(linkimg.src).toBe(LINKASERTESTADO);
  });
});

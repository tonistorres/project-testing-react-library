import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testar o Componente NotFound', () => {
  it('Página contém heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/_rotainexistente_');
    const textContentPage = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(textContentPage).toBeInTheDocument();
  });

  it('Testa se a página  renderiza o link do gif abaixo explicitado', () => {
    renderWithRouter(<NotFound />);
    // Capturando a imagem do documento
    const IMGIFPAGE = screen
      .getByRole('img',
        { name: /pikachu crying because the page requested was not found/i });
    // Definindo uma constante para o link a ser testado
    const IMGIFTEST = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    // Verificando se a imagem do pikachu renderiza na tela
    expect(IMGIFTEST).toBeDefined();
    // Verificando se a imagem renderizada no documento é identica  ao à imagem pré disposta no link
    expect(IMGIFPAGE.src).toBe(IMGIFTEST);
  });
});

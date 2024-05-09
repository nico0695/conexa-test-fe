import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Home from '../app/page.client';

import characters from './__mocks__/characters.json';

const charactersDataMock: any = characters;

const charactersListMock = charactersDataMock.results;

describe('App Render', () => {
  afterEach(cleanup);
  beforeEach(() => {
    const { container } = render(
      <Home initialCharacters={charactersDataMock} />
    );

    expect(container).toBeInTheDocument();
  });

  it('should render App', () => {
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toHaveTextContent('Rick and Morty - Conexa');
  });

  it('should render CharacterList', () => {
    // Check list render
    const characterLists = screen.getAllByTestId('character-list');

    expect(characterLists).toHaveLength(2);

    expect(characterLists[0]).toBeInTheDocument();
    expect(characterLists[1]).toBeInTheDocument();

    const characterList0 = characterLists[0].children[0].children;
    const characterList1 = characterLists[1].children[0].children;

    expect(characterList0).toHaveLength(6);
    expect(characterList1).toHaveLength(6);

    expect(characterList0[0]).toHaveTextContent(charactersListMock[0].name);
    expect(characterList1[0]).toHaveTextContent(charactersListMock[0].name);
  });

  it('should render EpisodesList', () => {
    const episodesCharacter1 = screen.getByText('Select character #1');
    const episodesCharacter2 = screen.getByText('Select character #2');
    const episodesListsBoth = screen.getByText('Select characters');

    expect(episodesCharacter1).toBeInTheDocument();
    expect(episodesCharacter2).toBeInTheDocument();
    expect(episodesListsBoth).toBeInTheDocument();

    // Validate table 1 render
    const parentEpisodesCharacter1 = episodesCharacter1.parentElement;
    const table1 = parentEpisodesCharacter1?.querySelector('table');
    expect(table1).toBeInTheDocument();
    expect(table1?.querySelector('tbody')?.children).toHaveLength(1);
    expect(
      table1?.querySelector('tbody')?.children[0].children[0]
    ).toHaveTextContent('No episodes found');
  });
});

describe('Select Characters', () => {
  afterEach(cleanup);
  beforeEach(() => {
    render(<Home initialCharacters={charactersDataMock} />);
  });

  it('should select characters', () => {
    const charactersLists = screen.getAllByTestId('character-list');

    expect(charactersLists).toHaveLength(2);

    const characterList1 = charactersLists[0].children[0].children;
    const characterList2 = charactersLists[1].children[0].children;

    expect(characterList1[0]).not.toHaveClass('selected');
    expect(characterList2[0]).not.toHaveClass('selected');

    expect(characterList1[0]).not.toHaveClass('disabled');
    expect(characterList2[0]).not.toHaveClass('disabled');

    // Select character 1
    fireEvent.click(characterList1[0]);

    expect(characterList1[0]).toHaveClass('selected');
    expect(characterList2[0]).not.toHaveClass('selected');

    expect(characterList1[0]).not.toHaveClass('disabled');
    expect(characterList2[0]).toHaveClass('disabled');

    // Dont select same character again
    fireEvent.click(characterList2[0]);

    expect(characterList1[0]).toHaveClass('selected');
    expect(characterList2[0]).not.toHaveClass('selected');

    // Select character 2
    fireEvent.click(characterList2[1]);

    expect(characterList1[1]).not.toHaveClass('selected');
    expect(characterList2[1]).toHaveClass('selected');

    expect(characterList1[1]).toHaveClass('disabled');
    expect(characterList2[1]).not.toHaveClass('disabled');
  });

  it('should render episodes', () => {
    const charactersLists = screen.getAllByTestId('character-list');

    expect(charactersLists).toHaveLength(2);

    const characterList1 = charactersLists[0].children[0].children;
    const characterList2 = charactersLists[1].children[0].children;

    // Select character 1
    fireEvent.click(characterList1[0]);
    expect(characterList1[0]).toHaveClass('selected');

    // Select character 2
    fireEvent.click(characterList2[1]);
    expect(characterList2[1]).toHaveClass('selected');

    const episodesCharacter1 = screen
      .getAllByText(charactersListMock[0].name)
      .at(-1);
    const episodesCharacter2 = screen
      .getAllByText(charactersListMock[1].name)
      .at(-1);
    const episodesListsBoth = screen
      .getAllByText(
        `${charactersListMock[0].name} & ${charactersListMock[1].name}`
      )
      .at(-1);

    expect(episodesCharacter1).toBeInTheDocument();
    expect(episodesCharacter2).toBeInTheDocument();
    expect(episodesListsBoth).toBeInTheDocument();

    // Validate table 1 render
    const parentEpisodesCharacter1 = episodesCharacter1?.parentElement;
    const table1 = parentEpisodesCharacter1?.querySelector('table');
    expect(table1).toBeInTheDocument();
    expect(table1?.querySelector('tbody')?.children).toHaveLength(1);
    expect(
      table1?.querySelector('tbody')?.children[0].children[0]
    ).toHaveTextContent('No episodes found');

    // Validate table 2 render
    const parentEpisodesCharacter2 = episodesCharacter2?.parentElement;
    const table2 = parentEpisodesCharacter2?.querySelector('table');
    expect(table2).toBeInTheDocument();
    expect(table2?.querySelector('tbody')?.children).toHaveLength(1);
    expect(
      table2?.querySelector('tbody')?.children[0].children[0]
    ).toHaveTextContent('No episodes found');

    // Validate table 3 render
    const parentEpisodesListsBoth = episodesListsBoth?.parentElement;
    const table3 = parentEpisodesListsBoth?.querySelector('table');
    expect(table3).toBeInTheDocument();
    expect(table3?.querySelector('tbody')?.children).toHaveLength(1);
    expect(
      table3?.querySelector('tbody')?.children[0].children[0]
    ).toHaveTextContent('No episodes found');
  });
});

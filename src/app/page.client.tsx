'use client';
import { useState } from 'react';

import styles from './page.module.scss';
import CharacterList from './components/CharacterList/CharacterList';
import { ICharacter, ICharacterList } from '@/interfaces/characters.interfaces';
import EpisodesList from './components/EpisodesList/EpisodesList';

enum SelectsKey {
  character1 = 'character1',
  character2 = 'character2',
}

type CharactersSelected = {
  [key in SelectsKey]: ICharacter | null;
};

export default function Home({
  initialCharacters,
}: {
  initialCharacters: ICharacterList;
}) {
  const [charactersSelected, setCharactersSelected] =
    useState<CharactersSelected>({
      character1: null,
      character2: null,
    });

  const handleSelected = (key: SelectsKey) => {
    return (character: ICharacter) => {
      setCharactersSelected({
        ...charactersSelected,
        [key]: character,
      });
    };
  };

  const commonTitle = Object.values(charactersSelected)
    .map((character) => character?.name)
    .join(' & ');
  const commonEpisodes = charactersSelected.character1?.episodeIds.filter(
    (episodeId) =>
      !charactersSelected.character2 ||
      charactersSelected.character2?.episodeIds.includes(episodeId)
  );

  return (
    <main className={styles.main}>
      <h1>Rick and Morty - Conexa</h1>

      {initialCharacters && (
        <>
          <div className={styles.charactersContainer}>
            <CharacterList
              initialCharacters={initialCharacters}
              characterSelected={charactersSelected.character1?.id}
              onSelect={handleSelected(SelectsKey.character1)}
              characterDisabled={charactersSelected.character2?.id}
            />

            <CharacterList
              initialCharacters={initialCharacters}
              characterSelected={charactersSelected.character2?.id}
              onSelect={handleSelected(SelectsKey.character2)}
              characterDisabled={charactersSelected.character1?.id}
            />
          </div>

          <div className={styles.episodesContainer}>
            <EpisodesList
              title={
                charactersSelected.character1?.name ?? 'Select character #1'
              }
              episodesId={charactersSelected.character1?.episodeIds}
            />

            <EpisodesList title={commonTitle} episodesId={commonEpisodes} />

            <EpisodesList
              title={
                charactersSelected.character2?.name ?? 'Select character #2'
              }
              episodesId={charactersSelected.character2?.episodeIds}
            />
          </div>
        </>
      )}
    </main>
  );
}

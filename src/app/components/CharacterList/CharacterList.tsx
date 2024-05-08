'use client';
import React, { useMemo, useState } from 'react';

import Image from 'next/image';

import { ICharacter, ICharacterList } from '@/interfaces/characters.interfaces';

import styles from './characterList.module.scss';
import { getCharacters } from '@/services/characters.services';
import { CharacterStatus } from '@/constants/characters.constants';

interface ICharacterListProps {
  initialCharacters: ICharacterList;
  characterSelected?: number;
  onSelect: (character: ICharacter) => void;
  characterDisabled?: number;
}

const pageSize = 6;

const statusClass = {
  [CharacterStatus.Alive]: 'alive',
  [CharacterStatus.Dead]: 'dead',
  [CharacterStatus.unknown]: 'unknown',
};

const CharacterList = (props: ICharacterListProps) => {
  const { initialCharacters, characterSelected, onSelect, characterDisabled } =
    props;

  const [characters, setCharacters] = useState(initialCharacters.results);
  const [requestInfo, setRequestInfo] = useState(initialCharacters.info);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    const newPage = page + 1;
    setPage(newPage);

    if (characters.length < (newPage * pageSize + 6) && requestInfo.next !== null) {
      setIsLoading(true);

      const response = await getCharacters(newPage);
      setCharacters((prevCharacters) => [
        ...prevCharacters,
        ...response.results,
      ]);
      setRequestInfo(response.info);

      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    setPage(page - 1);
  };

  const rowsToRender = characters.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={styles.container}>
      <div className={styles.listGrid}>
        {rowsToRender.map((character) => (
          <div
            key={character.id}
            className={`${styles.characterCard} ${
              character.id === characterSelected ? styles.selected : ''
            } ${character.id === characterDisabled ? styles.disabled : ''}`}
            onClick={() => onSelect(character)}
          >
            <Image
              src={character.image}
              alt={character.name}
              width={100}
              height={100}
              objectFit="contain"
            />

            <div className={styles.characterInfo}>
              <h4>{character.name}</h4>

              <p>
                <span
                  className={`${styles.statusDot} ${
                    statusClass[character.status]
                  }`}
                />
                {character.status} - {character.species}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.paginationManager}>
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={handleNext}
          disabled={requestInfo.next === null || isLoading}
        >
          Next 
        </button>
      </div>
    </div>
  );
};

export default CharacterList;

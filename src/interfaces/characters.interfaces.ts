import { CharacterStatus } from '@/constants/characters.constants';

export interface ICharacter {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  image: string;
  episodeIds: number[];
}

export interface ICharacterInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface ICharacterList {
  info: ICharacterInfo;
  results: ICharacter[];
}

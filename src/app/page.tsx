import { getCharacters } from '@/services/characters.services';

import Home from './page.client';

const fetchCharacters = async () => {
  const response = await getCharacters(1);

  return response;
};

export default async function HomeContainer() {
  const initialCharacters = await fetchCharacters();

  return <Home initialCharacters={initialCharacters} />;
}

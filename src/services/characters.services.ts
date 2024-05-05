import { config } from '@/constants/shared.constants';
import {
  ICharacter,
  ICharacterInfo,
  ICharacterList,
} from '@/interfaces/characters.interfaces';
import { GraphQLClient, gql } from 'graphql-request';

const charactersQuery = gql`
  query ($page: Int!) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        image
        episode {
          id
        }
      }
    }
  }
`;

interface ICharacterExtraInfo {
  episode: Array<{ id: number }>;
}

export const getCharacters = async (page: number): Promise<ICharacterList> => {
  try {
    const graphQLClient = new GraphQLClient(config.graphQLUrl);

    const response = await graphQLClient.request<{
      characters: {
        info: ICharacterInfo;
        results: Array<ICharacter & ICharacterExtraInfo>;
      };
    }>(charactersQuery, {
      page,
    });

    const data = response.characters.results.map((character) => {
      const newCharacter: ICharacter = {
        ...character,
        episodeIds: character.episode.flatMap((episode) => episode.id),
      };

      return newCharacter;
    });

    return {
      info: response.characters.info,
      results: data,
    };
  } catch (error) {
    throw new Error('Error fetching characters');
  }
};

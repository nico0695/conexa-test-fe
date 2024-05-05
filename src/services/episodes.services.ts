import { config } from '@/constants/shared.constants';
import { IEpisode } from '@/interfaces/episodes.interfaces';
import { GraphQLClient, gql } from 'graphql-request';

const episodesQuery = gql`
  query ($ids: [ID!]!) {
    episodesByIds(ids: $ids) {
      id
      name
      air_date
    }
  }
`;

export const getEpisodesByCharacters = async (
  episodesId: number[]
): Promise<IEpisode[]> => {
  try {
    const graphQLClient = new GraphQLClient(config.graphQLUrl);

    const response = await graphQLClient.request<{
      episodesByIds: IEpisode[];
    }>(episodesQuery, {
      ids: episodesId,
    });

    return response.episodesByIds;
  } catch (error) {
    throw new Error('Error fetching episodes');
  }
};

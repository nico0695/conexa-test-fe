import '@testing-library/jest-dom';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import EpisodesList from './EpisodesList';
import { getEpisodesByCharacters } from '../../../services/episodes.services';

import episodesMock from '../../../__tests__/__mocks__/episodes.json';

jest.mock('../../../services/episodes.services', () => ({
  getEpisodesByCharacters: jest.fn(),
}));

describe('EpisodesList', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render without episodes', async () => {
    await act(async () => {
      (getEpisodesByCharacters as jest.Mock).mockResolvedValue(episodesMock);

      render(<EpisodesList episodesId={[]} />);
    });

    expect(screen.getByText('No episodes found')).toBeInTheDocument();
  });

  it('should render with episodes list', async () => {
    await act(async () => {
      (getEpisodesByCharacters as jest.Mock).mockResolvedValue(episodesMock);

      render(<EpisodesList episodesId={[1, 2]} />);
    });

    expect(await screen.findByText(episodesMock[0].name)).toBeInTheDocument();
    expect(await screen.findByText(episodesMock[1].name)).toBeInTheDocument();
  });

  it('should render loading spinner', async () => {
    await act(async () => {
      (getEpisodesByCharacters as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(episodesMock), 1000);
          })
      );
      render(<EpisodesList episodesId={[1, 2]} />);
    });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByText(episodesMock[0].name)).not.toBeInTheDocument();
    expect(screen.queryByText(episodesMock[1].name)).not.toBeInTheDocument();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await screen.findByText(episodesMock[0].name);
    expect(screen.getByText(episodesMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(episodesMock[1].name)).toBeInTheDocument();
  });
});

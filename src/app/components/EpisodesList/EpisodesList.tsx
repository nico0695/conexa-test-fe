'use client';
import React, { useEffect, useState } from 'react';

import { IEpisode } from '@/interfaces/episodes.interfaces';
import { getEpisodesByCharacters } from '@/services/episodes.services';

import styles from './episodesList.module.scss';
import Loading from '@/components/Loading/Loading';

interface IEpisodesListProps {
  title?: string;
  episodesId?: number[];
}

const EpisodesList = (props: IEpisodesListProps) => {
  const { episodesId, title } = props;

  const [episodesList, setEpisodesList] = useState<IEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setIsLoading(true);
        if (episodesId && episodesId.length > 0) {
          const response = await getEpisodesByCharacters(episodesId);

          setEpisodesList(response);
        }
      } catch {
        setEpisodesList([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (episodesId) {
      fetchEpisodes();
    }
  }, [episodesId]);

  return (
    <div className={styles.episodesContainer}>
      <h4 className={styles.title}>{title ?? '-'}</h4>
      <div className={styles.tableContainer}>
        {isLoading && (
          <div className={styles.loaderContainer}>
            <Loading />
          </div>
        )}

        <table className={styles.episodesTable}>
          <thead>
            <tr>
              <th>Episode</th>
              <th>Name</th>
              <th>Air Date</th>
            </tr>
          </thead>
          <tbody>
            {episodesList.map((episode) => (
              <tr key={episode.id}>
                <td>{episode.id}</td>
                <td>{episode.name}</td>
                <td>{episode.air_date}</td>
              </tr>
            ))}

            {episodesList.length === 0 && (
              <tr>
                <td className={styles.notFound} colSpan={3}>No episodes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EpisodesList;

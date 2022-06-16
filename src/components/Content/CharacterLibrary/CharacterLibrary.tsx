import {CharacterCard} from './CharacterCard';
import styles from './characterLibrary.module.scss';
import {useEffect, useState} from 'react';

export type Character = {
  id: number,
  name: string,
  species: string,
  gender: string,
  location: {
    name: string,
    url: string,
  },
  episode: Array<string>,
  status: string,
  created: string,
  image: string
};

const basicCharacterListLink = 'https://rickandmortyapi.com/api/character/?page=0';

export const CharacterLibrary = () => {
  const [listOfCharacters, setListOfCharacters] = useState<Character[]>([]);
  const [nextPageToFetch, setNextPageToFetch] = useState<string>('');
  const [needToFetchNewCharacters, setNeedToFetchNewCharacters] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(basicCharacterListLink);
        if (response.ok) {
          const json = await response.json();
          setListOfCharacters(json.results);
          setNextPageToFetch(json.info.next);
        }
      } catch (error) {
        // somehow process an error
      }
    }

    fetchCharacters();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
        setNeedToFetchNewCharacters(true);
      }
    };
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(nextPageToFetch);
        if (response.ok) {
          const json = await response.json();
          setListOfCharacters(prevListOfCharacters => {
            return [
              ...prevListOfCharacters,
              ...json.results
            ]
          });
          setNextPageToFetch(json.info.next);
        }
      } catch (error) {
        // somehow process an error
      }
    }

    if (needToFetchNewCharacters && nextPageToFetch) {
      fetchCharacters();
      setNeedToFetchNewCharacters(false);
    }
  }, [needToFetchNewCharacters, nextPageToFetch]);

  return (
    <div className={styles.library}>
      {
        listOfCharacters.map(el => <CharacterCard key={el.id} characterData={el}/>)
      }
    </div>
  );
};

import {CharacterCard} from '../CharacterCard';
import styles from './characterLibrary.module.scss';
import {useEffect, useState} from 'react';
import {Placeholder} from '../../Placeholder';
import {CharacterForList} from 'tsHelper';
import {getFormattedList} from 'services/getFormatedList';

const baseURLToFetch = 'https://rickandmortyapi.com/api/character/?page=1';

export const CharacterLibrary = () => {
  const [listOfCharacters, setListOfCharacters] = useState<CharacterForList[]>([]);
  const [nextPageToFetch, setNextPageToFetch] = useState<string>('');
  const [needToFetchNewCharacters, setNeedToFetchNewCharacters] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(baseURLToFetch);
        if (response.ok) {
          const json = await response.json();
          const formattedList = getFormattedList(json.results);
          setListOfCharacters(formattedList);
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

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(nextPageToFetch);
        if (response.ok) {
          const json = await response.json();
          const formattedList = getFormattedList(json.results);
          setListOfCharacters(prevListOfCharacters => {
            return [
              ...prevListOfCharacters,
              ...formattedList
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
    listOfCharacters.length
      ?
      <div className={styles.library}>
        {
          listOfCharacters.map(el => <CharacterCard key={el.id} characterData={el}/>)
        }
      </div>
      :
      <Placeholder text={'Loading...'}/>
  );
};

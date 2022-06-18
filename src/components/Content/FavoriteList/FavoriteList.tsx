import {useEffect, useState} from 'react';
import styles from '../CharacterLibrary/characterLibrary.module.scss';
import {CharacterCard} from '../CharacterCard';
import {Placeholder} from '../../Placeholder';
import {CharacterForList} from 'tsHelper';
import {getFormattedList} from 'services/getFormatedList';

const getLikedIds = () => {
  return Object.entries(localStorage).reduce<string[]>((acc: string[], el: [string, any]): string[] => {
    if (!isNaN(Number(el[0])) && el[1] === 'liked') {
      acc.push(el[0]);
    }
    return acc;
  }, []);
};

const baseURLToFetch = 'https://rickandmortyapi.com/api/character/';

export const FavoriteList = () => {
  const [listOfCharacters, setListOfCharacters] = useState<CharacterForList[]>([]);
  const [placeholderText, setPlaceholderText] = useState<string>('Loading...')

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(baseURLToFetch + (likedIds.join(',')));
        if (response.ok) {
          const json = await response.json();
          const formattedList: CharacterForList[] = getFormattedList(Array.isArray(json) ? json : [json]);
          setListOfCharacters(formattedList);
        }
      } catch (error) {
        // somehow process an error
      }
    }

    const likedIds = getLikedIds();
    if (likedIds.length) {
      fetchCharacters();
    } else {
      setPlaceholderText('Your favorite list is empty');
    }
  }, []);

  return (
    listOfCharacters.length
      ?
      <div className={styles.library}>
        {
          listOfCharacters.map(el => <CharacterCard key={el.id} characterData={el}/>)
        }
      </div>
      :
      <Placeholder text={placeholderText}/>
  );
};

import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Nullable} from 'tsHelper';
import styles from './characterInfo.module.scss';
import {Placeholder} from '../../Placeholder';

const baseURLToFetch = 'https://rickandmortyapi.com/api/character/';

type Character = {
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

export const CharacterInfo = () => {
  const [characterData, setCharacterData] = useState<Nullable<Character>>(null);
  const [placeholderText, setPlaceholderText] = useState<string>('Loading...');
  const {characterId} = useParams<{characterId: string}>();

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setCharacterData(null);
        const response = await fetch(baseURLToFetch + characterId);
        if (response.ok) {
          const json = await response.json();
          if (json.id) {
            setCharacterData(json);
          }
        } else {
          setPlaceholderText('There is no such character');
        }
      } catch (error) {
        // somehow process an error
      }
    }

    fetchCharacter();
  }, [characterId]);

  return (
    characterData
      ?
      <div className={styles.container}>
        <h2 className={styles.name}>{characterData.name}</h2>
        <div className={styles.info}>
          <img className={styles.img} src={characterData.image} alt="character"/>
          <div className={styles.textInfo}>
            <p className={styles.textInfoItem}>
              <span className={styles.nameOfKey}>Species: </span>
              {characterData.species}
            </p>
            <p className={styles.textInfoItem}>
              <span className={styles.nameOfKey}>Gender: </span>
              {characterData.gender}
            </p>
            <p className={styles.textInfoItem}>
              <span className={styles.nameOfKey}>Location: </span>
              {characterData.location.name}
            </p>
            <p className={styles.textInfoItem}>
              <span className={styles.nameOfKey}>Episodes: </span>
              {characterData.episode.map((el, index, arr) => {
                const episodeNum = el.match(/[0-9]+$/)?.[0];
                return (index < arr.length - 1) ? `${episodeNum}, ` : episodeNum;
              })}
            </p>
            <p className={styles.textInfoItem}>
              <span className={styles.nameOfKey}>Status: </span>
              {characterData.status}
            </p>
            <p className={styles.textInfoItem}>
              <span className={styles.nameOfKey}>Created: </span>
              {(new Date(characterData.created)).toUTCString()}
            </p>
          </div>
        </div>
      </div>
      :
      <Placeholder text={placeholderText}/>
  )
};

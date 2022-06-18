import {Autocomplete, TextField} from '@mui/material';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Nullable} from 'tsHelper';
import {useNavigate} from 'react-router-dom';
import styles from './search.module.scss';

type Character = {
  id: number,
  name: string
};

type CharacterLabeled = {
  id: number,
  label: string
};

const baseURLToFetch = 'https://rickandmortyapi.com/api/character/?name=';

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<CharacterLabeled[]>([]);
  const [needToFetchData, setNeedToFetchData] = useState<string>('');

  let filterTimeout = useRef<Nullable<ReturnType<typeof setTimeout>>>(null);

  const navigate = useNavigate();

  const handleInputChange = (event: SyntheticEvent<Element, Event>, value: string) => {
    setInputValue(value);

    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current)
    }
    if (!value) {
      return;
    }

    filterTimeout.current = setTimeout(() => {
      setNeedToFetchData(value);
    }, 500)
  }

  const handleChange = (event: SyntheticEvent<Element, Event>, elem: Nullable<CharacterLabeled>) => {
    if (elem) {
      navigate(`/character/${elem.id}`);
    }
  }

  useEffect(() => {
    async function fetchCharacter(value: string) {
      try {
        const response = await fetch(baseURLToFetch + value);
        if (response.ok) {
          const json = await response.json();
          if (json.results) {
            setOptions(json.results.map((el: Character) => {
              return {
                id: el.id,
                label: el.name
              }
            }));
          }
        }
      } catch (error) {
        // somehow process an error
      }
    }

    if (needToFetchData) {
      fetchCharacter(needToFetchData);
      setNeedToFetchData('');
    }
  }, [needToFetchData])

  return (
    <Autocomplete
      className={styles.search}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      blurOnSelect
      options={options}
      sx={{ width: 200 }}
      isOptionEqualToValue={(option, value) => {
        const {id: optionId} = option as CharacterLabeled;
        const {id: valueId} = value as CharacterLabeled;
        return optionId === valueId;
      }}
      renderOption={(props, option) => {
        const {id, label} = option as CharacterLabeled;
        return (
          <li {...props} key={id}>
            {label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Search"/>}
    />
  );
};

import {Autocomplete, TextField} from '@mui/material';
import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Nullable} from 'tsHelper';
import {useNavigate} from 'react-router-dom';

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
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<CharacterLabeled[]>([]);
  const [needToFetchData, setNeedToFetchData] = useState<string>('');

  let filterTimeout = useRef<Nullable<ReturnType<typeof setTimeout>>>(null);

  const navigate = useNavigate();

  const handleChangeInput = (event: SyntheticEvent<Element, Event>, value: string) => {
    setInputValue(value);

    if (filterTimeout.current) {
      clearTimeout(filterTimeout.current)
    }
    if (!value) {
      setOpen(false);
      return;
    }

    filterTimeout.current = setTimeout(() => {
      setNeedToFetchData(value);
    }, 500)
  }

  const handleListClick = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setInputValue('');
    setOpen(false);
    navigate(`/character/${id}`);
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

  useEffect(() => {
    if (!open && inputValue) {
      setOpen(true);
    }
  }, [open, inputValue]);

  return (
    <Autocomplete
      open={open}
      inputValue={inputValue}
      onInputChange={handleChangeInput}
      disablePortal
      options={options}
      sx={{ width: 230 }}
      isOptionEqualToValue={(option, value) => {
        const {id: optionId} = option as CharacterLabeled;
        const {id: valueId} = value as CharacterLabeled;
        return optionId === valueId;
      }}
      renderOption={(props, option) => {
        const {id, label} = option as CharacterLabeled;
        return (
          <li {...props} key={id} onClick={(event) => {handleListClick(event, id)}}>
            {label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Search"/>}
    />
  );
};

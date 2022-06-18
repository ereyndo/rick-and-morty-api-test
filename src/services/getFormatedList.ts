import {CharacterForList} from 'tsHelper';

export const getFormattedList = (characters: CharacterForList[]) => {
  return characters.map((el) => {
    return {
      id: el.id,
      name: el.name,
      status: el.status,
      image: el.image,
    }
  });
};

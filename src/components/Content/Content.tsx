import { Routes, Route, Navigate } from 'react-router-dom';
import { CharacterInfo } from './CharacterInfo';
import { CharacterLibrary } from './CharacterLibrary';
import styles from './content.module.scss';
import { FavoriteList } from './FavoriteList';

export const Content = () => {
  return (
    <main className={styles.content}>
      <Routes>
        <Route path='/' element={<CharacterLibrary/>}/>
        <Route path='/my-list' element={<FavoriteList/>}/>
        <Route path='/character/:characterId' element={<CharacterInfo/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </main>
  );
};

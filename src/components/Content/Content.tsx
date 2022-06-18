import { Routes, Route, Navigate } from 'react-router-dom';
import { CharacterInfo } from './CharacterInfo';
import { CommonList } from './CommonList';
import styles from './content.module.scss';
import { FavoriteList } from './FavoriteList';

export const Content = () => {
  return (
    <main className={styles.content}>
      <Routes>
        <Route path='/' element={<CommonList/>}/>
        <Route path='/liked-characters' element={<FavoriteList/>}/>
        <Route path='/character/:characterId' element={<CharacterInfo/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </main>
  );
};

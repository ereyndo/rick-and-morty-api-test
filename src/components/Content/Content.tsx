import { Routes, Route, Navigate } from 'react-router-dom';
import { CharacterInfo } from './CharacterInfo';
import { CharacterLibrary } from './CharacterLibrary';
import styles from './content.module.scss';

export const Content = () => {
  return (
    <main className={styles.content}>
      <Routes>
        <Route path='/' element={<CharacterLibrary pageName='home'/>}/>
        {/*<Route path='/my-list' element={<CharacterLibrary pageName='my-list'/>}/>*/}
        <Route path='/character/:characterId' element={<CharacterInfo/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </main>
  );
};

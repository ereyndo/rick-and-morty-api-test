import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import styles from './characterCard.module.scss';
import {useNavigate} from 'react-router-dom';

type CharacterCardProps = {
  characterData: Character
};

type Character = {
  id: number,
  name: string,
  status: string,
  image: string
}

export const CharacterCard = ({characterData}: CharacterCardProps) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/character/${characterData.id}`);
  };

  return (
    <Card sx={{ maxWidth: 280 }} style={{backgroundColor: "#a0c064"}} onClick={handleClick}>
      <CardActionArea className={styles.cardActionArea}>
        <CardMedia
          component="img"
          height="300"
          image={characterData.image}
          alt="card with a character"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {characterData.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {characterData.status}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

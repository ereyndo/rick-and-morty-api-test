import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styles from './characterCard.module.scss';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

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
  const [thumbUp, setThumbUp] = useState<boolean>(false);
  const [thumbDown, setThumbDown] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/character/${characterData.id}`);
  };

  const handleThumbUpClick = () => {
    setThumbDown(false);
    setThumbUp((prevState => !prevState));
  };

  const handleThumbDownClick = () => {
    setThumbUp(false);
    setThumbDown((prevState => !prevState));
  };

  return (
    <Card sx={{ maxWidth: 280 }} style={{backgroundColor: "#a0c064"}} className={styles.card}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="280"
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
      <CardActions className={styles.cardLikeTool}>
        <IconButton aria-label='thumb up' color={thumbUp ? 'success' : 'default'} onClick={handleThumbUpClick}>
          <ThumbUpIcon/>
        </IconButton>
        <IconButton aria-label='thumb down' color={thumbDown ? 'error' : 'default'} onClick={handleThumbDownClick}>
          <ThumbDownIcon/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

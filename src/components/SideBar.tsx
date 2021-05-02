import React, { useEffect, useState } from 'react'
import { api } from '../services/api';
import { Button } from './Button'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface useStateProps{
  selectedGenreId: number;
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
}

export function SideBar(props:useStateProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }


  return(
    <nav className="sidebar">
          <span>Watch<p>Me</p></span>
  
          <div className="buttons-container">
            {genres.map(genre => (
              <Button
                id={String(genre.id)}
                title={genre.title}
                iconName={genre.name}
                onClick={() => handleClickButton(genre.id)}
                selected={props.selectedGenreId === genre.id}
              />
            ))}
          </div>
  
        </nav>
  )
}
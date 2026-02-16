import React from 'react';
import './AlbumArt.css';

interface Props {
  imageUrl: string;
  title: string;
  artist?: string;
}

const AlbumArt: React.FC<Props> = ({ imageUrl, title, artist = 'Arctic Monkeys' }) => {
  return (
    <div className="album-art">
      <img src={'https://amg.storage.iran.liara.space/album-cover.jpg'} alt={title} className="album-art__image" />
      <div className="album-art__overlay">
        <h2 className="album-art__title">{title}</h2>
        <p className="album-art__artist">{artist}</p>
      </div>
    </div>
  );
};

export default AlbumArt;
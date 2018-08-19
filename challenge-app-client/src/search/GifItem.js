import React from 'react';

const GifItem = (giphyurl) => {
  return (
    <li>
      <img src={giphyurl} />
    </li>
  )
};

export default GifItem;
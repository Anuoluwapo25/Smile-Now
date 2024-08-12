import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
      {/* List item for each card */}
      <li className='cards__item'>
        {/* Link that wraps the entire card, navigates to the specified path */}
        <Link className='cards__item__link' to={props.path}>
          {/* Wrapper for the card's image with a data-category attribute for label */}
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            {/* Image element for the card */}
            <img
              className='cards__item__img'
              alt={props.label} // Alt text for accessibility
              src={props.src} // Source URL for the image
            />
          </figure>
          {/* Container for card's text information */}
          <div className='cards__item__info'>
            {/* Text content of the card */}
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;

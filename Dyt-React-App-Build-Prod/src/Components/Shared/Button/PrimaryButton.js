import React from 'react';
import { BackChev } from '../Svg/Svg';
import './PrimaryButton.scss';

const PrimaryButton = ({ message, color, width, className, backButton, onBackClick, onPrimaryClick, onKeyPress, id }) => {

  return (

    <div className='container-fuild shared-primary-button'>
      <div className='row mr-2'>
        <div className='btn-holder'>

          {backButton && <button onClick={onBackClick} className='primary-button-navigate-back mt-3 ' > {BackChev}</button>}
          <a href='#' className='a-btn'>
            <button
              className={`${className?.length > 0 ? ` mt-3 primary-button ${className}` : "mt-4 primary-button"}`}
              value='button'
              style={{ background: color, width: width }}
              onClick={onPrimaryClick}
              onKeyPress={onKeyPress}
              type='submit'
              id={id}
            >
              {message}
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default PrimaryButton;
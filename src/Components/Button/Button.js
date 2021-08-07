  
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


export default function Button ({ title, onButtonClick }) {
    useEffect(()=>{
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
    }, []);

    return ( 
    <div className="ButtonPosition">
      <button type='button' className="Button" onClick={onButtonClick}>
        {title}
      </button>
    </div>
    )
  
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};


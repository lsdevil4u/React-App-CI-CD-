import React, { useState } from 'react';
import './InputText.scss';

const InputText = (
  {
    type, placeholder, value, width, name, validation, onChange, validationTitle, pattern, maxLength, errorMessage, id, onKeyUp, className, disabled, style
    , onKeyDownCapture
  }
) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  }
  return (
    <div className='InputFields'>
      <div className='m-auto'>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          id={id}
          className={`${className?.length > 0 ? `input-field ${className}` : "input-field"}`}
          width={width}
          onChange={onChange}
          name={name}
          pattern={pattern}
          maxLength={maxLength}
          // required
          onBlur={handleFocus}
          focused={focused.toString()}
          onKeyUp={onKeyUp}
          disabled={disabled}
          style={style}
          onKeyDownCapture={onKeyDownCapture}
        />
        <span className='error-msg'>{errorMessage}</span>
        {/* <span id='name-error'>name</span> */}
      </div>
      {
        validation === true && <p className="mt-1 ml-0 validation">{validationTitle}</p>
      }
    </div>
  )
}

export default InputText;
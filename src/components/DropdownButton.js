import React, { useState } from 'react';


function DropdownButton(props) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <button onClick={handleButtonClick}>{props.title}</button>
      {isDropdownVisible && (
        <>
          {props.content}
        </>
      )}
    </>
  );
}

export default DropdownButton;
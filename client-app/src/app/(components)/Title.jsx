import React from 'react'

function Title({title,alignment}) {

    const baseStyle = "mt-10 text-sm sm:text-2xl/9 font-bold tracking-tight text-gray-900";
  return (
    <h2 className={`${baseStyle} ${alignment}`}>
      {`${title}`}
    </h2>
  );
}

export default Title
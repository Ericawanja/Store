import React from 'react'
import {createPortal} from 'react-dom';

function Portal({children}) {
  return  createPortal(
    <div>{children}</div>, 
    document.getElementById('portal-root')
  )
}

export default Portal
import React from 'react';
import { Link } from 'gatsby'

const urlResolution = (value) => `/${value+1}`;

export default (props) => {
  if (!props.pages) {
    return;
  }

  return <ul className="paging no-list">
    {Array.from({length:props.pages}, (value, index) => (
      <li className="paging--item">
        {index+1 === props.selected ?
          <span>{index+1}</span> :
        <Link to={props.urlFunc ? props.urlFunc(index) : urlResolution(index)}>{index+1}</Link>}
      </li>
      ))}
  </ul>
}
import React from 'react';
import { Link } from 'gatsby'

const urlResolution = (value) => `/${value+1}`;

export default (props) => {
  if (!props.pages) {
    return;
  }

  return <ul>
    {Array.from({length:props.pages}, (value, index) => (
      <li><Link to={props.urlFunc ? props.urlFunc(index) : urlResolution(index)}>{index+1}</Link></li>
      ))}
  </ul>
}
import React from 'react';
import PreviewCompatibleImage from '../PreviewCompatibleImage';
import { Link } from 'gatsby'

export default (props) => (
<li className="bg-secondary list-item">
  <article className="flex vcenter">
    { props.image && <div className="list-item--image">
      <PreviewCompatibleImage imageInfo={props.image} width={120}/>
    </div> }
    <div className="grow content">
      <div className="small list-item--date">{props.date}</div>
      <Link className="has-text-primary" to={props.slug}>
        <h3>{props.title}</h3>
      </Link>
      <p className="small">
        {props.excerpt}
      </p>
    </div>
  </article>
</li>)
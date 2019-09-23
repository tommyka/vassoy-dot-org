import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const SideMenu = ( {list} ) => {
  return <div className="menu">
    <h3>Andre nyheter</h3>
    { (list && list.length !== 0) &&
      <ul className="flat-list">
        { list.map((item) => <li key={item.fields.slug} className="sidemenu--item">
          <Link to={item.fields.slug}>{item.frontmatter.title}</Link>
          <div className="small">{item.frontmatter.date}</div>
        </li>)}
      </ul>
    }
  </div>
}

SideMenu.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    frontmatter: PropTypes.object
  }))
}

export default SideMenu

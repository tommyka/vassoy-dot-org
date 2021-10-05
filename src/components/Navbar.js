import React from "react";
import { Link } from "gatsby";

const Navbar = class extends React.Component {
  render() {
    return (
      <header className="topbar bg-secondary">
        <div className="container flex vcenter">
          <div className="topbar--site-title no-grow">
            <Link to="/">Vassoy.org</Link>
          </div>
          <nav className="grow align-right">
            <ul className="flat-list topbar--navigation">
              <li>
                <Link to="/beredskap">Beredskap</Link>
              </li>
              <li>
                <Link to="/ferje">Ferje</Link>
              </li>
              <li>
                <Link to="/utleie">Utleie</Link>
              </li>
              <li>
                <Link to="/foreninger">Foreninger</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  /*
    <li v-for="item in items" v-bind:key="item.title">
            <a :href="item.link">{{item.title}}</a>
          </li>
  */
};

export default Navbar;

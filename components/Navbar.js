import React from "react";
import Link from "./Link";

function Navbar() {
  let links = {
    Home: "/",
    Tetris: "/tetris",
    Sudoku: "/sudoku",
    Chess: "/chess"
  };
  return (
    <nav>
      <ul>
        {Object.keys(links).map((item, index) => (
          <li key={`link-${index}`}>
            <Link href={links[item]}>
              <a>{item}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        nav {
          height: 100%;
          width: 100px;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #fff;
          //   border-right: 1px solid black;
          overflow-x: hidden;
          padding-top: 50px;
          white-space: nowrap;
        }

        nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* Only stick if you can fit */
        @media (min-height: 300px) {
          nav ul {
            position: sticky;
            top: 0;
          }
        }
        nav ul li a {
          display: block;
          padding: 0.5rem 1rem;
          color: black;
          text-decoration: none;
        }

        nav ul li a.selected {
          background: #63c;
          color: white;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;

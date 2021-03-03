import React, { useRef } from "react";
import useOutsideAlerter from "../hooks/useOutsideAlerter";
import Link from "./Link";

function Navbar({ links }) {
  const [open, setOpen] = React.useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setOpen(false));

  return (
    <div ref={wrapperRef}>
      <nav id="navigation">
        <p style={{ fontSize: "50px", margin: "0px", zIndex: 1 }}>&#128142;</p>
        <p style={{ fontSize: "70px", margin: "0px", marginTop: "-90px" }}>
          &#128080;
        </p>
        <ul>
          {Object.keys(links).map((item, index) => (
            <li key={`link-${index}`}>
              <Link href={item}>
                <a>{links[item].route}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button onClick={() => setOpen(!open)}>
        {open ? (
          <img src="/close.svg" alt="close icon" />
        ) : (
          // <object data="/close.svg" type="image/svg+xml"></object>
          <img src="/burger.svg" alt="open icon" />
          // <object data="/burger.svg" type="image/svg+xml"></object>
        )}
      </button>
      <style jsx>{`
        nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          width: 130px;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #fff;
          overflow-x: hidden;
          padding-top: 30px;
          white-space: nowrap;
        }

        nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
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
        button {
          width: 40px;
          height: 40px;
          display: none;
          font-size: 25px;
          // background: #63c;
          background: #282c34;
          color: #9ecaed;
          margin: 25px 15px 15px 15px;
          border-radius: 7px;
          border: 0px;
          position: absolute;
          right: 0;
          z-index: 100;
        }
        img {
          width: 100%;
          height: 100%;
          z-index: 200;
          color: #9ecaed;
        }
        @media only screen and (max-width: 600px) {
          nav {
            transform: translate(
              ${open ? "0px" : "-130px"}
            ); /* just to show a little */
            transition: 0.2s;
          }
          button {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Navbar;

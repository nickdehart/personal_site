import React from "react";
import Link from "./Link";
import Image from "next/image";

function Navbar({ links }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
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
          // <Image src={`/close.svg`} alt="close icon" width={35} height={35} />
          <img src="/burger.svg" alt="open icon" />
          // <Image src={`/burger.svg`} alt="open icon" width={35} height={35} />
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
          color: white;
          margin: 25px 15px 15px 15px;
          border-radius: 7px;
          border: 0px;
          position: absolute;
          right: 0;
        }
        img {
          width: 100%;
          height: 100%;
          z-index: 999;
          color: white;
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
    </>
  );
}

export default Navbar;

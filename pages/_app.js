import React from "react";
import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
// import { useInterval } from "../hooks/tetris/useInterval";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  let links = {
    "/": { route: "Home", header: "" },
    "/tetris": { route: "Tetris", header: "ReacTetris" },
    "/sudoku": { route: "Sudoku", header: "React Sudoku" },
    "/chess": { route: "Chess", header: "React Chess" },
    "/minesweeper": { route: "Minesweeper", header: "React Minesweeper" }
  };
  // const [price, setPrice] = React.useState([]);

  // useInterval(() => {
  //   getPrice();
  // }, 30000);

  // const getPrice = () => {
  //   fetch("/api/getPrice")
  //     .then(response => response.json())
  //     .then(data => {
  //       setPrice(data);
  //     });
  // };

  return (
    <>
      <Head>
        <title>Nicholas DeHart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar links={links} />
      <header
        className="App-header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
          // height: "20px",
        }}
      >
        {/* <div className="marquee">
          <span>{`GME - ${price.GME ? price.GME : "-"}`}</span>
        </div>
        <div className="marquee marquee2">
          <span>{`AMC - ${price.AMC ? price.AMC : "-"}`}</span>
        </div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "10px"
          }}
        >
          <img src="/logo.svg" className="App-logo" alt="logo" />
          <b>{links[router.pathname].header}</b>
        </div>
      </header>
      <Component {...pageProps} />
      <style jsx>{`
        .marquee {
          padding: 5px 0px 5px 0px;
          margin: 0 auto;
          top: 2px;
          white-space: nowrap;
          overflow: hidden !important;
          position: absolute;
          width: 100% !important;
          font-family: Pixel, Arial, Helvetica, sans-serif;
          color: palegoldenrod;
        }

        .marquee span {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 10s linear infinite;
          font-family: Pixel, Arial, Helvetica, sans-serif;
        }

        .marquee2 span {
          animation-delay: 5s;
        }

        @keyframes marquee {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-100%, 0);
          }
        }
      `}</style>
    </>
  );
}

export default MyApp;

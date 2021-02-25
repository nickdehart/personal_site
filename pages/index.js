import React from "react";
import styles from "../styles/Home.module.css";
import Linechart from "../components/gme/Linechart";
import { useInterval } from "../hooks/tetris/useInterval";

export default function Home() {
  const [price, setPrice] = React.useState([]);

  useInterval(() => {
    getPrice();
  }, 30000);

  const getPrice = () => {
    fetch("/api/getPrice")
      .then(response => response.json())
      .then(data => {
        let joined = price.concat(data);
        if (joined.length > 25) joined.shift();
        setPrice(joined);
      });
  };

  console.log(price);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.grid}>
          {/* <h1 className={styles.title}>The Saga of GME</h1> */}
          <div className={styles.grid}>{/* <Linechart /> */}</div>
        </div>
      </main>
    </div>
  );
}

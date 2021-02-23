import styles from "../styles/Home.module.css";
import Linechart from "../components/gme/Linechart";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>The Saga of GME!</h1>
          <div className={styles.grid}>
            <Linechart />
          </div>
        </div>
        <img
          src="/d_hands.jpg"
          style={{ maxHeight: "573px", maxWidth: "458px" }}
        ></img>
      </main>
    </div>
  );
}

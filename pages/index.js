import styles from "../styles/Home.module.css";

export default function Home() {
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

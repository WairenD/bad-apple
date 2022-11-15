import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";

let columns = Math.floor(document.body.clientWidth / 50);
let rows = Math.floor(document.body.clientHeight / 50);

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.tiles}></div>
    </div>
  );
}

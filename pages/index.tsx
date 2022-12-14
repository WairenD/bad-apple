import router from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.scss";

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    "https://crudcrud.com/api/358c094f2ce647588e4832bc2bf94485/movie"
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

//Handle props
type Props = {
  data: any;
};

//remove data by ID from endpoint
const deleteMovie = async (movieId: string) => {
  const endpoint = process.env.BASE_URL + "/movie/" + movieId;
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  router.push("/");
};

const compare = (a: any, b: any) => {
  if (a.ageRating < b.ageRating) {
    return -1;
  }
  if (a.ageRating > b.ageRating) {
    return 1;
  }
  return 0;
};

export default function Home({ data }: Props) {
  console.log(process.env.BASE_URL);
  const [isSort, setIsSort] = useState(false);
  console.log(isSort);

  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        {/*add movie button*/}
        <button
          className={styles.button}
          onClick={() => {
            router.push("/add");
          }}>
          Film hozzáadása
        </button>
      </div>
      <div className={styles.btnContainer}>
        {/*sort movies button*/}
        <button
          className={styles.button}
          onClick={() => {
            setIsSort(true);
          }}>
          Szűrés korhatár szerint
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Cím</th>
            <th>Korhatár</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Render out all the movies */}
          {data.sort(isSort ? compare : undefined).map((movie: any) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.ageRating}</td>
              <td
                className={styles.button}
                onClick={() => deleteMovie(movie._id)}>
                X
              </td>
              <td
                className={styles.button}
                onClick={() => router.push("/" + movie._id)}>
                Szerkesztés
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

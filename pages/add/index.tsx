import router from "next/router";
import styles from "./add.module.scss";

const handleSubmit = async (event: any) => {
  event.preventDefault();

  //create data object
  const data = {
    title: event.target.title.value,
    description: event.target.description.value,
    ageRating: Number(event.target.ageRating.value),
  };

  const endpoint = process.env.BASE_URL + "/movie";
  //send data to endpoint
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    alert("Sikeresen hozáadtál egy filmet a listához!");
    router.push("/");
  });
};

export default function Add() {
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Cím:</label>
        <input type="text" id="title" name="title" />
        <label htmlFor="description">Leírás:</label>
        <textarea maxLength={255} id="description" name="description" />
        <label htmlFor="ageRating">Korhatár:</label>
        <select defaultValue={6} id="ageRating" name="ageRating">
          <option value="18">18</option>
          <option value="16">16</option>
          <option value="12">12</option>
          <option value="6">6</option>
        </select>
        <button className={styles.button} type="submit">
          Elküldés
        </button>
      </form>
    </div>
  );
}

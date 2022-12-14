import router, { useRouter } from "next/router";
import styles from "pages/add/add.module.scss";
import { useState } from "react";

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { id } = params;
  // Fetch data from external API
  const res = await fetch(process.env.BASE_URL + "/movie/" + id);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

//Handle props
type Props = {
  data: any;
};

const handleSubmit = async (event: any) => {
  event.preventDefault();
  //create data object
  const data = {
    title: event.target.title.value,
    description: event.target.description.value,
    ageRating: Number(event.target.ageRating.value),
  };
  const query = router.query;

  const endpoint = process.env.BASE_URL + "/movie/" + query.id;
  //send data to endpoint
  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    alert("Sikeresen megváltoztattad ennek a filmnek az adatait!");
    router.push("/");
  });
  //redirect to main page
};

export default function Edit({ data }: Props) {
  return (
    <div className={styles.container}>
      {/*use dynamic default values for input fields*/}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Cím:</label>
        <input defaultValue={data.title} type="text" id="title" name="title" />
        <label htmlFor="description">Leírás:</label>
        <textarea
          defaultValue={data.description}
          maxLength={255}
          id="description"
          name="description"
        />
        <label htmlFor="ageRating">Korhatár:</label>
        <select defaultValue={data.ageRating} id="ageRating" name="ageRating">
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

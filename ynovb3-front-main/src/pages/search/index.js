import { useState, useEffect } from "react";
import Title from "@/components/UI/Title";
import Freelances from '@/components/search'
import styles from "./index.module.scss";

const Index = ({}) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/freelance/search`, {
      headers: {
        'Content-Type': 'Application/json',
      },

      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => setData(data.freelances));
  }, []);

  console.log(data);

  return (
    <>
    <div className={styles.container}>
      <Title Level="h1" title="Tous les freelances" />
      <div className={styles.search}>
        {data.map((freelance) => (
          <Freelances freelance={freelance} />
        ))}
      </div>
      </div>
    </>
  )
}

export default Index;

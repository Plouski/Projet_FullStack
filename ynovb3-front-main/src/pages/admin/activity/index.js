import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import Container from "@/components/UI/Container"
import styles from "./index.module.scss";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/UserContext";
import ProductGrid from "@/components/activity/userGrid";
import Button from "@/components/UI/Button";
import Acces_admin from "@/components/partials/Acces_admin";

export default function Home() {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [token, setToken] = useState();

  const { data, error, loading, fetchData } = useFetch({ url: "/activity", method: "GET", body: null, token: token });
  

  useEffect(() => {
    if (token != null){
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);
  
  console.log(data);
  // console.log(getUser)
  return (
    
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
            <div className={styles.container}>
              <div className={styles.title}>
                <Title title="Liste des métiers" Level="h1" />
                <Button type="button" title="Ajouter un métier" className="btn__primary" handleClick={
                  () => router.push('activity/create')
                }/>
              </div><br/>
              {
                <ProductGrid products={data.activities}/>
              }
            </div>
          </>
        ) : ( 
          <Acces_admin />
        )
      }
    </>
  )
}

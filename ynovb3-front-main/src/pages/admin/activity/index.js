import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import Title from "@/components/UI/Title";
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

  const { data, fetchData } = useFetch({ url: "/activity", method: "GET", body: null, token: token });
  
  //Obtenir le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si le token existe cela affiche tous les infos
  useEffect(() => {
    if (token != null){
      fetchData();
    }
  }, [token]);
  
  // console.log(data);

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

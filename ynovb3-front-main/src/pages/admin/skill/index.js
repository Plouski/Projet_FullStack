import { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/UserContext";
import ProductGrid from "@/components/skill/userGrid";
import Button from "@/components/UI/Button";
import Acces_admin from "@/components/partials/Acces_admin";

export default function Home() {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [token, setToken] = useState();

  //Affichage de tous les infos de compétences 
  const { data, error, loading, fetchData } = useFetch({ url: "/skill", method: "GET", body: null, token: token });
  
  //Obtenir le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si le token existe on peut afficher tous les infos
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
              <div className={styles.centrer}>
                <Title title="Liste des compétences" Level="h1" />
                <Button type="button" title="Ajouter une compétence" className="btn__primary" handleClick={
                  () => router.push('skill/create')
                }/>
              </div><br/>
              {
                <ProductGrid products={data.skills}/>
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

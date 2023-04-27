import { useState, useEffect, useContext } from "react";
import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import Container from "@/components/UI/Container"
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/UserContext";
import ProductGrid from "@/components/mission/userGrid";
import Button from "@/components/UI/Button";
import Erreur_type from "@/components/partials/Erreur_type";

export default function Home() {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [token, setToken] = useState();

  const { data, error, loading, fetchData } = useFetch({ url: "/mission/missions", method: "GET", body: null, token: token });
  

  useEffect(() => {
    if (token != null){
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);
  
  console.warn(data);
  console.log(error)

  return (
    
    <>
      {
        isLogged && user.userType === "COMPANY" ? (
          <>
          <div className={styles.container}>
            <div className={styles.title}>
              <Title title="Liste des missions" Level="h1" />
              <Button type="button" title="Créer une mission" className="btn__primary" handleClick={
                  () => router.push('missions/create')
                }/>
            </div><br/>
            {
              <ProductGrid products={data.missions}/>
            }
            </div>
          </>
        ) : ( 
          <Erreur_type />
        )
      }
    </>
  )
}

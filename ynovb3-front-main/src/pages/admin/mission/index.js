import { useState, useEffect, useContext } from "react";
import Title from "@/components/UI/Title";
import styles from "./index.module.scss";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/UserContext";
import ProductGrid from "@/components/mission_admin/userGrid";
import Acces_admin from "@/components/partials/Acces_admin";

export default function Home() {

  const { isLogged, user} = useContext(UserContext);

  const [token, setToken] = useState();

  const { data, fetchData } = useFetch({ url: "/mission/admin/mission", method: "GET", body: null, token: token });
  
  //Obtenir le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si le token existe cela affiche tous lesn infos
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
              <Title title="Liste des missions" Level="h1" />
            </div>
            {
              <ProductGrid products={data.missions}/>
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

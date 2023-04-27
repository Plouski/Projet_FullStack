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

  const { data, error, loading, fetchData } = useFetch({ url: "/skill", method: "GET", body: null, token: token });
  

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

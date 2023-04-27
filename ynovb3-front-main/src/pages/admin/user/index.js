import { useState, useEffect, useContext } from "react";
import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import Container from "@/components/UI/Container"
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import useFetch from "@/hooks/useFetch";
import UserContext from "@/context/UserContext";
import ProductGrid from "@/components/user/userGrid";
import Acces_admin from "@/components/partials/Acces_admin";

export default function Home() {

  const { isLogged, user} = useContext(UserContext);

  const [token, setToken] = useState();

  const { data, error, loading, fetchData } = useFetch({ url: "/user/admin/users", method: "GET", body: null, token: token });
  

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
              <Title title="Liste des utilisateurs" Level="h1" />
            </div>
            {
              <ProductGrid products={data.users}/>
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

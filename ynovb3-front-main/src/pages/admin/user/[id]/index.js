import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Title from "@/components/UI/Title";
import Modal from "@/components/UI/Modal";
import Alert from '@mui/material/Alert';
import Image from "../../../../../public/images/images/supprimer.png";
import Container from "@/components/UI/Container";

const Index = () => {

  const { isLogged, user} = useContext(UserContext);

  const router = useRouter();

  const [id, setId] = useState();

  const [token, setToken] = useState();

  const [isOpen , setIsOpen] = useState(false);

  //Supprimer id dans la base de données
  let {data, loading, error, fetchData} = useFetch({url:`/user/admin/user/${id}`,method:"DELETE", body:null, token:token})

  //recuperer tous les informations de id venant de la base de données
  const {data: getUser, error: userError, loading: userLoading, fetchData:fetchDataUser} = useFetch({url:`/user/admin/user/${id}`, method:"GET", body:null, token:token})
  
  //Recuperer le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si token existe, on peut recuprer tous les infos
  useEffect(() => {
    if (token != null){
      fetchDataUser();
    }
  }, [token]);

  //Si la route a ID on peut voir tous les infos de ID
  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
    if (id) {
      fetchDataUser();
    }
  }, [router.isReady, id])
  
  data = {...data.user}
  
  if (loading) return <Loading />
  if (error) console.log(error);
  
  const submit = (e) => {
    e.preventDefault();
    fetchData()
    if (data) {
      router.push('/admin/user')
      alert ("L'utilisateur a bien été supprimé!")
    }
    // else console.log(error);
  }

  console.log(getUser)
  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
          {
              isOpen && (
                <Modal title="Supprimer cet utilisateur" closeModal={()=>setIsOpen(false)}>
                    <form onSubmit={(e) => {submit(e)}}>
                        <Alert severity="error">Vous en êtes bien sûr ?</Alert><br/>
                        <Button type="submit" title="Supprimer" className="btn__primary"/>
                    </form>
                </Modal>
              )
            }
            <Container>
            <div className={styles.wrapper}>
            <div className={styles.deux_colonnes}>
                <div className={styles.box_1}>
                    <Title Level="h1" title="Suppression d'utilisateur"/>
                    <Title Level="h4" title={getUser.user?.userType} />
                    <p>Prénom : {getUser.user?.firstName}</p>
                    <p>Nom : {getUser.user?.lastName}</p>
                    <p>Email : {getUser.user?.email}</p><br/>
                    <Button title="Supprimer" className="btn__primary" type="button" handleClick={ 
                      () => {
                      setIsOpen(true);
                      }
                    } />
                </div>
                <div className={styles.box_2}>
                    <img src={Image.src} alt="accueil" />
                </div>
            </div>
        </div>
            </Container>
          </>
        ) : ( 
          null
        )
      }
    </>
  );
}

export default Index;

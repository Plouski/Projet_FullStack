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
import Image from "../../../../../../public/images/images/supprimer.png";
import Container from "@/components/UI/Container";
import Paragraphe from "@/components/UI/Paragraphe"

const Index = () => {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [id, setId] = useState();

  const [token, setToken] = useState();

  const [isOpen , setIsOpen] = useState(false);

  //Supprimer id dans la base de données
  let {data, loading, error, fetchData} = useFetch({url:`/activity/${id}`,method:"DELETE", body:null, token:token})

  //recuperer tous les informations de id venant de la base de données
  const {data: activity , error: activityError, loading:activityLoading, fetchData:fetchDataActivity } = useFetch({url:`/activity/${id}`,method:"GET", body:null, token:token})

  //Recuperer le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si token existe, on peut recuprer tous les infos
  useEffect(() => {
    if (token != null){
      fetchDataActivity();
    }
  }, [token]);

  //Si la route a ID on peut voir tous les infos de ID
  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
    if (id) {
      fetchDataActivity();
    }
  }, [router.isReady, id])

  data = {...data.activity}
  
  if (loading) return <Loading />
  if (error) console.log(error);

  //Quand on click, cela supprime
  const submit = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      router.push('/admin/activity')
      alert ("Le métier a bien été supprimé !")
    }
    // else console.log(error);
  }

  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
          {
              isOpen && (
                <Modal title="Supprimer ce métier" closeModal={()=>setIsOpen(false)}>
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
                        <Title Level="h1" title="Suppression de métier"/>
                        <Paragraphe text={activity.user?.name} /><br/>
                        <Button title="Supprimer" className="btn__primary" type="button" handleClick={ 
                            () => {
                            setIsOpen(true);
                            }
                        } />
                    </div>
                    <div className={styles.box_2}>
                        <img src={Image.src} alt="poubelle" />
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

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
import Erreur_type from "@/components/partials/Erreur_type";

const Index = () => {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [id, setId] = useState();

  const [token, setToken] = useState();

  const [isOpen , setIsOpen] = useState(false);

  //Supprimer id dans la base de données
  let {data, loading, error, fetchData} = useFetch({url:`/mission/${id}`,method:"DELETE", body:null, token:token})

  //recuperer tous les informations de id venant de la base de données
  const {data: mission , error: missionError, loading:missionLoading, fetchData:fetchDataMission } = useFetch({url:`/mission/${id}`,method:"GET", body:null, token:token})

  //Recuperer le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si token existe, on peut recuprer tous les infos
  useEffect(() => {
    if (token != null){
      fetchDataMission();
    }
  }, [token]);

  //Si la route a ID on peut voir tous les infos de ID
  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
    if (id) {
      fetchDataMission();
    }
  }, [router.isReady, id])

  data = {...data.mission}
  
  if (loading) return <Loading />
  if (error) console.log(error);

  //Quand on click cela supprime
  const submit = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      router.push('/entreprise/missions')
      alert ("Votre mission a bien été supprimée !")
    }
    // else console.log(error);
  }

  return (
    <>
      {
        isLogged && user.userType === "COMPANY" ? (
          <>
          {
              isOpen && (
                <Modal title="Supprimer cette mission" closeModal={()=>setIsOpen(false)}>
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
                        <Title Level="h1" title="Suppression de mission"/>
                        <p>{mission.missions?.dateStart} - {mission.missions?.dateEnd}</p><br/>
                        <Title Level="h3" title={mission.missions?.title}/>
                        <p>Montant : {mission.missions?.amount}</p>
                        <p>Description : {mission.missions?.description}</p><br/>
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
          <Erreur_type />
        )
      }
    </>
  );
}

export default Index;

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Title from "@/components/UI/Title";
import Modal from "@/components/UI/Modal";
import Image from "../../../../../../public/images/images/maj.png";
import Container from "@/components/UI/Container";
import Erreur_type from "@/components/partials/Erreur_type";
import Input from "@/components/UI/Input";


const Index = () => {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [id, setId] = useState();

  const [token, setToken] = useState();

  const [missionForm, setMissionForm] = useState({
    dateStart: "",
    dateEnd: "",
    amount: null,
    title: "",
    description: "",
    status: "IN_PROGRESS",
    skills: []
  });

  const [isOpen , setIsOpen] = useState(false);

  //Modifier des champs de id dans la base de données
  let {data, loading, error, fetchData} = useFetch({url:`/mission/${id}`,method:"PUT", body:missionForm, token:token})

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

  const handleChange = (e) => {
    console.log(missionForm)
    setMissionForm({ ...missionForm, [e.target.name]: e.target.value })
  }

  //Quand on click cela modifie
  const submit = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      router.push('/entreprise/missions')
      alert ("Votre mission a bien été modifiée !")
    }
    // else console.log(error);
  }

  console.log(mission)

  return (
    <>
      {
        isLogged && user.userType === "COMPANY" ? (
          <>
          {
              isOpen && (
                <Modal title="Modifier cette mission" closeModal={()=>setIsOpen(false)}>
                  <form onSubmit={(e) => {submit(e)}}>
                    <Input
                      label="Titre de mission"
                      type="text"
                      name="title"
                      placeholder="veuillez saisir votre rue"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={missionForm.title}
                    />
                    <Input
                      label="Description"
                      type="text"
                      name="description"
                      placeholder="veuillez saisir votre code postal"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={missionForm.description}
                    />
                    <Input
                      label="Amount"
                      type="number"
                      name="amount"
                      placeholder="veuillez saisir votre numérot SIRET"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={missionForm.amount}
                    />
                    <Input
                      label="Date du début de mission"
                      type="date"
                      name="dateStart"
                      isRequired={true}
                      placeholder="veuillez saisir la date du début"
                      onChange={(e) => handleChange(e)}
                      value={missionForm.dateStart}
                    />
                    <Input
                      label="Date de fin de mission"
                      type="date"
                      name="dateEnd"
                      placeholder="veuillez saisir votre status"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={missionForm.dateEnd}
                    />
                    <Button type="submit" title="Modifier" className="btn__primary"/>
                  </form>
                </Modal>
              )
            }
            <Container>
              <div className={styles.wrapper}>
                <div className={styles.deux_colonnes}>
                    <div className={styles.box_1}>
                        <Title Level="h1" title="Mise à jour de cette mission"/>
                        <p>{mission.missions?.dateStart} - {mission.missions?.dateEnd}</p>
                        <Title Level="h3" title={mission.missions?.title}/>
                        <p>Montant : {mission.missions?.amount}</p>
                        <p>Description : {mission.missions?.description}</p><br/>
                        <Button title="Modifier" className="btn__primary" type="button" handleClick={ 
                            () => {
                            setIsOpen(true);
                            }
                        } />
                    </div>
                    <div className={styles.box_2}>
                        <img src={Image.src} alt="maj" />
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

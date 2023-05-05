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
import Image from "../../../../../../public/images/images/maj.png";
import Container from "@/components/UI/Container";
import Paragraphe from "@/components/UI/Paragraphe"
import Input from "@/components/UI/Input";

const Index = () => {

  const router = useRouter();

  const { isLogged, user, updateActivity} = useContext(UserContext);

  const [token, setToken] = useState();

  const [activityForm, setActivityForm] = useState({
    name:""
  });

  const [id, setId] = useState();

  const [isOpen , setIsOpen] = useState(false);

  //Modifier un ou des champs de ID dans la base de données
  let {data , loading, error, fetchData} = useFetch({url:`/activity/${id}`,method:"PUT", body:activityForm, token:token})
  
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

  const handleChange = (e) => {
    console.log(activityForm)
    setActivityForm({ ...activityForm, [e.target.name]: e.target.value })
  }

  //Quand on click cela modifie
  const submit = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      router.push('/admin/activity')
      alert ("Le métier a bien été modifié !")
    }
    // else console.log(error);
  }

  // console.log(activity)

  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
          {
              isOpen && (
                <Modal title="Mettre à jour ce metier" closeModal={()=>setIsOpen(false)}>
                    {
                        error &&
                        (
                            <Alert severity="error">Oups, une erreur s'est produite. Veuillez cliquer le bouton puis réinitialiser.</Alert>
                        ) 
                    }<br/>
                    <form onSubmit={(e) => {submit(e)}}>
                      <Input 
                        label="Métier" 
                        type="text" 
                        name="name" 
                        value={activityForm?.name}
                        isRequired={true}
                        placeholder="entrer le métier"
                        onChange={(e) => handleChange(e)}
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
                    <Title Level="h1" title="Mise à jour de ce metier"/>
                    <Paragraphe text={activity.user?.name} /><br/>
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
          null
        )
      }
    </>
  );
}

export default Index;

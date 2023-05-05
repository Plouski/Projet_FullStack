import { useState, useContext, useEffect } from 'react';
import UserContext from "@/context/UserContext";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";
import Title from '@/components/UI/Title';
import Container from "@/components/UI/Container";
import Erreur_type from "@/components/partials/Erreur_type";
import styles from "./index.module.scss";
import Alert from '@mui/material/Alert';
import Link from "next/link";
import Select from "react-select";

const Index = () => {

  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState();

  const [isOpen , setIsOpen] = useState(false);

  const [freelanceForm, setFreelanceForm] =useState({
    // skills: []
  });

  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" }
  ];

  function handleSelect() {
    setFreelanceForm();
  }

  //Modifier un ou des champs dans la base de données
  let {data , loading, error, fetchData} = useFetch({url:`/user/freelance`,method:"PUT", body:freelanceForm, token:token})

  //recuperer tous les informations de id venant de la base de données
  const {data: freelance , error: freelanceError, loading:freelanceLoading, fetchData:fetchDataFreelance } = useFetch({url:`/user`,method:"GET", body:null, token:token})
  
  useEffect(() => {
    setFreelanceForm(user)
  }, [user]);

  //Si cela a bien modifié la base de données, le modal va se fermer
  useEffect(() => {
    if (fetchData.success) {
      setIsOpen(false);
      updateUser(fetchData.user)
    }
  }, [fetchData]);

  //Recuperer le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si token existe, on peut recuperer tous les infos
  useEffect(() => {
    if (token != null){
      fetchDataFreelance();
    }
  }, [token]);

  if (loading) return <Loading />
  if (error) console.log(error);

  //Remplir les champs de formulaire
  const handleChange = (e) => {
    console.log(freelanceForm);
    setFreelanceForm({
      ...freelanceForm,
      [e.target.name]: e.target.value
    })
  }

  //Quand on clique le bouton, cela modifie le poste de freelance
  const submitForm = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      alert ('Votre poste de freelance a bien été modifié ! Pour bien tout récupérer les informations, il faut relancer la page.')
      setIsOpen(false);
    }
  }

  return (
    <>
      {
        isLogged && user?.userType != 'COMPANY' ? (
          <>
            {
              isOpen && (
                <Modal title="Modifier mon poste de freelance" closeModal={()=>setIsOpen(false)}>
                  {
                    error &&
                      (
                        <Alert severity="error">Oups, une erreur s'est produite. Veuillez cliquer le bouton puis réinitialiser.</Alert>
                      ) 
                  }<br/>
                  <form onSubmit={(e) => {submitForm(e)}}>
                    <Input 
                        label="Tarif" 
                        type="number" 
                        name="rate" 
                        value={freelanceForm?.rate}
                        isRequired={true}
                        placeholder="entrer votre tarif"
                        onChange={(e) => handleChange(e)}
                    />
                    <Input 
                        label="Année d'experience" 
                        type="number" 
                        name="yearOfExperience" 
                        value={freelanceForm?.yearOfExperience}
                        isRequired={true}
                        placeholder="entrer votre année d'experience"
                        onChange={(e) => handleChange(e)}
                    />
                    <Select
                      options={optionList}
                      placeholder="Selectionner votre compétence"
                      value={freelanceForm?.skills?.name}
                      onChange={(e) => handleSelect(e)}
                      isSearchable={true}
                      isMulti
                    /><br/>
                    <Button type="submit" title="modifier" className="btn__primary"/>
                  </form>
                </Modal>
              )
            }
            <Container>
              <div className={styles.formulaire}>
                <div className={styles.title}>
                  <Title title="Mon poste de freelance" Level="h1" />
                </div>
                {
                  user && (
                    <>
                      <p>Tarif : {freelance?.user?.freelance?.rate ? freelance?.user?.freelance?.rate : 'Il faut créer votre poste de freelance'}</p><br/>
                      <p>Année d'expérience : {freelance?.user?.freelance?.yearOfExperience ? freelance?.user?.freelance?.yearOfExperience : 'Il faut créer votre poste de freelance' }</p><br/>
                      <p>Compétence(s) : {freelance?.user?.freelance?.skills?.name ? freelance.user?.freelance?.skills?.name : 'Pas de compétence disponible'}</p><br/>
                    </>
                  )
                }
                <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                  () => {
                    setIsOpen(true);
                  }
                } /><br/><br/>
                <Link href="/account/profil/freelance/create">Vous n'avez pas encore créé votre poste de freelance ? Créez-le !</Link>
              </div>
            </Container>
          </>
        ) 
        : ( 
          <>
            <Erreur_type />
          </>
        )
      }
    </>
  );
}

export default Index;

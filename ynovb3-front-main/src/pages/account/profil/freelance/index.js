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
    rate: null,
    yearOfExperience: null,
    skills: []
  });

  // const optionList = [
  //   { value: "red", label: "Red" },
  //   { value: "green", label: "Green" },
  //   { value: "yellow", label: "Yellow" },
  //   { value: "blue", label: "Blue" },
  //   { value: "white", label: "White" }
  // ];

  function handleSelect() {
    setFreelanceForm();
  }

  const [selectedOptions, setSelectedOptions] = useState();

  const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:"/user/freelance", method:"PUT", body:freelanceForm, token:token})

  const {data, error, loading, fetchData } = useFetch({ url: "/user", method: "GET", body: null, token: token });

    //Recuperer le token
    useEffect(() => {
      setToken(localStorage.getItem('token'))
    }, []);
  
    //Si token existe, on peut recuprer tous les infos
    useEffect(() => {
      if (token != null){
        fetchData();
      }
    }, [token]);
  
    useEffect(() => {
      setFreelanceForm(user)
    }, [user]);
  
    useEffect(() => {
      if (dataUpdate.success) {
        setIsOpen(false);
        updateUser(dataUpdate.user)
      }
    }, [dataUpdate]);
  
    if (loadingUpdate) return <Loading />
    if (errorUpdate) console.log(errorUpdate);
  
    const handleChange = (e) => {
      console.log(freelanceForm);
      setFreelanceForm({
        ...freelanceForm,
        [e.target.name]: e.target.value
      })
    }
  
    const submitForm = (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      setToken(token);
      setFreelanceForm();
      fetchDataUpdate();
      if (dataUpdate.success) {
        alert ('Votre poste a bien été modifié !')
        setIsOpen(false);
      }
    }
  
    console.log(data);

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
                        label="Taux" 
                        type="number" 
                        name="rate" 
                        value={freelanceForm?.freelance?.rate}
                        isRequired={true}
                        placeholder="entrer votre taux"
                        onChange={(e) => handleChange(e)}
                    />
                    <Input 
                        label="Année d'experience" 
                        type="number" 
                        name="yearOfExperience" 
                        value={freelanceForm?.freelance?.yearOfExperience}
                        isRequired={true}
                        placeholder="entrer votre année d'experience"
                        onChange={(e) => handleChange(e)}
                    />
                    {/* <Select
                      options={optionList}
                      placeholder="Selectionner votre compétence"
                      value={freelanceForm?.freelance?.skills?.name}
                      onChange={(e) => handleSelect(e)}
                      isSearchable={true}
                      isMulti
                    /><br/> */}
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
                      <p>Taux : {data.user?.freelance?.rate}</p><br/>
                      <p>Année d'expérience : {data.user?.freelance?.yearOfExperience}</p><br/>
                      <p>Compétence(s) : {data.user?.freelance?.skills?.name ? data.user?.freelance?.skills?.name : 'Pas de compétence disponible'}</p><br/>
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

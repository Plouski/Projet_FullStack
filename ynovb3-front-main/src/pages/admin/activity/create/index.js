import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserContext from "@/context/UserContext";
import useFetch from "@/hooks/useFetch";
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Label from "@/components/UI/Label";
import Alert from '@mui/material/Alert';
import Erreur_type from '@/components/partials/Erreur_type';
import Select from 'react-select';
import styles from "./index.module.scss";

const Index = () => {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [token, setToken] = useState();

  const [activityForm, setActivityForm] = useState({
    name: "",
    // skills: []
  });

  // const optionList = [
  //   { value: "red", label: "Red" },
  //   { value: "green", label: "Green" },
  //   { value: "yellow", label: "Yellow" },
  //   { value: "blue", label: "Blue" },
  //   { value: "white", label: "White" }
  // ];

  // function handleSelect() {
  //   setActivityForm();
  // }

  //Création de métier
  const { data: activity, error, loading: activityLoading, fetchData: fetchDataActivity } = useFetch({ url: "/activity", method: "POST", body: activityForm, token: token });
  
  //Affichafe des compétences
  const { data, loading, fetchData } = useFetch({ url: "/skill", method: "GET", body: null, token: token });

  //Obtenir le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si token existe, on peut créér et afficher
  useEffect(() => {
    if (token != null){
      fetchDataActivity();
      //fetchData();
    }
  }, [token]);

  //Remplir les champs du formulaire
  const handleChange = (e) => {
    console.log(activityForm);
    setActivityForm({
      ...activityForm,
      [e.target.name]: e.target.value
    })
  }

  //Quand on clique, cela crée le metier s'il y a pas d'erreur
  const submitRegister = (e) => {
    e.preventDefault();
    fetchDataActivity();
    if(error){
      console.log(error);
    }
  }

  //Si tout est ok, cela vous diriger à la page en disant que le métier a bien été créé
  useEffect(() => {
    if (activity.success == true){
      router.push('/admin/activity')
      alert('Le métier a bien été créé !')
    }
  }, [activity]);

  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
            <div className={styles.container}>
              <Title title="Création de métier" Level="h1" />
              <form onSubmit={(e) => submitRegister(e)}>
                <Label text="Nom"/>
                <Input
                  type="text"
                  name="name"
                  isRequired={true}
                  placeholder="veuillez saisir le nom du métier"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={activityForm.name}
                />
                {/* <Select
                  options={optionList}
                  placeholder="Selectionner votre compétence"
                  value={activityForm.skills?.name}
                  onChange={(e) => handleSelect(e)}
                  isSearchable={true}
                  isMulti
                /><br/> */}
                <Button
                  type="submit"
                  title="Créer"
                  className="btn__primary"
                />
              </form><br/>
              {
                error && (
                  <Alert severity="error">{error.message}</Alert>
                )
              }<br/>
            </div>
          </>
        ) : ( 
          <Erreur_type />
        )
      }
    </>
  );
}

export default Index;

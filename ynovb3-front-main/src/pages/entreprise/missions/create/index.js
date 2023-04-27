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
import styles from "./index.module.scss";


const Index = () => {

  const router = useRouter();

  const { isLogged, logout, user} = useContext(UserContext);

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

  const { data: mission, error, loading: missionLoading, fetchData: fetchDataMission} = useFetch({ url: "/mission", method: "POST", body: missionForm, token: token });
  const { data, loading, fetchData } = useFetch({ url: "/skill", method: "GET", body: null, token: token });

  const handleChange = (e) => {
    console.log(missionForm);
    setMissionForm({
      ...missionForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (token != null){
      fetchDataMission();
      // fetchData();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  const submitRegister = (e) => {
    e.preventDefault();
    fetchDataMission();
    try {
      router.push('/entreprise/missions')
      alert('Votre mission a bien été créé !')
    }
    catch (error){
      console.log(error);
    }
  }

  return (
    <>
      {
        isLogged && user.userType === 'COMPANY' ? (
          <>
          <div className={styles.container}>
            <Title title="Créer une mission" Level="h1" />
            <form onSubmit={(e) => submitRegister(e)}>
              <Label text="La date du début de mission"/>
              <Input
                type="date"
                name="dateStart"
                isRequired={true}
                placeholder="veuillez saisir la date du début"
                onChange={(e) => handleChange(e)}
                value={missionForm.dateStart}
              />
              <Label text="La date de fin de mission"/>
              <Input
                type="date"
                name="dateEnd"
                placeholder="veuillez saisir votre status"
                isRequired={true}
                onChange={(e) => handleChange(e)}
                value={missionForm.dateEnd}
              />
              <Label text="Amount"/>
              <Input
                type="number"
                name="amount"
                placeholder="veuillez saisir votre numérot SIRET"
                isRequired={true}
                onChange={(e) => handleChange(e)}
                value={missionForm.amount}
              />
              <Label text="Titre de mission"/>
              <Input 
                type="text"
                name="title"
                placeholder="veuillez saisir votre rue"
                isRequired={true}
                onChange={(e) => handleChange(e)}
                value={missionForm.title}
              />
              <Label text="Description"/>
              <Input 
                type="text"
                name="description"
                placeholder="veuillez saisir votre code postal"
                isRequired={true}
                onChange={(e) => handleChange(e)}
                value={missionForm.description}
              />
              {/* <Label text="Compétences"/>
              <Input 
                type="text"
                name="skills"
                placeholder="veuillez saisir votre ville"
                // required={true}
                onChange={(e) => handleChange(e)}
                value={missionForm.skills}
              /> */}
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

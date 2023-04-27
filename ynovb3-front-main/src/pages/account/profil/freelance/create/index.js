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

  const { isLogged, user} = useContext(UserContext);

  const [token, setToken] = useState();

  const [freelanceForm, setfreelanceForm] = useState({
    rate: null,
    yearOfExperience: null,
  });

  const { data, error, loading, fetchData} = useFetch({ url: "/auth/freelance", method: "POST", body: freelanceForm, token: token });

  useEffect(() => {
    if (token != null){
        fetchData();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  const handleChange = (e) => {
    console.log(freelanceForm);
    setfreelanceForm({
      ...freelanceForm,
      [e.target.name]: e.target.value
    })
  }

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if(data) {
        router.push('/account/profil/freelance')
        alert('Votre poste de freelance a bien été créé !')
      }
    //   catch (error){
    //     console.log(error);
    //   }
  }

  return (
    <>
      {
        isLogged && user.userType === 'FREELANCE' ? (
          <>
          <div className={styles.container}>
            <Title title="Votre poste de freelance" Level="h1" />
            <form onSubmit={(e) => submitRegister(e)}>
              <Label text="Taux"/>
              <Input
                type="number"
                name="rate"
                isRequired={true}
                placeholder="veuillez saisir votre taux"
                required={true}
                onChange={(e) => handleChange(e)}
                value={freelanceForm.rate}
              />
              <Label text="Années d'expérience"/>
              <Input
                type="number"
                name="yearOfExperience"
                placeholder="veuillez saisir votre nombre d'expérience"
                required={true}
                onChange={(e) => handleChange(e)}
                value={freelanceForm.yearOfExperience}
              />
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

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

  const [companyForm, setCompanyForm] = useState({
    name: "",
    status: "",
    siret: null,
    address: {
      city: "",
      zipCode: null,
      street: ""
    },
  });

  //Creation d'entreprise dans la base de données
  const { data, error, loading, fetchData} = useFetch({ url: "/auth/company", method: "POST", body: companyForm, token: token });

  //Obtenir le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si token existe, on peut créer l'entreprise 
  useEffect(() => {
    if (token != null){
      fetchData();
    }
  }, [token]);

  //Remplir les champs du formulaire
  const handleChange = (e) => {
    console.log(companyForm);
    setCompanyForm({
      ...companyForm,
      [e.target.name]: e.target.value
    })
    if (e.target.name === "zipCode"){
      companyForm.address.zipCode = e.target.value
    }
    if (e.target.name === "city"){
      companyForm.address.city = e.target.value
    }
    if (e.target.name === "street"){
      companyForm.address.street = e.target.value
    }
  }

  //Quand on clique, cela crée une entreprise s'il y a pas d'erreur
  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if(error){
      console.log(error);
    }
  }

  //Si tout est ok, cela vous diriger à la page en disant que l'entreprise a bien été créée
  useEffect(() => {
    if (data.success == true){
      router.push('/account/profil/entreprise')
      alert('Votre entreprise a bien été créé !')
    }
  }, [data]);

  return (
    <>
      {
        isLogged && user.userType === 'COMPANY' ? (
          <>
          <div className={styles.container}>
            <Title title="Votre entreprise" Level="h1" />
            <form onSubmit={(e) => submitRegister(e)}>
              <Label text="Nom de votre entreprise"/>
              <Input
                type="text"
                name="name"
                isRequired={true}
                placeholder="veuillez saisir le nom de votre entreprise"
                required={true}
                onChange={(e) => handleChange(e)}
                value={companyForm.name}
              />
              <Label text="Status"/>
              <Input
                type="status"
                name="status"
                placeholder="SAS, SASU, SARL, EURL, SA, ..."
                required={true}
                onChange={(e) => handleChange(e)}
                value={companyForm.status}
              />
              <Label text="Siret"/>
              <Input
                type="number"
                name="siret"
                placeholder="veuillez saisir votre numérot SIRET"
                required={true}
                onChange={(e) => handleChange(e)}
                value={companyForm.siret}
              />
              <Label text="Adresse"/>
              <Input 
                type="adress"
                name="street"
                placeholder="veuillez saisir votre rue"
                required={true}
                onChange={(e) => handleChange(e)}
                value={companyForm.street}
              />
              <Label text="Code postal"/>
              <Input 
                type="zipcode"
                pattern="[0-9]{5}"
                name="zipCode"
                placeholder="veuillez saisir votre code postal"
                required={true}
                onChange={(e) => handleChange(e)}
                value={companyForm.zipCode}
              />
              <Label text="Ville"/>
              <Input 
                type="city"
                name="city"
                placeholder="veuillez saisir votre ville"
                required={true}
                onChange={(e) => handleChange(e)}
                value={companyForm.city}
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

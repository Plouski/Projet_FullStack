import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import UserContext from "@/context/UserContext";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Label from "@/components/UI/Label";
import Alert from '@mui/material/Alert';
import Erreur_authentification from '@/components/partials/Erreur_auth';


const Index = () => {

  const { login } = useContext(UserContext);
  const router = useRouter();
  const { isLogged, logout, data } = useContext(UserContext);

  const [token, setToken] = useState();

  const [companyForm, setCompanyForm] = useState({
    name: "",
    status: "",
    siret: 9,
    address: {
      city: "",
      zipCode: 0,
      street: ""
    },
  });

  const { data: company, error: companyError, loading: companyLoading, fetchData: fetchDataCompany } = useFetch({ url: "/auth/company", method: "POST", body: companyForm, token: token });
  const { data: user, error: userError, loading:userLoading, fetchData:fetchDataUser } = useFetch({ url: "/user", method: "GET", body: null, token: token });


  // useEffect(() => {
  //   fetchDataUser();
  //   if (user.success) {
  //     login({
  //       firstName: user.user.firstName,
  //       lastName: user.user.lastName,
  //       email:user.user.email
  //     })
  //     router.push('/account/profil');
  //   }
  // },[token,user])
  
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

  useEffect(() => {
    if (token != null){
      fetchDataCompany();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  const submitRegister = (e) => {
    e.preventDefault();
    fetchDataCompany();
    if (data) {
      alert ('Votre profil a bien été modifié !')
      setIsOpen(false);
    }
  }

  return (
    <>
    {
    isLogged ? (
          <>
          <Title title="Votre entreprise" Level="h1" />
          <span>
              Bonjour {user._id} ({user.userType})
            </span>
      <form onSubmit={(e) => submitRegister(e)}>
        <Label text="Nom de votre entreprise"/>
        <Input
          type="text"
          name="name"
          placeholder="veuillez saisir le nom de votre entreprise"
          required={true}
          onChange={(e) => handleChange(e)}
          value={companyForm.name}
        />
         <Label text="Status"/>
        <Input
          type="status"
          name="status"
          placeholder="veuillez saisir votre status"
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
      {/* {error && 
        (
          <Alert severity="error">Erreur d'inscription. Veuillez réessayer encore.</Alert>
        )
      }<br/> */}
          </>
          ) : ( 
          <Erreur_authentification />
          )
}
    </>
  );
}

export default Index;

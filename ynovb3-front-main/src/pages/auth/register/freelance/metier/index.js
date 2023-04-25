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
  const [token, setToken] = useState();

  const { isLogged, logout } = useContext(UserContext);

  const { login } = useContext(UserContext);
  
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    name: "",
    status: "",
    siret: "",
    address: [{
      city: '',
      zipCode: '',
      street: '',
    }],
  });

  const {fetchData, data, error, loading} = useFetch({url:'/auth/company', method:"POST", body:userForm, token:token})
  const { data: user, error: userError, loading:userLoading, fetchData:fetchDataUser } = useFetch({ url: "/user", method: "GET", body: null, token: token });

  useEffect(() => {
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);     
    }
  }, [data]);
  
  useEffect(() => {
    fetchDataUser();
    if (user.success) {
      login({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email:user.user.email,
        phone: user.user.phone,
        userType: user.user.userType,
        city: user.user.city,
        zipCode: user.user.zipCode,
        street:user.user.street
      })
      router.push('/account/profil');
    }
  },[token,user])

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    
  }

  return (
    <>
          <Title title="Votre métier" Level="h1" />
          {/* <span>
              Bonjour {user._id} ({user.userType})
            </span> */}
      <form onSubmit={(e) => submitRegister(e)}>
        <Label text="Nom de votre entreprise"/>
        <Input
          type="text"
          name="name"
          placeholder="veuillez saisir le nom de votre entreprise"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.name}
        />
         <Label text="Status"/>
        <Input
          type="status"
          name="status"
          placeholder="veuillez saisir votre status"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.status}
        />
        <Label text="Siret"/>
        <Input
          type="number"
          name="siret"
          placeholder="veuillez saisir votre numérot SIRET"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.siret}
        />
        <Label text="Adresse"/>
        <Input 
          type="adress"
          name="street"
          placeholder="veuillez saisir votre rue"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.street}
        />
        <Label text="Code postal"/>
        <Input 
          type="zipcode"
          pattern="[0-9]{5}"
          name="zipCode"
          placeholder="veuillez saisir votre code postal"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.zipCode}
        />
        <Label text="Ville"/>
        <Input 
          type="city"
          name="city"
          placeholder="veuillez saisir votre ville"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.city}
        />
        <Button
          type="submitRegister"
          title="Se connecter"
          className="btn__primary"
        />
      </form><br/>
      {error && 
        (
          <Alert severity="error">Erreur d'inscription. Veuillez réessayer encore.</Alert>
        )
      }
      <Link href="/auth/login">Vous voulez finir plus tard ce formulaire ? Se connecter !</Link>
          </>

  );
}

export default Index;

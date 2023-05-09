import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Label from "@/components/UI/Label";
import useFetch from '@/hooks/useFetch';
import Alert from '@mui/material/Alert';
import styles from "./index.module.scss";

const Index = () => {

  const router = useRouter();

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    userType : "FREELANCE",
    address: {
      city: "",
      zipCode: 0,
      street: "",
    },
  });

  //CReation du compte de FREELANCE
  const {fetchData, data, error, loading} = useFetch({url:'/auth/register', method:"POST", body:userForm, token:null})
  
  //Remplir les champs du formulaire
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
    if (e.target.name === "city"){
      userForm.address.city = e.target.value
    }
    if (e.target.name === "zipCode"){
      userForm.address.zipCode = e.target.value
    }
    if (e.target.name === "street"){
      userForm.address.street = e.target.value
    }
  }

  // Quand on clique cela crée le compte
  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if (data){
      router.push('/auth/login')
      alert('Votre compte a bien été créé !')
    }
    // else (error)
    // console.log(error);
  }

  //A UTILISER QUAND LE SMTP MARCHE (EMAIL)

  // const submitRegister = (e) => {
  //   e.preventDefault();
  //   fetchData();
  //   if (error){
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   if (data.success == true){
  //     router.push('/auth/login')
  //     alert('Votre compte a bien été créé !')
  //   }
  // }, [data]);

  return (
    <>
      <Title title="Inscription (Freelance)" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <div className={styles.top_row}>
          <div className={styles.field_wrap}>
            <Label text="Prénom"/>
            <Input
              type="firstName"
              name="firstName"
              placeholder="Votre prénom"
              isRequired={true}
              onChange={(e) => handleChange(e)}
              value={userForm.firstName}
            />
          </div>
          <div className={styles.field_wrap}>
            <Label text="Nom"/>
            <Input
              type="lastName"
              name="lastName"
              placeholder="Votre nom"
              isRequired={true}
              onChange={(e) => handleChange(e)}
              value={userForm.lastName}
            />
          </div>
        </div><br/>
        <Label text="Email"/>
        <Input
          type="email"
          name="email"
          placeholder="veuillez saisir votre email"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />
        <Label text="Numéro de portable"/>
        <Input 
          type="tel"
          name="phone"
          maxLength = "15"
          minLength = "9"
          placeholder="veuillez saisir votre numéro de portable"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.phone}
        />
        <Label text="Adresse"/>
        <Input 
          type="adress"
          name="street"
          placeholder="veuillez saisir votre rue"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.address.street}
        />
        <div className={styles.top_row}>
          <div className={styles.field_wrap}>
          <Label text="Code postal"/>
          <Input 
            type="zipcode"
            name="zipCode"
            maxLength= "5"
            placeholder="votre CP"
            isRequired={true}
            onChange={(e) => handleChange(e)}
            value={userForm.address.zipCode}
          />
          </div>
          <div className={styles.field_wrap}>
            <Label text="Ville"/>
            <Input 
              type="city"
              name="city"
              placeholder="votre ville"
              isRequired={true}
              onChange={(e) => handleChange(e)}
              value={userForm.address.city}
            />
          </div>
        </div><br/>
        <Label text="Mot de passe"/>
        <Input
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <Button
          type="submit"
          title="S'inscrire"
          className="btn__primary"
        />
      </form><br/>
      {error && 
        (
          <Alert severity="error">{error.message}</Alert>
        )
      }<br/>
      <Link href="/auth/login">Vous avez déjà un compte ? Connectez-vous !</Link>
    </>
  );
}

export default Index;

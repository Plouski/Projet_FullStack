import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/";
import Title from "@/components/UI/Title";
import Loading from "@/components/UI/Loading";
import Label from "@/components/UI/Label";
import Notification from "@/components/UI/Notification";
import styles from "./index.module.scss";

const Index = () => {

  const router = useRouter();

  const { login } = useContext(UserContext);

  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState({
    email: "",
    password:""
  });

  //Se connecter
  const {data, error, loading, fetchData} = useFetch({ url: "/auth/login", method: "POST", body: userForm, token: null })

  //Recuperer les infos d'utilisateur
  const { data: user , error: userError, loading:userLoading, fetchData:fetchDataUser } = useFetch({ url: "/user", method: "GET", body: null, token: token });
  
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
        isAdmin: user.user.isAdmin,
        userType: user.user.userType,
        address: {
          city: user.user.address.city,
          zipCode: user.user.address.zipCode,
          street: user.user.address.street
        },
      })
      router.push('/account/profil');
    }
  },[token,user])

  //REmplir les champs du formulaire
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  //Quand on clique, on peut se connecter s'il y a pas d'erreur
  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
    if (error) console.log(error);
  }

  return (
    <>
      <Loading isLoad={loading} />
      <Title title="Connexion" Level="h1" />
      <form onSubmit={(e)=>submitLogin(e)}>
        <Label text="Email" />
        <Input
        type="email" 
        name="email" 
        placeholder="veuillez saisir votre email"
        isRequired={true}
        onChange={(e) => handleChange(e)}
        value={userForm.email}
        />
        <Label text="Mot de passe" />
        <Input
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <div className={styles.password}>
          <Link href="/auth/password/forgotPassword">Mot de passe oublié ?</Link>
        </div>
        <Button
          type="submit"
          title="Se connecter"
          className="btn__primary"
        />
      </form><br/>
      {
        error && (
          <Notification type="warning" message={error.message}/>
        )
      }
      <Link href="/auth/register">Vous n'avez pas de compte ? Inscrivez-vous !</Link>
    </>
  );

}

export default Index;

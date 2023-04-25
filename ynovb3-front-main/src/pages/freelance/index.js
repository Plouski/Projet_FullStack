import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from "@/context/UserContext";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";
import Title from '@/components/UI/Title';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Label from "@/components/UI/Label";
import Alert from '@mui/material/Alert';
import Erreur_type from '@/components/partials/Erreur_type';


const Index = () => {
  const [token, setToken] = useState();

  const { user, isLogged, logout } = useContext(UserContext);

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

  const {fetchData, data, error, loading} = useFetch({url:'/user/company', method:"POST", body:userForm, token:token})
    
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    })
  }

  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if (fetchData) {
      alert('Votre compte a bien été créé !')
      localStorage.setItem('token', data.token);
    }
    else {
      alert("Erreur d'inscription")
    }
    
  }

  return (
    <>
    {
    isLogged && user.userType === 'FREELANCE' ? (
          <>
          <Title title="Freelance" Level="h1" />
          
          </>
          ) : ( 
          <Erreur_type />
          )
}
    </>
  );
}

export default Index;

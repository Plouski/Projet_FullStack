import { useState, useContext, useEffect } from 'react';
import { useRouter } from "next/router";
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

const Index = () => {

  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState();

  const [isOpen , setIsOpen] = useState(false);

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

  const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:`/user/company`, method:"PUT", body:companyForm, token:token})
    
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
    setCompanyForm(user)
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
    console.log(companyForm);
    setCompanyForm({ 
      ...companyForm, 
      company:{
      [e.target.name]: e.target.value
      }
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

  const submitForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setToken(token);
    fetchDataCompany();
    fetchDataUpdate();
    if (dataUpdate.success) {
      alert ('Votre entreprise a bien été modifiée !')
      setIsOpen(false);
    }
  }

  console.log(data);

  return (
    <>
      {
        isLogged && user.userType === 'COMPANY' ? (
          <>
            {
              isOpen && (
                <Modal title="Modifier mon entreprise" closeModal={()=>setIsOpen(false)}>
                  {
                    error &&
                      (
                        <Alert severity="error">Oups, une erreur s'est produite. Veuillez cliquer le bouton puis réinitialiser.</Alert>
                      ) 
                  }<br/>
                  <form onSubmit={(e) => {submitForm(e)}}>
                    <Input 
                      label="Nom d'entreprise" 
                      type="text" 
                      name="name" 
                      value={companyForm.company?.name}
                      isRequired={true}
                      placeholder="entrer le nom de votre entreprise"
                      onChange={(e) => handleChange(e)}
                    />
                    <Input 
                    label="Status" 
                    type="text" 
                    name="status" 
                    value={companyForm.company?.status}
                    isRequired={true}
                    placeholder="SAS, SASU, SARL, EURL, SA"
                    onChange={(e) => handleChange(e)}
                    />
                    <Input 
                    label="Siret" 
                    type="number" 
                    name="email" 
                    value={companyForm.company?.siret}
                    isRequired={true}
                    placeholder="entrer votre siret"
                    onChange={(e) => handleChange(e)}
                    />
                    <Input 
                      label="Adresse" 
                      type="adress"
                      name="street"
                      placeholder="entrer la rue de votre entreprise"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm.company?.address?.street}
                    />
                    <Input
                      label="Code postal" 
                      type="zipcode"
                      name="zipCode"
                      maxLength= "5"
                      placeholder="entrer le code postal de votre entreprise"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm.company?.address?.zipCode}
                    />
                    <Input 
                      label="Ville" 
                      type="city"
                      name="city"
                      placeholder="entrer la ville de votre ville"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm.company?.address?.city}
                    />
                    <Button type="submit" title="modifier" className="btn__primary"/>
                  </form>
                </Modal>
              )
            }
            <Container>
              <div className={styles.formulaire}>
                <div className={styles.title}>
                  <Title title="Mon entreprise" Level="h1" />
                </div>
                {
                  user && (
                    <>
                      <p>Nom : {data.user?.company?.name}</p><br/>
                      <p>Status : {data.user?.company?.status}</p><br/>
                      <p>Siret : {data.user?.company?.siret}</p><br/>
                      <p>Adresse : {data.user?.company?.address.street}</p><br/>
                      <p>Code postal : {data.user?.company?.address.zipCode}</p><br/>
                      <p>Ville : {data.user?.company?.address.city}</p><br/>
                    </>
                  ) 
                }
                <Button title="Modifier" className="btn__primary" type="button" handleClick={ 
                  () => {
                    setIsOpen(true);
                  }
                } /><br/><br/>
                <Link href="/account/profil/entreprise/create">Vous n'avez pas encore créé votre entreprise ? Créez-la !</Link>
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

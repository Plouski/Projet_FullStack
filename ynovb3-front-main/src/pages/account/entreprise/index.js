import { useState, useContext, useEffect } from 'react';
import UserContext from "@/context/UserContext";
import useFetch from "@/hooks/useFetch";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import Loading from "@/components/UI/Loading";
import Title from '@/components/UI/Title';
import Container from "@/components/UI/Container";
import Erreur_authentification from "@/components/partials/Erreur_auth";
import styles from "./index.module.scss";
import Alert from '@mui/material/Alert';
import Erreur_type from '@/components/partials/Erreur_type';

const Index = () => {

  const { isLogged, company, updateCompany } = useContext(UserContext);

  // const { isLogged, logout, data , user} = useContext(UserContext);

  const [token, setToken] = useState();

  const [companyForm, setCompanyForm] =useState();
  // const [companyForm, setCompanyForm] = useState({
  //   name: "",
  //   status: "",
  //   siret: 9,
  //   address: {
  //     city: "",
  //     zipCode: 0,
  //     street: ""
  //   },
  // });

  const [isOpen , setIsOpen] = useState(false);

  const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate, error} = useFetch({url:"/auth/company", method:"PUT", body:companyForm, token:token})

  // const { data: company, error, loading: companyLoading, fetchData: fetchDataCompany } = useFetch({ url: "/auth/company", method: "POST", body: companyForm, token: token });

  useEffect(() => {
    setCompanyForm(company)
  }, [company]);

  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen(false);
      updateCompany(dataUpdate.user)
    }
  }, [dataUpdate]);

  if (loadingUpdate) return <Loading />
  if (errorUpdate) console.log(errorUpdate);

  const handleChange = (e) => {
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

  // const handleChange = (e) => {
  //   console.log(companyForm);
  //   setCompanyForm({
  //     ...companyForm,
  //     [e.target.name]: e.target.value
  //   })
  //   if (e.target.name === "zipCode"){
  //     companyForm.address.zipCode = e.target.value
  //   }
  //   if (e.target.name === "city"){
  //     companyForm.address.city = e.target.value
  //   }
  //   if (e.target.name === "street"){
  //     companyForm.address.street = e.target.value
  //   }
  // }

  // useEffect(() => {
  //   if (token != null){
  //     fetchDataCompany();
  //   }
  // }, [token]);

  // useEffect(() => {
  //   setToken(localStorage.getItem('token'))
  // }, []);

  const submitRegister = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setToken(token);
    fetchDataUpdate();
    if (data) {
      alert ('Votre profil a bien été modifié !')
      setIsOpen(false);
    }
    else (error) 
    console.log(error);
  }

  // console.log(user);

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
                    label="Prénom" 
                    type="text" 
                    name="firstName" 
                    value={companyForm.name}
                    isRequired={true}
                    placeholder="entrer votre prénom"
                    onChange={(e) => handleChange(e)}
                    />
                    <Input 
                    label="Nom" 
                    type="text" 
                    name="lastName" 
                    value={companyForm.status}
                    isRequired={true}
                    placeholder="entrer votre nom"
                    onChange={(e) => handleChange(e)}
                    />
                    <Input 
                    label="Email" 
                    type="text" 
                    name="email" 
                    value={companyForm.siret}
                    isRequired={true}
                    placeholder="entrer votre email"
                    onChange={(e) => handleChange(e)}
                    />
                    <Input 
                      label="Addresse" 
                      type="adress"
                      name="street"
                      placeholder="entrer votre rue"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm.address.street}
                    />
                    <Input
                      label="Code postal" 
                      type="zipcode"
                      name="zipCode"
                      maxLength= "5"
                      placeholder="entrer votre code postal"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm.address.zipCode}
                    />
                    <Input 
                      label="Ville" 
                      type="city"
                      name="city"
                      placeholder="entrer votre ville"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm.address.city}
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
                      <p>Le type de votre compte : {user.name}</p><br/>
                      <p>Prénom : {user.status}</p><br/>
                      <p>Nom : {user.siret}</p><br/>
                      <p>Adresse : {user.address.street}</p><br/>
                      <p>Code postal : {user.address.zipCode}</p><br/>
                      <p>Ville : {user.address.city}</p><br/>
                    </>
                  )
                }
                <Button title="modifier" className="btn__primary" type="button" handleClick={ 
                  () => {
                    setIsOpen(true);
                  }
                } />
              </div>
            </Container>
          </>
        ) 
        : ( 
          <>
            <Erreur_authentification />
          </>
        )
      }
    </>
  );
}

export default Index;

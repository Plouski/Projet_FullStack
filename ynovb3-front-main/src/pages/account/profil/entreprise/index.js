import { useState, useContext, useEffect } from 'react';
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

  const [companyForm, setCompanyForm] = useState({});

  //Modifier un ou des champs dans la base de données
  let {data , loading, error, fetchData} = useFetch({url:`/user/company`,method:"PUT", body:companyForm, token:token})

  //Recuperer tous les informations de id venant de la base de données
  const {data: company , error: companyError, loading:companyLoading, fetchData:fetchDataCompany } = useFetch({url:`/user`,method:"GET", body:null, token:token})

  useEffect(() => {
    setCompanyForm(user)
  }, [user]);
  
  //Si cela a bien modifié la base de données, le modal va se fermer
  useEffect(() => {
    if (fetchData.success) {
      setIsOpen(false);
      updateUser(fetchData.user)
    }
  }, [fetchData]);

  //Recuperer le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si token existe, on peut recuperer tous les infos
  useEffect(() => {
    if (token != null){
      fetchDataCompany();
    }
  }, [token]);

  if (loading) return <Loading />
  if (error) console.log(error);

  //Remplir les champs de formulaire
  const handleChange = (e) => {
    console.log(companyForm);
    setCompanyForm({ 
      ...companyForm,
      [e.target.name]: e.target.value
    })
    if (e.target.name === "street"){
      companyForm.address.street = e.target.value
    }
    if (e.target.name === "zipCode"){
      companyForm.address.zipCode = e.target.value
    }
    if (e.target.name === "city"){
      companyForm.address.city = e.target.value
    }
  }

  //Quand on clique le bouton, cela modifie l'entreprise
  const submitForm = (e) => {
    e.preventDefault();
    fetchData();
    if (data) {
      alert ('Votre entreprise a bien été modifiée ! Pour bien tout récupérer les informations, il faut relancer la page.')
      setIsOpen(false);
    }
  }

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
                      value={companyForm?.name}
                      isRequired={true}
                      placeholder="entrer le nom de votre entreprise"
                      onChange={(e) => handleChange(e)}
                    />
                    <Input 
                    label="Status" 
                    type="text" 
                    name="status" 
                    value={companyForm?.status}
                    isRequired={true}
                    placeholder="SAS, SASU, SARL, EURL, SA"
                    onChange={(e) => handleChange(e)}
                    />
                    <Input 
                    label="Siret" 
                    type="number" 
                    name="siret" 
                    value={companyForm?.siret}
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
                      value={companyForm?.user?.company?.address?.street}
                    />
                    <Input
                      label="Code postal" 
                      type="number"
                      name="zipCode"
                      maxLength= "5"
                      placeholder="entrer le code postal de votre entreprise"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm?.user?.company?.address?.zipCode}
                    />
                    <Input 
                      label="Ville" 
                      type="city"
                      name="city"
                      placeholder="entrer la ville de votre ville"
                      isRequired={true}
                      onChange={(e) => handleChange(e)}
                      value={companyForm?.user?.company?.address?.city}
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
                      <p>Nom : {company?.user?.company?.name ? company?.user?.company?.name : 'Il faut créer votre entreprise'}</p><br/>
                      <p>Status : {company?.user?.company?.status ? company?.user?.company?.status : 'Il faut créer votre entreprise'}</p><br/>
                      <p>Siret : {company?.user?.company?.siret ? company?.user?.company?.siret : 'Il faut créer votre entreprise'}</p><br/>
                      <p>Adresse : {company?.user?.company?.address.street ? company?.user?.company?.address.street : 'Il faut créer votre entreprise'}</p><br/>
                      <p>Code postal : {company?.user?.company?.address.zipCode ? company?.user?.company?.address.zipCode : 'Il faut créer votre entreprise'}</p><br/>
                      <p>Ville : {company?.user?.company?.address.city ? company?.user?.company?.address.city : 'Il faut créer votre entreprise'}</p><br/>
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

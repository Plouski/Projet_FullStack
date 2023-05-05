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

  const [skillForm, setSkillForm] = useState({
      name: "",
  });

  //Creation de compétence dans la base de données
  const { data: skill, error, loading: skillLoading, fetchData: fetchDataSkill } = useFetch({ url: "/skill", method: "POST", body: skillForm, token: token });

  //Obtenir le token
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  //Si le token existe, on peut creer la compétence
  useEffect(() => {
    if (token != null){
      fetchDataSkill();
    }
  }, [token]);

  //REmplir les champs du formulaire
  const handleChange = (e) => {
    console.log(skillForm);
    setSkillForm({
      ...skillForm,
      [e.target.name]: e.target.value
    })
  }

  //Quand on clique, cela crée une compétence s'il y a pas d'erreur
  const submitRegister = (e) => {
    e.preventDefault();
    fetchDataSkill();
    if(error){
      console.log(error);
    }
  }

  //Si tout est ok, cela vous diriger à la page en disant que la compétence a bien été créée
  useEffect(() => {
    if (skill.success == true){
      router.push('/admin/skill');
      alert('La compétence a bien été créée !')
    }
  }, [skill]);

  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
            <div className={styles.container}>
              <Title title="Création de compétence" Level="h1" />
              <form onSubmit={(e) => submitRegister(e)}>
                <Label text="Nom"/>
                <Input
                  type="text"
                  name="name"
                  isRequired={true}
                  placeholder="veuillez saisir le nom de la compétence"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={skillForm.name}
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

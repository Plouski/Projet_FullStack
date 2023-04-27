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


const Index = () => {

    const router = useRouter();

    const { isLogged, user} = useContext(UserContext);

    const [token, setToken] = useState();

    const [skillForm, setSkillForm] = useState({
        name: "",
    });

  const { data: skill, error, loading: skillLoading, fetchData: fetchDataSkill } = useFetch({ url: "/skill", method: "POST", body: skillForm, token: token });

  const handleChange = (e) => {
    console.log(skillForm);
    setSkillForm({
      ...skillForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (token != null){
      fetchDataSkill();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  const submitRegister = (e) => {
    e.preventDefault();
    fetchDataSkill();
    try {
        router.push('/admin/skill')
        alert('La compétence a bien été créée !')
      }
      catch (error){
        console.log(error);
      }
  }

  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
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
          </>
        ) : ( 
          <Erreur_type />
        )
      }
    </>
  );
}

export default Index;

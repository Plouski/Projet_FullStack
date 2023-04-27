import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Loading from "@/components/UI/Loading";
import Button from "@/components/UI/Button";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Title from "@/components/UI/Title";
import Modal from "@/components/UI/Modal";
import Alert from '@mui/material/Alert';
import Image from "../../../../../../public/images/images/maj.png";
import Container from "@/components/UI/Container";
import Paragraphe from "@/components/UI/Paragraphe"
import Input from "@/components/UI/Input";


const Index = () => {

  const router = useRouter();

  const { isLogged, user} = useContext(UserContext);

  const [id, setId] = useState();
  
  const [token, setToken] = useState();
  
  const [skillForm, setSkillForm] = useState({
    name: "",
  });

  const [isOpen , setIsOpen] = useState(false);

  let {data , loading, error, fetchData} = useFetch({url:`/skill/${id}`,method:"PUT", body:skillForm, token:token})
  //const {data: dataUpdate, error:errorUpdate, loading:loadingUpdate, fetchData:fetchDataUpdate} = useFetch({url:`/skill/${id}`, method:"PUT", body:skillForm, token:token})
    
  useEffect(() => {
    setSkillForm()
  }, []);

  useEffect(() => {
    if (token != null){
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id);
    }
    if (id) {
      fetchData();
    }
  }, [router.isReady, id])

  data = {...data.skill}

  // useEffect(() => {
  //   if (dataUpdate.success) {
  //     setIsOpen(false);
  //     updateUser(dataUpdate.user)
  //   }
  // }, [dataUpdate]);

  if (loading) return <Loading />
  if (error) console.log(error);

  const handleChange = (e) => {
    setSkillForm({ 
      ...skillForm, 
      [e.target.name]: e.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setToken(token);
    fetchData();
    if (data) {
      router.push('/admin/skill')
      alert ('La compétence a bien été modifiée !')
    }
  }

  console.log(data)

  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
          {
              isOpen && (
                <Modal title="Mettre à jour cette compétence" closeModal={()=>setIsOpen(false)}>
                    {
                        error &&
                        (
                            <Alert severity="error">Oups, une erreur s'est produite. Veuillez cliquer le bouton puis réinitialiser.</Alert>
                        ) 
                    }<br/>
                    <form onSubmit={(e) => {submitForm(e)}}>
                      <Input 
                      label="Compétence" 
                      type="text" 
                      name="skill" 
                      value={skillForm?.name}
                      isRequired={true}
                      placeholder="entrer la compétence"
                      onChange={(e) => handleChange(e)}
                      />
                      <Button type="submit" title="Modifier" className="btn__primary"/>
                    </form>
                </Modal>
              )
            }
            <Container>
            <div className={styles.wrapper}>
            <div className={styles.deux_colonnes}>
                <div className={styles.box_1}>
                    <Title Level="h1" title="Mise à jour de cette compétence"/>
                    <Paragraphe text={data.name} /><br/>
                    <Button title="Modifier" className="btn__primary" type="button" handleClick={ 
                        () => {
                        setIsOpen(true);
                        }
                    } />
                </div>
                <div className={styles.box_2}>
                    <img src={Image.src} alt="accueil" />
                </div>
            </div>
        </div>
            </Container>
          </>
        ) : ( 
          null
        )
      }
    </>
  );
}

export default Index;

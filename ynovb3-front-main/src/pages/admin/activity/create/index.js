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
import Select from 'react-select';
import styles from "./index.module.scss";

const Index = () => {

    const router = useRouter();

    const { isLogged, user} = useContext(UserContext);

    const [token, setToken] = useState();

    const [activityForm, setActivityForm] = useState({
        name: "",
        skills: []
    });

    // const [values,setValues]=useState([])
    // const [options,setOptions]=useState()

  const { data: activity, error, loading: activityLoading, fetchData: fetchDataActivity } = useFetch({ url: "/activity", method: "POST", body: activityForm, token: token });
  const { data, loading, fetchData } = useFetch({ url: "/skill", method: "GET", body: null, token: token });

//   useEffect(()=>{
//     fetch("http://localhost:3001/api/v1/skill").then((data)=>data.json()).then((val)=>setValues(val))
//   },[])

// console.log(values,"Ca a marché !")

  const handleChange = (e) => {
    console.log(activityForm);
    setActivityForm({
      ...activityForm,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (token != null){
      fetchDataActivity();
      //fetchData();
    }
  }, [token]);

  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, []);

  const submitRegister = (e) => {
    e.preventDefault();
    fetchDataActivity();
    try {
        router.push('/admin/activity')
        alert('Le métier a bien été créé !')
      }
      catch (error){
        console.log(error);
      }
  }

  console.log(data);
  return (
    <>
      {
        isLogged && user.isAdmin === true ? (
          <>
            <div className={styles.container}>
              <Title title="Création de métier" Level="h1" />
              <form onSubmit={(e) => submitRegister(e)}>
                <Label text="Nom"/>
                <Input
                  type="text"
                  name="name"
                  isRequired={true}
                  placeholder="veuillez saisir le nom du métier"
                  required={true}
                  onChange={(e) => handleChange(e)}
                  value={activityForm.name}
                />
                {/* <Select
                  isMulti
                  name="name"
                  options={values}
                  className="basic-multi-select"
                  onChange={(e) => handleChange(e)}
                  classNamePrefix="select"
                /><br/> */}
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

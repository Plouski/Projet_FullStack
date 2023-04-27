import { useState, useContext, useEffect } from 'react';
import UserContext from "@/context/UserContext";
import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";
import Image from "../../../public/images/images/reflechir_entreprise.jpg";
import Erreur_type from "@/components/partials/Erreur_type";
import Container from "@/components/UI/Container"

const Index = () => {

  const router = useRouter();
  
  const [token, setToken] = useState();

  const { user, isLogged, logout } = useContext(UserContext);

  return (
    <>
    {
    isLogged && user.userType === 'COMPANY' ? (
          <>
            <Container>
              <Title title="Entreprise" Level="h1" />
              <div className={styles.deux_colonnes}>
                <div className={styles.box_1}>
                  <Title Level="h1" title="Que faire en etant client ?" />
                  <Paragraphe text="Remplir mes missions pour donner du travail" /><br/>
                  <Button type="button" title="Mes missions" className="btn__primary" handleClick={
                    () => router.push('entreprise/missions')}
                  /><br/><br/>
                  <Paragraphe text="Proposer un ou mes missions aux freelances" /><br/>
                  <Button type="button" title="Chercher un freelance" className="btn__primary" handleClick={
                    () => router.push('./about/freeEntreprise')}
                  />
                </div>
                <div className={styles.box_2}>
                  <img src={Image.src} alt="accueil" className={styles.image} />
                </div>
              </div>
            </Container>
          </>
          ) : ( 
          <Erreur_type />
          )
}
    </>
  );
}

export default Index;

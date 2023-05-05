import { useContext } from 'react';
import UserContext from "@/context/UserContext";
import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";
import Image from "../../../public/images/images/reflechir_freelance.jpg";
import Erreur_type from "@/components/partials/Erreur_type";
import Container from "@/components/UI/Container"

const Index = () => {

  const { user, isLogged } = useContext(UserContext);

  return (
    <>
      {
        isLogged && user.userType === 'FREELANCE' ? (
          <>
            <Container>
              <Title title="Freelance" Level="h1" />
              <div className={styles.deux_colonnes}>
                <div className={styles.box_1}>
                  <Title Level="h1" title="Que faire en etant freelance ?" />
                  <Paragraphe text="Consulter les propositions que m'ont envoyé les entreprises pour accepter ou pas" /><br/>
                  <Button type="button" title="Voir les propositions" className="btn__primary" handleClick={
                    () => router.push('/')}
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

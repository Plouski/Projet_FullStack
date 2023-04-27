import React from 'react';
import Image from "../../../public/images/images/personne.jpg";
import styles from "./index.module.scss";
import Title from "@/components/UI/Title";

const Index = ({ freelance }) => {

  return (
    <>
    <div className={styles.container}>
        <div className={styles.card}>
            <div className={styles.card_image}>
                <img src={Image.src} alt="accueil" className={styles.image} />
            </div>
            <div className={styles.card_body}>
                <div className={styles.card_title}>
                    {freelance.user?.firstName} {freelance.user?.lastName}
                </div>
                <div className={styles.card_tarif}>
                    {freelance.rate}€/jour
                </div>
                <div className={styles.card_skill}>
                    Compétences : {freelance.skills}
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Index;
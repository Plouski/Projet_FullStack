import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Title from '@/components/UI/Title';
import Paragraphe from '@/components/UI/Paragraphe';
import Entreprise from "../../../../public/images/images/client.png";
import Freelance from "../../../../public/images/images/free-lance.png";
import Fleche from "../../../../public/images/images/fleche-droite.png";
import styles from "./index.module.scss";


const Index = () => {

  return (
    <>
      <Title title="Quelle est votre situation ?" Level="h1" />
      <div className={styles.identity}>
        <Link href="/auth/register/entreprise" className={styles.card}>
          <img src={Entreprise.src} alt="accueil" className={styles.image} />
          <div className={styles.content}>
            <Title title="Entreprise" Level="h4" />
            <Paragraphe text="Je recherche des freelances" />
          </div>
          <img src={Fleche.src} alt="accueil" className={styles.icon} />
        </Link>
        <Link href="/auth/register/freelance" className={styles.card}>
          <img src={Freelance.src} alt="accueil" className={styles.image} />
          <div className={styles.content}>
            <Title title="Freelance" Level="h4" />
            <Paragraphe text="Je crée mon profil" />
          </div>
          <img src={Fleche.src} alt="accueil" className={styles.icon} />
        </Link>
      </div>
    </>
  );
}

export default Index;

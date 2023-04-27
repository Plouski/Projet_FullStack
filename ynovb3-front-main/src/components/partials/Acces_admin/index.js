import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Paragraphe from "@/components/UI/Paragraphe";
import Danger from "../../../../public/images/images/danger.png";
import Title from "@/components/UI/Title"
import Link from 'next/link';

const Index = () => {

  return (
    <div className={styles.deux_colonnes}>
        <div className={styles.box_1}>
            <Title Level="h1" title="Accès aux administrateurs" />
            <Link href="/">Pour continuer, cliquez ici</Link>
        </div>
        <div className={styles.box_2}>
            <img src={Danger.src} alt="accueil" className={styles.image} />
        </div>
    </div>
  );
}

export default Index;

import { useContext } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Paragraphe from "@/components/UI/Paragraphe";
import Logo from "../../../../public/images/logo/Vista Logos/logo-svg.svg";
import Title from "@/components/UI/Title"
import Link from 'next/link';

const Index = () => {

  
  const router = useRouter();
  
  const { user, isLogged, logout } = useContext(UserContext);

  // const menu = [
  //   {
  //     title: "About",
  //     link: "./about",
  //     className:styles.nav__item
  //   },
  // ]

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <Link href="/">
              <img src={Logo.src} alt="FreeEntreprise" />
            </Link><br/>
            <div className={styles.informations}>
              <p>12 Rue Anatole France, 92000 Nanterre" </p><br/>
              <p>01 42 20 69 57" </p><br/>
            </div>
          </div>
          <div className={styles.column}>
            <Title Level="h4" title="Pour les entreprises" />
            <Link href="/about/entreprise">Pourquoi FreeEntreprise ?</Link>
          </div>
          <div className={styles.column}>
            <Title Level="h4" title="Pour les freelances" />
            <Link href="/about/freelance">Pourquoi FreeEntreprise ?</Link>
          </div>
          <div className={styles.column}>
            <Title Level="h4" title="FreeEntreprise" />
            <Link href="/about/freeEntreprise">A propos de </Link>
          </div>
        </div>
        <div className={styles.copyright}>© 2023 FREEENTREPRISE. ALL RIGHTS RESERVED.</div>
      </div>
    </div>

  );
}

export default Index;

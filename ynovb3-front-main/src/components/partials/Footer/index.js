import styles from "./index.module.scss";
import Logo from "../../../../public/images/logo/Vista Logos/logo-svg.svg";
import Title from "@/components/UI/Title"
import Link from 'next/link';

const Index = () => {

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.about}>
              <Link href="/">
                <img src={Logo.src} alt="FreeEntreprise" />
              </Link>
              <div className={styles.informations}>
                <p>12 Rue Anatole France, 92000 Nanterre" </p><br/>
                <p>01 42 20 69 57" </p><br/>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <Title Level="h4" title="Pour les entreprises" />
            <Link href="/about/entreprise">En savoir plus</Link>
          </div>
          <div className={styles.column}>
            <Title Level="h4" title="Pour les freelances" />
            <Link href="/about/freelance">En savoir plus</Link>
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

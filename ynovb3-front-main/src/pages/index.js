import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";
import Section_final from "@/components/partials/Section_finale_accueil";
import Image from "../../public/images/images/freelance_entreprise.jpg";
import Freelance from "../../public/images/images/freelance.png";
import Entreprise from "../../public/images/images/entreprise.png";
import Solution from "../../public/images/images/solution.png";
import Container from "@/components/UI/Container"

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Container>
        <div className={styles.section_accueil}>
          <div className={styles.deux_colonnes}>
            <div className={styles.box_1}>
              <Title Level="h1" title="Entreprises & freelances étaient faits pour se rencontrer" />
              <Paragraphe text="Trouvez le talent parfait pour propulser vos projets !" /><br/>
              <Button type="button" title="En savoir plus" className="btn__primary" handleClick={
                () => router.push('./about/freeEntreprise')
              }/>
            </div>
            <div className={styles.box_2}>
              <img src={Image.src} alt="accueil" className={styles.image} />
            </div>
          </div>
        </div>
        <div className={styles.section_second}>
          <Title Level="h2" title="FreeEntreprise c'est avant tout une communauté"/>
          <Paragraphe text="Où freelances et entreprises se retrouvent sur une marketplace, pour collaborer en toute simplicité." />
          <div className={styles.trois_colonnes}>
            <div className={styles.box_1}>
              <img src={Entreprise.src} alt="accueil" className={styles.icon} />
              <Title Level="h4" title="50K entreprises" />
              <Paragraphe text="À la recherche de freelances confirmés" />
            </div>
            <div className={styles.box_2}>
              <img src={Freelance.src} alt="accueil" className={styles.icon} />
              <Title Level="h4" title="+400K freelances" />
              <Paragraphe text="Aux multiples compétences" />
            </div>
            <div className={styles.box_3}>
              <img src={Solution.src} alt="accueil" className={styles.icon} />
              <Title Level="h4" title="1 solution dédiée" />
              <Paragraphe text="Pensée et conçue pour collaborer" />
            </div>
          </div>
        </div>
        <Section_final />
      </Container>
    </>
  )
}

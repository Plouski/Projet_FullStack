import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";
import Section_final from "@/components/partials/Section_finale_accueil";
import Image from "../../../../public/images/images/freelance_entreprise.jpg";
import Freelance from "../../../../public/images/images/freelance.png";
import Entreprise from "../../../../public/images/images/entreprise.png";
import Solution from "../../../../public/images/images/solution.png";
import Container from "@/components/UI/Container"

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Container>
      <div className={styles.container}>
          <Button type="button" title="Créer une mission" className="btn__primary" handleClick={
            () => router.push('./about/freeEntreprise') 
          }/>
          <Button type="button" title="En savoir plus" className="btn__primary" handleClick={
            () => router.push('./about/freeEntreprise')
          }/>
          <Button type="button" title="En savoir plus" className="btn__primary" handleClick={
            () => router.push('./about/freeEntreprise')
          }/>
      </div>
      </Container>
    </>
  )
}

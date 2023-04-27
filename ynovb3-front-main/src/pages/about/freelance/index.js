import Title from "@/components/UI/Title"
import Paragraphe from "@/components/UI/Paragraphe"
import Container from "@/components/UI/Container"
import Section_freelance from "@/components/partials/Section_freelance"
import Image from "../../../../public/images/images/freelance.jpg";
import One from "../../../../public/images/images/number-1.png";
import Two from "../../../../public/images/images/number-2.png";
import Three from "../../../../public/images/images/number-3.png";
import Freelance from "../../../../public/images/images/objectif.jpg";

import styles from "./index.module.scss";

const Index = () => {
    return (
        <Container>
            <div className={styles.section_accueil}>
                <div className={styles.deux_colonnes}>
                    <div className={styles.box_1}>
                        <Title Level="h1" title="Ma vie de freelance, mais en mieux" />
                        <Paragraphe text="Recevez des offres de missions en adéquation avec vos compétences, 
                        communiquez directement avec 50 000 clients potentiels issus de tous les secteurs 
                        et réduisez vos tâches administratives à l'aide de nos outils en ligne." /><br/> 
                    </div>
                    <div className={styles.box_2}>
                        <img src={Image.src} alt="accueil" className={styles.image} /> 
                    </div>
                </div>
            </div>
            <div className={styles.section_second}>
                <div className={styles.deux_colonnes}>
                    <div className={styles.box_1}>
                        <img src={Freelance.src} alt="accueil" className={styles.image} />
                    </div>
                    <div className={styles.box_2}>
                        <div>
                            <Title Level="h3" title="Finie la prospection !" />
                            <Paragraphe text="Recevez des offres de missions en adéquation avec vos compétences et communiquez directement avec 50 000 clients potentiels issus de tous les secteurs" />
                        </div>
                        <div>
                            <Title Level="h3" title="Concentrez vous sur la mission, pas sur l'administratif" />
                            <Paragraphe text="Créez des devis, suivez vos missions, automatisez vos factures, le tout en quelques clics. Toutes les missions FreeEntreprise sont automatiquement garanties." />
                        </div>
                        <div>
                            <Title Level="h3" title="Faites-vous payer rapidement" />
                            <Paragraphe text="Plus de relances de paiement : une fois la mission terminée, faites-vouspayer en 3 jours ouvrables" />
                        </div>
                        <div>
                            <Title Level="h3" title="Découvrez un univers entier dédié au freelances" />
                            <Paragraphe text="Rejoignez une vaste communauté de freelances par le biais d'évènements, de ressources, de formations et bien plus encore." />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.section_three}>
                <Title Level="h2" title="Trouver des missions n'a jamais été aussi simple" />
                <Paragraphe text="De la création de compte au paiement, FreeEntreprise accompagne votre collaboration." />
                <div className={styles.trois_colonnes}>
                    <div className={styles.box_1}>
                        <img src={One.src} alt="accueil" className={styles.number} /> 
                        <Title Level="h4" title="Renseignez votre profil" />
                        <Paragraphe text="Décrivez vos compétences, votre expériences et la manière dont vous souhaitez travailler." />
                    </div>
                    <div className={styles.box_2}>
                        <img src={Two.src} alt="accueil" className={styles.number} /> 
                        <Title Level="h4" title="Recevez des propositions" />
                        <Paragraphe text="Recevez des propositions de missions de clients issus de tous les secteurs, et discutez-en avec eux." />
                    </div>
                    <div className={styles.box_3}>
                        <img src={Three.src} alt="accueil" className={styles.number} /> 
                        <Title Level="h4" title="Travaillez en toute confiance" />
                        <Paragraphe text="Lancez vos projets en gardant l'esprit tranquille, grâce à l'assurance Axa et au paiement garanti en 3 jours ouvrables." />
                    </div>
                </div>
            </div>
            <Section_freelance />
        </Container>
    );
}

export default Index;

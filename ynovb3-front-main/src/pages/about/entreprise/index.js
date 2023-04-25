import Title from "@/components/UI/Title"
import Paragraphe from "@/components/UI/Paragraphe"
import Container from "@/components/UI/Container";
import Section_final from "@/components/partials/Section_finale";
import Image from "../../../../public/images/images/about_freelance.png";
import Freelance from "../../../../public/images/images/freelance.jpg";
import styles from "./index.module.scss";

const Index = () => {
    return (
        <Container>
            <div className={styles.section_accueil}>
                <div className={styles.deux_colonnes}>
                    <div className={styles.box_1}>
                        <img src={Image.src} alt="accueil" className={styles.image} />
                    </div>
                    <div className={styles.box_2}>
                        <Title Level="h1" title="Les freelances qui vont vous faire prendre de l’avance" />
                        <Paragraphe text="FreeEntreprise est une marketplace qui vous permet de trouver des freelances qualifiés, pour tous types de projets." /><br/>
                    </div>
                </div>
            </div>
            <div className={styles.section_second}>
                <div className={styles.deux_colonnes}>
                    <div className={styles.box_1}>
                        <div>
                            <Title Level="h3" title="Démarrez en un clin d'œil" />
                            <Paragraphe text="Recevez une réponse en quelques heures et démarrez votre mission en quelques jours." />
                        </div>
                        <div>
                            <Title Level="h3" title="Gardez l'esprit tranquille" />
                            <Paragraphe text="Paiement en ligne sécurisé, commentaires et évaluations, missions protégées par Axa, et profils de freelances vérifiés." />
                        </div>
                        <div>
                            <Title Level="h3" title="Gagnez un temps précieux" />
                            <Paragraphe text="Consacrez 10 fois moins de temps à vos tâches administratives et comptables grâce aux contrats automatisés et à la vérification légale, aux devis et factures centralisés, et aux signatures numériques d'accords de confidentialité." />
                        </div>
                        <div>
                            <Title Level="h3" title="Collaborez avec les meilleurs talents" />
                            <Paragraphe text="Créé pour et par des freelances, Malt attire et nourrit les meilleurs talents. Nos équipes dédiées à la réussite des freelances soutiennent leurs carrières et le développement de leurs compétences." />
                        </div>
                    </div>
                    <div className={styles.box_2}>
                        <img src={Freelance.src} alt="accueil" className={styles.image} />
                    </div>
                </div>
            </div>
            <Section_final/>
        </Container>
    );
}

export default Index;

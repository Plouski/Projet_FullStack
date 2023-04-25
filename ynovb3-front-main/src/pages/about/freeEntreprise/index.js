import Title from "@/components/UI/Title"
import Paragraphe from "@/components/UI/Paragraphe"
import Container from "@/components/UI/Container"
import Image from "../../../../public/images/images/FreeEntreprise.jpg";

const Index = () => {
  return (
    <Container>
      <Title 
      Level="h1" title="Notre mission : créer un monde où chacun est libre de travailler avec les personnes de son choix."/>
      <Paragraphe 
      text="Chez FreeEntreprise, nous croyons en une nouvelle révolution du monde du travail. 
      Un monde où nous pouvons choisir la manière dont nous voulons travailler. Avec qui travailler"/><br/>
      <Paragraphe 
      text="Nous voulons offrir à notre communauté de freelances et d’entreprises un lieu d’opportunités. De choix. D’expertise. 
      Des moyens pour devenir plus agile, innovant et compétitif. Un algorithme de pointe pour trouver la bonne personne. 
      Des outils simples et une plateforme sécurisée pour faciliter l’administratif. " /><br/>
      <Paragraphe 
      text="Avec déjà plus de 100 000 projets réalisés avec succès, nous sommes fiers d’être aujourd’hui la plus importante communauté de freelancing en Europe." /><br/>
      <img src={Image.src} alt="accueil" />
    </Container>
  );
}

export default Index;

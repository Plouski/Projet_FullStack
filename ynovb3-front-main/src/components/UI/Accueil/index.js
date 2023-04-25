import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import styles from "./index.module.scss";
import Button from "@/components/UI/Button";

const Index = ({ text, title, handleClick, src }) => {
  return (
    <div className={styles.container}>
        <div className={styles.deux_colonnes}>
        <div className={styles.box_1}>
            <Title Level="h1" title={title} />
            <Paragraphe text={text} /><br/>
            <Button type="button" title={title} className="btn__primary" handleClick={handleClick}/>
        </div>
        <div className={styles.box_2}>
            <img src={src} alt="accueil" className={styles.image} />
        </div>
        </div>
    </div>
        
  )
}

export default Index;

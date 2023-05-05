import styles from "./index.module.scss";
import { useRouter } from 'next/router';
import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";

const Index = ({ product }) => {
  
  const router = useRouter();

  // console.log(product, "props product")
  
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Title Level="h2" title={product.title} />
        <Title Level="h4" title={product.status} />
        <div className={styles.date}>
          <p>{product.dateStart} - {product.dateEnd}</p>
        </div><br/>
        <div className={styles.amount}>
          <p>Montant : {product.amount}</p>
        </div><br/>
        <div className={styles.description}>
          <p>Description : {product.description}</p>
        </div><br/>
        <Button type="button" title="Modifier" className="btn__secondary" handleClick={
            () => router.push(`missions/update/${product._id}`)
        }/>
        <Button type="button" title="Supprimer" className="btn__primary" handleClick={
            () => router.push(`missions/delete/${product._id}`)
        }/>
      </div>
    </div>
  );
}

export default Index;

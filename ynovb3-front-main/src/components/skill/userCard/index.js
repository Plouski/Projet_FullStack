import styles from "./index.module.scss";
import { useRouter } from 'next/router';
import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";

const Index = ({ product }) => {
  
  const router = useRouter();
    
  // console.log(product)
  
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Title Level="h2" title={product.name} />
        <Button type="button" title="Modifier" className="btn__secondary" handleClick={
            () => router.push(`skill/update/${product._id}`)
        }/>
        <Button type="button" title="Supprimer" className="btn__primary" handleClick={
            () => router.push(`skill/delete/${product._id}`)
        }/>
      </div>
    </div>
  );
}

export default Index;

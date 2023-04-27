import styles from "./index.module.scss";
import { useRouter } from 'next/router';
import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";
import ProductGrid from "@/components/skill/userGrid";

const Index = ({ product }) => {
  console.log(product, "props product")
  const router = useRouter();
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Title Level="h2" title={product.name} />
        <div className={styles.other_card}>
          {
            <ProductGrid products={product.skills}/>
          }
        </div>
        <Button type="button" title="Modifier" className="btn__secondary" handleClick={
            () => router.push(`activity/update/${product._id}`)
        }/>
        <Button type="button" title="Supprimer" className="btn__primary" handleClick={
            () => router.push(`activity/delete/${product._id}`)
        }/>
      </div>
    </div>
  );
}

export default Index;
import styles from "./index.module.scss";
import { useRouter } from 'next/router';
import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";

const Index = ({ product }) => {

  //console.log(product, "props product")

  const router = useRouter();
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Title Level="h4" title={product.userType} />
        <div className={styles.top_row}>
          <div className={styles.field_wrap}>
              <p>Prénom : {product.firstName}</p>
            </div>
            <div className={styles.field_wrap}>
              <p>Nom : {product.lastName}</p>
            </div>
        </div>
        <p>Email : {product.email}</p>
        <p>Numéro de portable : {product.phone}</p><br/>
        <Button type="button" title="Supprimer" className="btn__primary" handleClick={
            () => router.push(`user/${product._id}`)
        }/>
      </div>
    </div>
  );
}

export default Index;

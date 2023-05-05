import styles from "./index.module.scss";
import ProductCard from "@/components/user/userCard";

const Index = ({ products }) => {

  // console.log(products);
  
  return (
    <div className={styles.wrapper}>
      {
        products && products.map(product => (
          <ProductCard key={product._id} product={product}/>
        ))
      }
    </div>
  );
}

export default Index;

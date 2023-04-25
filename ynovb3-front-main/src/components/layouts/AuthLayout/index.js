import React from 'react';
import Footer from "@/components/partials/Footer";
import styles from "./index.module.scss";
import Image from "../../../../public/images/backgroundimage/VARIANT_BLEU_CLAIR.png";


const Index = ({ children }) => {
  return (
    <>
      <div className={styles.wrapper}>
          {children}
      </div>
      <div className={styles.centrer_image}>
        <img src={Image.src} alt="accueil" className={styles.image} /> 
      </div>
      <Footer/>
    </>
  );
}

export default Index;

import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import styles from "./index.module.scss";

const MainLayout = ({ children }) => {
  
  return (
    <>
      <Header/>
      <div className={styles.wrapper}>
        {children}
      </div>
      <Footer/>
    </>
  );
}

export default MainLayout;
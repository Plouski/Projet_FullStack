import React from 'react';
import styles from "./index.module.scss";

const Index = ({children}) => {

  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
}

export default Index;

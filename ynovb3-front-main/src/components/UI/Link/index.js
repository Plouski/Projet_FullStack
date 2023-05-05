import React from 'react';
import styles from "./index.module.scss";

const Index = ({label, text}) => {

  return (
    <div className={styles.wrapper}>
      <a href={text} />
      {
        label && (
          <label>{label}</label>
        )
      }
    </div>
  );
}

export default Index;

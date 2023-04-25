import React from 'react';
import styles from "./index.module.scss";
import Link from 'next/link';

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

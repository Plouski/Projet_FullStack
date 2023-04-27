import React from 'react';
import Title from '../../UI/Title';
import Button from '../../UI/Button';
import styles from "./index.module.scss";
import { useRouter } from 'next/router';

const Index = ({}) => {
    const router = useRouter();
    return (
        <div className={styles.wrapper}>
            <Title Level="h3" title="Rejoignez FreeEntreprise, la communauté qui enchaîne les succès"/>
            <div className={styles.buttonswrapper}>
                <div className={styles.button_first}>
                <Button type="button" title="Je cherche des freelances" className="btn__primary" handleClick={
                    () => router.push('/about/entreprise')
                }/>
                </div>
                <div className={styles.button_second}>
                <Button type="button" title="Je cherche des missions" className="btn__secondary" handleClick={
                    () => router.push('/about/freelance')
                }/>
                </div>
            </div>
        </div>
    );
}

export default Index;

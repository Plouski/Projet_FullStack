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
            <Button type="button" title="Savoir la vie de freelance" className="btn__primary" handleClick={
                () => router.push('/about/freelance')
            }/>
        </div>
    );
}
export default Index;
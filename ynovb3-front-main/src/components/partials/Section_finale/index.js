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
            <Button type="button" title="Créer mon compte" className="btn__primary" handleClick={
                () => router.push('/auth/register')
            }/>
        </div>
    );
}

export default Index;
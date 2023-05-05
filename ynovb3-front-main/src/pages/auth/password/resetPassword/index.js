import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button/';
import Title from '@/components/UI/Title';
import Notification from '@/components/UI/Notification';
import Label from '@/components/UI/Label';
const index = () => {

    const [passwordForm, setPasswordForm] = useState({
        password: '',
    });

    const [token, setToken] = useState();

    const { fetchData, data, error, loading } = useFetch({url: '/user/reset-password', method: 'POST', body: passwordForm, token: token});

    //Obtenir le token
    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, []);

    //Si token existe, on peut créér et afficher
    useEffect(() => {
    if (token != null){
        fetchData();
    }
    }, [token]);

    //Remplir les champs fu formulaire
    const handleChange = (e) => {
        setPasswordForm({
        ...passwordForm,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <>
        <Title title="Réinitialisation de mot de passe" Level="h1" />
        <form onSubmit={handleSubmit}>
            <Label text="Nouveau mot de passe"/>
            <Input
            type="password"
            name="password"
            placeholder="Entrez votre nouveau mot de passe"
            isRequired={true}
            onChange={handleChange}
            value={passwordForm.password}
            />
            <Button
            type="submit"
            title="Réinitialiser"
            className="btn__primary"
            disabled={loading}
            />
        </form>
        {/* {data && <Notification type="success" message={data.message} />} */}
        {error && <Notification type="warning" message={error.message} />}
        </>
    );
};

export default index;
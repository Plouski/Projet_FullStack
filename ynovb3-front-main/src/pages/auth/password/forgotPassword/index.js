import {useState } from 'react';
import useFetch from '@/hooks/useFetch';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button/';
import Title from '@/components/UI/Title';
import Notification from '@/components/UI/Notification';
import Label from '@/components/UI/Label';

const index = () => {
  const [passwordForm, setPasswordForm] = useState({
    email:''
  });

  const { fetchData, error, loading } = useFetch({url: '/user/forgot-password', method: 'POST', body: passwordForm, token: null });

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    if (error) console.log(error);
  };

  return (
    <>
      <Title title="Mot de passe oublié" Level="h1" />
      <form onSubmit={handleSubmit}>
        <Label text="Email"/>
        <Input
          type="email"
          name="email"
          placeholder="Veuillez saisir votre email"
          isRequired={true}
          onChange={handleChange}
          value={passwordForm.email}
        />
        <Button
          type="submit"
          title="Envoyer"
          className="btn__primary"
          disabled={loading}
        />
      </form>
      {
        error && (
          <Notification type="warning" message={error.message}/>
        )
      }
    </>
  );
};

export default index;
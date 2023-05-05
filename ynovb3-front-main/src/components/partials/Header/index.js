import { useContext, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import UserContext from "@/context/UserContext";
import Logo from "../../../../public/images/logo/Vista Logos/logo-svg.svg";
import Home from "../../../../public/images/images/home.png";
import NavItem from "@/components/UI/NavItem";
import Button from "@/components/UI/Button";
import Link from 'next/link';

const Index = () => {

  const router = useRouter();
  
  const { user, isLogged, logout } = useContext(UserContext);

  // console.log(user);

  const menu = [
    {
      title: "A propos de FreeEntreprise",
      link: "/about/freeEntreprise",
      className:styles.nav__item
    },
  ]

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={`${styles.wrapper} flex`}>
      <div className={styles.left}>
        <Link href="/">
          <img src={Logo.src} alt="FreeEntreprise" />
        </Link>
        <Button type="button" title="Voir les freelances" className="btn__secondary" handleClick={
          () => router.push('/search')
        }/>
      </div>   
      {
        isLogged ? (
          <>
            <span>
              {user?.firstName}
            </span>
          </>
          ) : null
      }
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          {/* ROLE COMPANY */}
          {
            user?.userType === 'COMPANY'  ? (
              <>
                <li className={styles.nav__item}>
                  <Button type="button" title="Proposer à un freelance" className="btn__secondary" handleClick={
                    () => router.push('/')
                  }/>
                </li>
                <li className={styles.nav__item}>
                  <Button type="button" title="Mes missions" className="btn__secondary" handleClick={
                    () => router.push('/entreprise/missions')
                  }/>
                </li>
                <li className={styles.nav__item}>
                  <Button type="button" title="Voir mon profil" className="btn__secondary" handleClick={
                    () => router.push('/account/profil')
                  }/>
                </li>
                <li className={styles.nav__item}>
                  <div className={styles.icon}>
                    <Link href="/entreprise">
                      <img src={Home.src} alt="home" />
                    </Link>
                  </div>
                </li>
              </>
            ) : null
          }
          {/* ROLE FREELANCE */}
          {
            user?.userType === 'FREELANCE' ? (
              <>
                <li className={styles.nav__item}>
                  <Button type="button" title="Propositions" className="btn__secondary" handleClick={
                    () => router.push('/')
                  }/>
                </li>
                <li className={styles.nav__item}>
                  <Button type="button" title="Voir mon profil" className="btn__secondary" handleClick={
                    () => router.push('/account/profil')
                  }/>
                </li>
                <li className={styles.nav__item}>
                  <div className={styles.icon}>
                    <Link href="/freelance">
                      <img src={Home.src} alt="home" />
                    </Link>
                  </div>
                </li>
              </>
            ) : null
          }
          {/* ROLE ADMIN */}
          {
            user?.isAdmin === true ? (
              <>
                <li className={styles.nav__item}>
                  <div className={styles.dropdown}>
                    <button onClick={handleOpen}>
                      Consulter
                      {open ? (
                        <ul className={styles.menu}>
                          <li className={styles.menu_item}>
                            <Link href="/admin/user">Utilisateur</Link>
                          </li>
                          <li className={styles.menu_item}>
                            <Link href="/admin/activity">Métier</Link>
                          </li>
                          <li className={styles.menu_item}>
                            <Link href="/admin/skill">Compétence</Link>
                          </li>
                          <li className={styles.menu_item}>
                            <Link href="/admin/mission">Mission</Link>
                          </li>
                        </ul>
                      ) : null}
                    </button>
                  </div>
                </li>
              </>
            ) : null
          }
          {
            isLogged ? (
              <>
                <li className={styles.nav__item}>
                  <Button type="button" title="Deconnexion" className="btn__primary" handleClick={
                    () => logout()
                  } />
                </li>
              </>
              ) : ( 
              <>
                {
                  menu.map((item, index) => (
                    <NavItem key={index} item={item} />
                  ))
                }
                <li className={styles.nav__item}>
                  <Button type="button" title="Inscription" className="btn__secondary" handleClick={
                    () => router.push('/auth/register')
                  }/>
                </li>               
                <li className={styles.nav__item}>
                  <Button type="button" title="Connexion" className="btn__primary" handleClick={
                    () => router.push('/auth/login')
                  }/>
                </li>
              </>
            )
          }
        </ul>
      </nav>
    </div>
  );
}

export default Index;

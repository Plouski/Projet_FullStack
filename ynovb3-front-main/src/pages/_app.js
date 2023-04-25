import { useState } from 'react';
import '@/styles/globals.scss';
import { useRouter } from "next/router";
import MainLayout from '@/components/layouts/MainLayout';
import AuthLayout from '@/components/layouts/AuthLayout';
import CompanyLayout from '@/components/layouts/CompanyLayout';
import { UserContextProvider } from '@/context/UserContext';

export default function App({ Component, pageProps }) {
  const company = useState ({
    userType: 'COMPANY'
   })

  const router = useRouter();

  return (
    <>
      <UserContextProvider>
      {
        router.asPath.startsWith("/auth") ? (
          <AuthLayout>
              <Component {...pageProps} />
          </AuthLayout>
        )
        : (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
        )
      }
      </UserContextProvider>
      {/* <UserContextProvider value={company}>
        <CompanyLayout>
            <Component {...pageProps} />
        </CompanyLayout>
      </UserContextProvider> */}
    </>
  )
}
import Title from "@/components/UI/Title";
import Paragraphe from "@/components/UI/Paragraphe";
import { useRouter } from 'next/router';
import styles from "./index.module.scss";
import Container from "@/components/UI/Container"

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Container>
      <Title Level="h1" title="Admin" />
      </Container>
    </>
  )
}

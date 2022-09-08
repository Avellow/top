import { Button, Htag } from '../components';

export default function Home() {

  return (
    <>
      <Htag tag='h1'>Курсы по Photoshop</Htag>
      <Button appearance='primary' arrow='down'>Узнать подробнее</Button>
      <Button appearance='ghost' arrow='right'>Читать отзывы</Button>
    </>
  );
}

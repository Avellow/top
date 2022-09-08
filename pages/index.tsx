import { Button, Htag, P, Tag } from '../components';

export default function Home() {

  return (
    <>
      <Htag tag='h1'>Курсы по Photoshop</Htag>
      <Button appearance='primary' arrow='down'>Узнать подробнее</Button>
      <Button appearance='ghost' arrow='right'>Читать отзывы</Button>
      <P size='l'>Большой</P>
      <P size='m'>Средний</P>
      <P size='s'>Мелкий</P>

      <Tag size='m' color='grey'>Тег</Tag>
      <Tag size='s' color='ghost'>Тег</Tag>
      <Tag size='s' color='primary'>Тег Pri</Tag>
      <Tag size='m' color='red'>Тег RED</Tag>
      <Tag size='s' color='green'>Тег GREEN</Tag>

    </>
  );
}

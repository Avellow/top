import { GetStaticProps } from 'next';
import { useState } from 'react';
import {Button, Htag, P, Tag, Rating, Input, Textarea} from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import {API} from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {

  const [rating, setRating] = useState<number>(3);

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

      <Rating rating={rating} isEditable={true} setRating={setRating} />

        <Input placeholder='Имя'/>
        <Textarea placeholder='Текст отзыва' />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(
    API.topPage.find,
    { firstCategory }
  );

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}

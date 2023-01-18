import {TopPageComponentProps} from './TopPageComponent.props';
import {HhData, Htag, Sort, Tag} from "../../components";
import styles from './TopPageComponent.module.css';
import {TopLevelCategory} from "../../interfaces/toppage.interface";
import {Advantages} from "../../components/Advantages/Advantages";
import {SortEnum} from "../../components/Sort/Sort.props";
import {useReducer} from "react";
import {sortReducer} from "./sort.reducer";

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {

    const [{products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag color='grey' size='m'>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort}/>
      </div>
        <div>
            {sortedProducts && sortedProducts.map(p => (<div key={p._id}>{p.title}</div>))}
        </div>
        <div className={styles.hhTitle}>
            <Htag tag='h2'>Вакансии - {page.category}</Htag>
            <Tag color='red' size='m'>hh.ru</Tag>
        </div>
        {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
        {page.advantages && page.advantages.length > 0 &&
            (<Advantages advantages={page.advantages} />)
        }
        {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }}/>}
        {/* !!! Если будет неизвестно откуда прилетит сео текст, следует удалить аттрибут
        dangerouslySetInnerHTML и использовать библиотеку html-react-parser !!! */}
        {page.tags && page.tags.length > 0 && (
            <>
                <Htag tag='h2'>Получаемые навыки</Htag>
                {page.tags.map((tag, i) => (
                    <Tag key={i} color='primary'>{tag}</Tag>
                ))}
            </>
        )}
    </div>
  );
};

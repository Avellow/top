import {TopPageComponentProps} from './TopPageComponent.props';
import {HhData, Htag, Product, Sort, Tag} from "../../components";
import styles from './TopPageComponent.module.css';
import {TopLevelCategory} from "../../interfaces/toppage.interface";
import {Advantages} from "../../components/Advantages/Advantages";
import {SortEnum} from "../../components/Sort/Sort.props";
import {useEffect, useReducer} from "react";
import {sortReducer} from "./sort.reducer";
import {useScrollY} from "../../hooks/useScrollY";

export const TopPageComponent = ({firstCategory, page, products}: TopPageComponentProps): JSX.Element => {

    const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {products, sort: SortEnum.Rating});

    const y = useScrollY();

    const setSort = (sort: SortEnum) => {
        dispatchSort({type: sort});
    };

    useEffect(() => {
        dispatchSort({type: 'reset', initialState: products});
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {products &&
                <Tag color='grey' size='m' aria-label={products.length + ' элементов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort}/>
            </div>
            <div role='list'>
                {sortedProducts && sortedProducts.map(p => (<Product role='listitem' layout key={p._id} product={p}/>))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 &&
            (<Advantages advantages={page.advantages}/>)
            }
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}}/>}
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

import {SortEnum, SortProps} from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './Sort.svg';

export const Sort = ({sort, setSort, className, ...props}: SortProps): JSX.Element => {

    const handleRatingClick = () => setSort(SortEnum.Rating);
    const handlePriceClick = () => setSort(SortEnum.Price);

    return (
        <div className={cn(styles.sort, className)} {...props}>
      <span
          onClick={handleRatingClick}
          className={cn({
              [styles.active]: sort === SortEnum.Rating
          })}
      >
        <SortIcon className={styles.sortIcon}/> По рейтингу
      </span>
            <span
                onClick={handlePriceClick}
                className={cn({
                    [styles.active]: sort === SortEnum.Price
                })}
            >
        <SortIcon className={styles.sortIcon}/> По цене
      </span>
        </div>
    );
};

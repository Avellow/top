import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';

export const Tag = ({ size = 'm', color = 'ghost', href, children, className, ...rest }: TagProps): JSX.Element => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.ghost]: color == 'ghost',
        [styles.grey]: color == 'grey',
        [styles.red]: color == 'red',
        [styles.primary]: color == 'primary',
        [styles.green]: color == 'green',
      })}
      {...rest}
    >
      {href
        ? <a href={href}>{children}</a>
        : <>{children}</>
      }
    </div>
  );
};

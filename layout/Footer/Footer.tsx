import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';
import cn from 'classnames';
import { format } from 'date-fns';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
  return (
    <footer className={cn(className, styles.footer)}>
      <p className={styles.rights}>Top &copy; {format(new Date(), 'yyyy')} Все права защищены</p>
      <a className={styles.link} href='#' target='blank'>Пользовательское соглашение</a>
      <a className={styles.link} href='#' target='blank'>Политика конфиденциальности</a>
    </footer>
  );
};
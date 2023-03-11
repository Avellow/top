import { AdvantagesProps } from './Advantages.props';
import CheckIcon from './check.svg';
import styles from './Advantages.module.css';
import { Htag } from "../Htag/Htag";
import { P } from "../P/P";

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
  return (
    <div className={styles.advantages}>
      <Htag tag='h2'>Преимущества</Htag>
      <ul className={styles.list}>
        {advantages.map(adv => (
          <li key={adv._id} className={styles.advantage}>
            <CheckIcon />
            <Htag tag='h3'>{adv.title}</Htag>
            <div className={styles.border} />
            <P size='m'>{adv.description}</P>
          </li>
        ))}
      </ul>
    </div>

  );
};

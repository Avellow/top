import {HeaderProps} from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import Logo from "../logo.svg";
import {ButtonIcon} from "../../components/ButtonIcon/ButtonIcon";
import { motion } from 'framer-motion';
import {Sidebar} from "../Sidebar/Sidebar";
import {useEffect, useState} from "react";
import { useRouter } from 'next/router';

export const Header = ({className, children, ...props}: HeaderProps): JSX.Element => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsOpened(false);
    }, [router]);

    const openMenu = () => setIsOpened(true);
    const closeMenu = () => setIsOpened(false);

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: 0,
            x: '100%',
        }
    };

    return (
        <header className={cn(className, styles.header)} {...props}>
            <Logo className={styles.logo} />
            <ButtonIcon appearance='white' icon='menu' onClick={ openMenu } />
            <motion.div
                className={styles.mobileMenu}
                variants={variants}
                initial='closed'
                animate={ isOpened ? 'opened' : 'closed' }
            >
                <Sidebar />
                <ButtonIcon className={styles.menuClose} appearance='white' icon='close' onClick={ closeMenu } />
            </motion.div>
        </header>
    );
};

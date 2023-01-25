import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {useState} from "react";
import  GlassIcon from './glass.svg';
import {useRouter} from "next/router";
import { KeyboardEvent } from 'react';

export const Search = ({className, ...props}: SearchProps): JSX.Element => {

    const [search, setSearch] = useState<string>('');
    const router = useRouter();

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const goToSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search
            }
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key == 'Enter') {
            goToSearch();
        }
    };

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input
                className={styles.input}
                placeholder='Поиск...'
                onChange={ handleChange }
                value={ search }
                onKeyDown={ handleKeyDown }
                customPadding='7px 35px 7px 12px'
            />
            <Button
                appearance='primary'
                className={styles.button}
                onClick={ goToSearch }
            >
                <GlassIcon />
            </Button>
        </div>
    );
};

import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from './close.svg';
import {useForm, Controller} from "react-hook-form";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.interface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState, KeyboardEvent} from "react";

export const ReviewForm = ({productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const handleCloseNotification = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.code == 'Space' || e.code == 'Enter') {
            setError(undefined);
            setIsSuccess(false);
        }
    };

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, {
                ...formData,
                productId
            });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e) {
            setError('ошибка');
        }
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div
                className={cn(styles.reviewForm, className)}
                {...props}
            >
                <Input
                    placeholder='Имя'
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Заполните имя'
                        }
                    })}
                    error={errors.name}
                    tabIndex={isOpened ? 0 : -1 }
                    aria-invalid={!!errors.name}
                />
                <Input
                    placeholder='Заголовок отзыва'
                    className={styles.title}
                    {...register('title', {
                        required: {
                            value: true,
                            message: 'Заполните заголовок'
                        }
                    })}
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1 }
                    aria-invalid={!!errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller
                        control={control}
                        name='rating'
                        rules={{
                            required: {
                                value: true,
                                message: 'Выберете рейтинг'
                            }
                        }}
                        render={({ field }) => (
                            <Rating
                                ref={field.ref}
                                isEditable
                                rating={field.value}
                                setRating={field.onChange}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1 }
                            />
                        )}
                    />
                </div>
                <Textarea
                    placeholder='Текст отзыва'
                    className={styles.description}
                    {...register('description', {
                        required: {
                            value: true,
                            message: 'Заполните описание'
                        }
                    })}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1 }
                    aria-label='Текст отзыва'
                />
                <div className={styles.submit}>
                    <Button
                        appearance='primary'
                        tabIndex={isOpened ? 0 : -1 }
                        onClick={() => clearErrors()}
                    >Отправить</Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.panel, styles.success)}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div role='alert'>
                    Спасибо, Ваш отзыв будет опубликован после проверки.
                </div>
                <button
                    className={styles.close}
                    onClick={() => setIsSuccess(false)}
                    tabIndex={ isSuccess ? 0 : -1 }
                    aria-label='Закрыть оповещение'
                    onKeyDown={ handleCloseNotification }
                >
                    <CloseIcon />
                </button>
            </div>}
            {error && <div className={cn(styles.panel, styles.error)} role='alert'>
                Что-то пошло не так, попробуйте обновить страницу
                <button
                    className={styles.close}
                    onClick={() => setError(undefined)}
                    tabIndex={ error ? 0 : -1 }
                    aria-label='Закрыть оповещение'
                    onKeyDown={ handleCloseNotification }
                >
                    <CloseIcon />
                </button>
            </div>}
        </form>
    );
};

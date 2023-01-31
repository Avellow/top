import cn from 'classnames';
import {ForwardedRef, forwardRef, KeyboardEvent, useEffect, useRef, useState} from 'react';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';
import styles from './Rating.module.css';

export const Rating = forwardRef((
    { isEditable = false, error, rating, setRating, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
): JSX.Element => {

  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, tabIndex]);

  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) {
      return -1;
    }

    if (!rating && i == 0) {
      return tabIndex ?? 0;
    }

    if (rating == i + 1) {
      return tabIndex ?? 0;
    }

    return -1;
  };

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {

      const nStar = i + 1;

      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable,
          })}

          onMouseEnter={() => changeDisplay(nStar)}
          onMouseLeave={() => changeDisplay(rating)}

          onClick={() => onClick(nStar)}

          tabIndex={computeFocus(rating, i)}
          onKeyDown={ handleKey }
          ref={(r) => ratingArrayRef.current?.push(r)}

          role={ isEditable ? 'slider' : '' }
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}

          aria-label={ isEditable ? 'Укажите рейтинг стрелками вверх или вниз' : 'Рейтинг' + rating }
          aria-invalid={!!error}
        >
          <StarIcon />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  // hover effect
  const changeDisplay = (i: number) => {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleKey = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (!isEditable || !setRating) {
      return;
    }
    if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
      e.preventDefault();
      if (!rating) {
        setRating(1);
      } else {
        setRating(rating < 5 ? (rating + 1) : 5);
      }
      ratingArrayRef.current[rating]?.focus();
    }
    if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
      e.preventDefault();
      setRating(rating > 1 ? (rating - 1) : 1);
      ratingArrayRef.current[rating - 2]?.focus();
    }
  };

  return (
    <div
        ref={ref}
        className={cn(styles.ratingWrapper, {
          [styles.error]: error,
        })}
        {...props}
    >
      {ratingArray.map((star, i) => <span key={i}>{star}</span>)}
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});

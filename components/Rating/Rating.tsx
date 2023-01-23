import cn from 'classnames';
import {ForwardedRef, forwardRef, KeyboardEvent, useEffect, useState} from 'react';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';
import styles from './Rating.module.css';

export const Rating = forwardRef((
    { isEditable = false, error, rating, setRating, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
): JSX.Element => {

  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

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
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGAElement>) => spaceHandle(nStar, e)}
          />
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

  const spaceHandle = (i: number, e: KeyboardEvent<SVGAElement>) => {
    if (e.code != 'Space' || !setRating) {
      return;
    }
    setRating(i);
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

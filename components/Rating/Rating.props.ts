import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react';
import {FieldError} from "react-hook-form";

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean,
  rating: number,
  setRating?: Dispatch<SetStateAction<number>>,
  error?: FieldError
}

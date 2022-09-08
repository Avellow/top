import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  size?: 's' | 'm',
  color?: 'grey' | 'green' | 'red' | 'ghost' | 'primary',
  href?: string,
  children: ReactNode
}
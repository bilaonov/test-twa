import clsx from 'clsx';
import './Typography.scss';
import { memo } from 'react';

type TypographyVariant =
  | 'title'
  | 'Text16Regular'
  | 'Text14Regular'
  | 'Text14Bold'
  | 'Text16Bold'
  | 'Text18Regular'
  | 'Text20Regular'
  | 'Text24Regular'
  | 'Text28Regular'
  | 'Text32Regular'
  | 'Text18Bold'
  | 'Text20Bold'
  | 'Text24Bold'
  | 'Text28Bold'
  | 'Text32Bold';
type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p';
type FontFamilyClass = 'nerko-one';

export type TypographyProps<Tag extends TypographyTag> = React.ComponentProps<Tag> & {
  variant: TypographyVariant;
  tag?: TypographyTag;
  children: React.ReactNode;
  fontFamily?: FontFamilyClass;
};

const TypographyComponent = <Tag extends TypographyTag = 'div'>({
  variant,
  tag = 'p',
  children,
  fontFamily = 'nerko-one',
  className,

  ...props
}: TypographyProps<Tag>) => {
  const Component = tag;

  return (
    <Component className={clsx(variant, fontFamily, className)} {...props}>
      {children}
    </Component>
  );
};

export const Typography = memo(TypographyComponent);

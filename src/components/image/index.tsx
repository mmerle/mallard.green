import type { ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};

export default function Image({ alt, ...props }: ImageProps) {
  return <img alt={alt} loading="lazy" decoding="async" {...props} />;
}

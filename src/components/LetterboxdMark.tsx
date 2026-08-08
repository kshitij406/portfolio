import Image from 'next/image';
import type { IconType, IconBaseProps } from 'react-icons';

// The real three-dot Letterboxd mark, dropped in as public/resources/letterboxd_logo.png
// (source image is 434x175). Takes IconBaseProps, same as every react-icons
// export, so it drops into whatever `Icon` slot expects one (Elsewhere's
// social list, Desktop's Internet launchers).
const LetterboxdMark: IconType = ({ size = 20, className, style, ...rest }: IconBaseProps) => {
  const px = typeof size === 'number' ? size : 20;
  return (
    <Image
      src="/resources/letterboxd_logo.png"
      alt=""
      width={Math.round((px * 434) / 175)}
      height={px}
      className={className}
      style={style}
      aria-hidden={rest['aria-hidden']}
    />
  );
};

export default LetterboxdMark;

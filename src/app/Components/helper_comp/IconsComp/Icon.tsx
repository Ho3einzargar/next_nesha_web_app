import Image from 'next/image';

interface Props {
  Address: any;
  width?: number;
  height?: number;
}

const IconLocal = ({ Address, width, height }: Props) => {
  return <Image alt={`Icon${Address}`} src={`/images/icons/${Address}`} width={width || 25} height={height || 25} />;
};
export default IconLocal;

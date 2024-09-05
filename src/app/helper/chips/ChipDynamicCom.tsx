import IconLocal from '@/app/Components/helper_comp/IconsComp/Icon';
import { Chip } from '@nextui-org/react';

interface Props {
  item: any;
  title: any;
  keyChip: any;
  onHover: boolean;
  addressIcon: string;
  haveIcon: boolean;
  IconTitle: any;
  afterClick: (item?: any) => void;
  variant?: 'dot' | 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | undefined;
  colorChip?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined;
}

export const ChipDynamicCom = ({ keyChip, colorChip, title, IconTitle, haveIcon, addressIcon, onHover, variant, item, afterClick }: Props) => {

  return (
    <Chip className={`mx-1 p-2 py-4 pointer ${onHover ? 'hover-chip' : ''}`} onClick={() => afterClick(item)} key={keyChip} color={colorChip} variant={variant}>
      <span className="w-100 text-center">{title}</span>
      <br></br>
      {haveIcon ? (
        <div className="d-flex gap-1 flex-wrap w-100 justify-center gap-1">
          <IconLocal width={15} height={15} Address={addressIcon} />
          {IconTitle}
        </div>
      ) : (
        <div className="d-flex gap-1 flex-wrap w-100 justify-center gap-1">{IconTitle}</div>
      )}
    </Chip>
  );
};
export default ChipDynamicCom;

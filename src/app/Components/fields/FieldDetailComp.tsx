import { responseModelFieldDetailLab } from '@/app/field/[fieldID]/api/fieldApi';
import ChipDynamicCom from '@/app/helper/chips/ChipDynamicCom';
import { Spinner } from '@nextui-org/react';

interface Props {
  labs: responseModelFieldDetailLab[];
  loader: boolean;
}
const FieldDetailComp = ({ labs, loader }: Props) => {
  console.log('Labs', labs);

  if (loader) {
    return <Spinner />;
  } else {
    if (labs.length != 0) {
      return (
        <div>
          {labs.map((lab, idx: number) => {
            return (
              <ChipDynamicCom
                haveIcon
                keyChip={idx}
                onHover
                title={lab.name}
                key={idx}
                IconTitle={lab.number_of_softwares}
                item={lab}
                addressIcon="software.svg"
                afterClick={e => console.log('Clicked', e)}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="w-100 flex flex-wrap h-100 items-center justify-center">
          <span>موردی وجود ندارد</span>;
        </div>
      );
    }
  }
};
export default FieldDetailComp;

import { responseModelFieldDetailLab } from '@/app/field/[fieldID]/api/fieldApi';
import ChipDynamicCom from '@/app/helper/chips/ChipDynamicCom';
import { Spinner } from '@nextui-org/react';
import { useRouter } from '../onComplete/router';

interface Props {
  labs: responseModelFieldDetailLab[];
  loader: boolean;
}
const FieldDetailComp = ({ labs, loader }: Props) => {
  const router = useRouter();
  console.log('Labs', labs);

  if (loader) {
    return <Spinner />;
  } else {
    if (labs?.length != 0) {
      return (
        <div className="flex flex-wrap items-center">
          {Array.isArray(labs) ? (
            labs.map((lab, idx: number) => {
              return (
                <ChipDynamicCom
                  size="lg"
                  haveIcon
                  keyChip={idx}
                  onHover
                  title={lab.name}
                  key={idx}
                  IconTitle={lab.number_of_softwares}
                  item={lab}
                  addressIcon="software.svg"
                  afterClick={e => router.push(`/lab/${lab.id}`)}
                />
              );
            })
          ) : (
            <div className="w-100 flex flex-wrap h-100 items-center justify-center">
              <span>موردی وجود ندارد</span>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="w-100 flex flex-wrap h-100 items-center justify-center">
          <span>موردی وجود ندارد</span>
        </div>
      );
    }
  }
};
export default FieldDetailComp;

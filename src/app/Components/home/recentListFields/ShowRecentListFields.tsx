import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Chip, Spinner, Tooltip } from '@nextui-org/react';
import IconLocal from '../../helper_comp/IconsComp/Icon';
import { responseModelRecentFields } from '../api/homeApi';
import { useRouter } from '../../onComplete/router';

interface Props {
  fieldsList: responseModelRecentFields[];
  loader: boolean;
}
const ShowRecentListFields = ({ fieldsList, loader }: Props) => {
  const router = useRouter();
  if (loader) {
    return <Spinner color="primary" />;
  } else
    return (
      <div className="col-12 d-flex flex-wrap min-height-step-2">
        {fieldsList.length != 0 ? (
          fieldsList.map((item: responseModelRecentFields, idx: number) => {
            return (
              <Chip className="mx-1 p-2 py-4 pointer hover-chip" onClick={() => router.push(`/field/${item.id}`)} key={idx} color="warning" variant="bordered">
                <span className="w-100 text-center">{item.name}</span>
                <br></br>
                <div className="d-flex gap-1 flex-wrap w-100 justify-center gap-1">
                  <IconLocal width={15} height={15} Address={'software.svg'} />
                  {item.number_of_softwares}

                  <IconLocal width={15} height={15} Address={'laboratory.svg'} />
                  {item.number_of_labs}
                </div>
                {/* <div className="d-flex gap-1 flex-wrap w-100 justify-center"></div> */}
              </Chip>
            );
          })
        ) : (
          <span className="text-center w-100 estedad-medium">موردی وجود ندارد</span>
        )}
      </div>
    );
};

export default ShowRecentListFields;

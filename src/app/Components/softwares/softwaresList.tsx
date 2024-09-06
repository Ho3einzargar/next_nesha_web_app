import { Card, CardBody, CardFooter, Spinner, Image } from '@nextui-org/react';
import { useRouter } from '../onComplete/router';
import IconLocal from '../helper_comp/IconsComp/Icon';

interface Props {
  softwares: any[];
  loader: boolean;
}
const SoftwaresList = ({ softwares, loader }: Props) => {
  const router = useRouter();
  console.log('Softs', softwares);

  if (loader) {
    return <Spinner />;
  } else {
    if (softwares?.length != 0) {
      return (
        <div className="gap-2 grid mt-4 grid-cols-2 sm:grid-cols-4">
          {Array.isArray(softwares) ? (
            softwares.map((item, index: number) => {
              return (
                <Card shadow="sm" key={index} isPressable onPress={() => router.push(`/software/${item.id}`)}>
                  <CardBody className="overflow-visible p-0">
                    <img src={item.icon_picture} className="w-full rad-4 object-cover h-[140px]" />
                    {/* <Image shadow="sm" radius="lg" width="100%" srcSet={item.icon_picture} alt={item.icon_picture} className="w-full object-cover h-[140px]" src={item.icon_picture} /> */}
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <b>{item.name}</b>
                    <p className="text-default-500">
                      <IconLocal Address={'like.svg'} />
                      {item.likes}
                    </p>
                  </CardFooter>
                </Card>
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
        <div className="w-100 flex flex-wrap items-center justify-center">
          <span>موردی وجود ندارد</span>
        </div>
      );
    }
  }
};
export default SoftwaresList;

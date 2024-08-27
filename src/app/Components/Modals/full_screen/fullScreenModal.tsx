import Image from 'next/image';
import './fullScreenModal.css';
import React, { useEffect } from 'react';
import IsMobile from '@/app/Utils/isMobile';
import { Modal, ModalContent, ModalBody, ModalFooter, Button } from '@nextui-org/react';

export default function FullScreenModal(items: any) {
  const [imgSelected, setImgSelected] = React.useState({
    img: '',
    index: 0,
  });

  const [zoomIn, setZoomIn] = React.useState(false);

  const changePic = (e: number) => {
    //? Right
    if (e == 1) {
      let Counter = imgSelected.index + 1;
      if (items.list.length - 1 >= Counter) {
        setImgSelected({ img: items.list[Counter], index: Counter });
      }
    }
    //? Left
    if (e == 0) {
      let Counter = imgSelected.index - 1;
      if (Counter >= 0) {
        setImgSelected({ img: items.list[Counter], index: Counter });
      }
    }
  };
  useEffect(() => {
    items.list.map((images: any, index: any) => {
      if (images == items.selected) {
        setImgSelected({ img: images, index: index });
      }
    });
  }, []);
  return (
    <>
      <Modal placement={'bottom-center'} size={IsMobile() ? 'md' : 'full'} isOpen={true} onClose={() => items.closeModal(false)}>
        <ModalContent>
          <ModalBody>
            <article className="col-12 p-0 d-flex flex-wrap align-items-center justify-content-center align-content-between">
              <header className="col-12 p-0 d-flex justify-content-end">
                {!IsMobile() && (
                  <button className="btn pe-5 pt-2" onClick={() => items.closeModal(false)}>
                    <Image src={'/images/icons/cancel.png'} width={35} height={35} alt="" />
                  </button>
                )}
              </header>

              <main
                onClick={() => {
                  setZoomIn(!zoomIn);
                }}
                className={
                  zoomIn
                    ? 'col-12 p-0 img-container-Main-Zoomed d-flex flex-wrap justify-content-center align-items-center position-relative'
                    : 'col-12 p-0 img-container-Main d-flex flex-wrap justify-content-center align-items-center position-relative'
                }>
                <img className={zoomIn ? 'zoomIn' : 'zoomOut'} src={imgSelected.img} alt={'asw'} />
              </main>

              <div className="col-12 d-flex flex-wrap img-fields-Main mt-2 align-items-center justify-content-start">
                {items.list.map((images: any, index: any) => {
                  return (
                    <button
                      key={index}
                      className={imgSelected.img == images ? 'filter-none btn img-container-slider m-1' : 'btn img-container-slider m-1'}
                      onClick={() => setImgSelected({ img: images, index: index })}>
                      <img alt={index} src={images} />
                    </button>
                  );
                })}
              </div>

              <Button className="chev_right btn" onClick={() => changePic(1)}>
                <Image src={'/images/icons/chev_right.png'} width={35} height={35} alt="" />
              </Button>
              <Button className="chev_left btn" onClick={() => changePic(0)}>
                <Image src={'/images/icons/chev_left.png'} width={35} height={35} alt="" />
              </Button>
            </article>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

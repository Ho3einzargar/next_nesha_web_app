'use client';

import Step1HomePage from './Components/home/step_1';
import FavoriteSoftwares from './Components/home/step_2';
import NeshaServices from './Components/home/step_3';
import NeshaRecentFields from './Components/home/step_4';

export default function Home() {
  return (
    <div className="col-12 d-flex flex-wrap">
      <div className="col-12 d-flex flex-wrap ">{<Step1HomePage />}</div>
      <FavoriteSoftwares />
      <NeshaServices />
      <NeshaRecentFields />
    </div>
  );
}

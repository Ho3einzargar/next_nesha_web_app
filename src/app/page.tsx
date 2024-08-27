'use client';

import Step1HomePage from './Components/home/step_1';

export default function Home() {
  return (
    <div className="col-12 d-flex flex-wrap height-calc">
      <div className="col-12 d-flex flex-wrap">{<Step1HomePage />}</div>
    </div>
  );
}

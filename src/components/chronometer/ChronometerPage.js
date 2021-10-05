import { useState } from "react";

import ChronometerRegular from "./ChronometerRegular";
import ChronometerTabata from "./ChronometerTabata";

function ChronometerPage() {
  const [showTabataChronometer, setShowTabataChronometer] = useState(false);

  return (
    <div>
      <h2>Regular Chronometer</h2>
      <p>Breve descrição?</p>
      <ChronometerRegular />
      <h2>Tabata Chronometer</h2>
      <p>Breve descrição?</p>
      <ChronometerTabata />
    </div>
  );
}

export default ChronometerPage;

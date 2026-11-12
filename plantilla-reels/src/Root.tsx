import React from "react";
import { Composition } from "remotion";
import { DURACION_MADRID, ReelMadrid } from "./ReelMadrid";

// Plantilla: copia ReelMadrid.tsx a ReelNuevo.tsx, cambia TOMAS y los rótulos, y regístralo aquí.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="ReelMadrid" component={ReelMadrid} durationInFrames={DURACION_MADRID} fps={30} width={1080} height={1920} />
  </>
);

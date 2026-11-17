"use client";

import CyberPlayer from "./cyber-player";
import { CyberBackdrop, CYBER_BACKDROP_DURATION } from "../../remotion/cyber-backdrop";
import { PortraitHud, PORTRAIT_HUD_DURATION } from "../../remotion/portrait-hud";

type LayerProps = { className?: string };

export function HeroBackdropLayer({ className }: LayerProps) {
  return (
    <CyberPlayer
      component={CyberBackdrop}
      durationInFrames={CYBER_BACKDROP_DURATION}
      className={className}
      stillFrame={90}
    />
  );
}

export function PortraitHudLayer({ className }: LayerProps) {
  return (
    <CyberPlayer
      component={PortraitHud}
      durationInFrames={PORTRAIT_HUD_DURATION}
      className={className}
      stillFrame={110}
    />
  );
}


import { Composition } from 'remotion';
import { BackpropFlow } from './compositions/BackpropFlow';
import { SelfAttentionFlow } from './compositions/SelfAttentionFlow';
import { DiffusionProcess } from './compositions/DiffusionProcess';
import { GradientDescentSurface } from './compositions/GradientDescentSurface';
import { CNNConvolution } from './compositions/CNNConvolution';
import { FPS } from './theme';

const WIDTH = 1280;
const HEIGHT = 720;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BackpropFlow"
        component={BackpropFlow}
        durationInFrames={20 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="SelfAttentionFlow"
        component={SelfAttentionFlow}
        durationInFrames={20 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="DiffusionProcess"
        component={DiffusionProcess}
        durationInFrames={20 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="GradientDescentSurface"
        component={GradientDescentSurface}
        durationInFrames={18 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CNNConvolution"
        component={CNNConvolution}
        durationInFrames={18 * FPS}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

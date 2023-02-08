import { Camera } from "three";
import Renderer from "./Renderer";
import Assets from "./Assets";

export class EndExperience {
  secondaryCamera!: Camera;
  secondaryRenderer!: Renderer;
  assets!: Assets;
  constructor() {}
}

import { BaseStage, type IStageBaseOptions } from './base';

export class PerspectiveCameraStage extends BaseStage {
  constructor(option: IStageBaseOptions) {
    super(option);
  }
  clear(): void {
    throw new Error('Method not implemented.');
  }
}

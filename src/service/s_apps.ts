import { DeguService } from "./s_degu";

export interface Key {
  key: string;
}

export interface Ref {
  ref: string;
}

export interface Social {
  key: string;
  url: string;
}

export interface Person {
  name: string;
  url?: string;
  socials?: Social[];
}

export interface AppModel extends Key {
  // required:
  name: string;
  icon: string;
  platforms: string[];
  tagline: string;
  releases: AppRelease[];
  // optional:
  authors?: AppAuthor[];
  about?: string;
  source?: string;
  url?: string;
  donate?: string;
  screenshots?: string[];
}

export interface AppAuthor extends Person {
  role?: string;
}

export interface AppRelease {
  version: string;
  date?: string;
  notes?: string;
  downloads: AppDownload[];
}

export interface AppDownload {
  platform: string;
  url: string;
}

export class AppsService {
  static readonly i: AppsService = new AppsService();
  constructor() {}

  private async _apps(): Promise<any> {
    return ((await DeguService.i.shallow("apps.yaml")) as any).apps;
  }

  private async _getAppsInfo(): Promise<(Ref & Key)[]> {
    const a = await this._apps();
    return Object.keys(a).map((key) => ({ key, ...a[key] }));
  }

  async getApp(key: string): Promise<AppModel> {
    console.log("getApp", key);
    return {
      key: key,
      ...(await DeguService.i.deep((await this._apps())[key].ref)),
    } as AppModel;
  }

  async getAppList(): Promise<AppModel[]> {
    return Promise.all(
      (await this._getAppsInfo()).map(async (app) => await this.getApp(app.key))
    );
  }
}

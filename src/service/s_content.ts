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

export class ContentService {
  static readonly i: ContentService = new ContentService();
  constructor() {}

  public async _cfg(): Promise<any> {
    return (await DeguService.i.shallow("degu.yaml")) as any;
  }

  private async _apps(): Promise<any> {
    return (await this._cfg()).apps;
  }

  private async _getAppsInfo(): Promise<(Ref & Key)[]> {
    const a = await this._apps();
    return Object.keys(a).map((key) => ({ key, ...a[key] }));
  }

  async getApp(key: string): Promise<AppModel> {
    return {
      key: key,
      ...(await DeguService.i.deep((await this._apps())[key].ref)),
    } as AppModel;
  }

  async getAppList(): Promise<AppModel[]> {
    const apps = Promise.all(
      (await this._getAppsInfo()).map(async (app) => {
        try {
          return await this.getApp(app.key);
        } catch (e) {
          console.log("could not load app " + app, e);
          return null;
        }
      })
    );
    return (await apps).filter((app) => app !== null) as AppModel[];
  }
}

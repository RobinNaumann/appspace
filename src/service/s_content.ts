import { DeguService } from "./s_degu";

export interface Config {
  logo?: string;
  message?: string;
}

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

export class ContentService {
  static readonly i: ContentService = new ContentService();
  constructor() {}

  private async _cfg(): Promise<any> {
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
    return Promise.all(
      (await this._getAppsInfo()).map(async (app) => await this.getApp(app.key))
    );
  }

  async getConfig(): Promise<Config | null> {
    return (await this._cfg()).config ?? null;
  }
}

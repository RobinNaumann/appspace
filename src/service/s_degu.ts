import yaml from "yaml";

export class DeguService {
  static readonly i: DeguService = new DeguService();
  constructor() {}

  public async deep(url): Promise<object> {
    return this._parse(await this.shallow(url));
  }

  public async shallow(url: string): Promise<object> {
    const [address, path] = url.split("#");
    const response = await fetch(address);
    if (!response.ok) {
      throw new Error("Error reading apps.yaml: " + response.status);
    }
    let d = yaml.parse(await response.text());

    //TODO fix this to make it possible for the path to be a reference
    if (!path) return d;
    for (let key of path.split(".")) {
      if (key === "") continue;
      d = d[key];
    }
    return d;
  }

  private async _parse(data: object): Promise<object> {
    for (let key of Object.keys(data)) {
      if (typeof data[key] === "object") {
        data[key] = await this._parse(data[key]);
      }
    }

    // resolve a reference. these come already resolved themselves
    if (Object.keys(data).includes("ref")) {
      const resolved = await this.deep(data["ref"]);
      delete data["ref"];
      data = { ...data, ...resolved };
    }

    return data;
  }
}

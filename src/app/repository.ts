export class Repository {
  private _contributors_count = 0;

  constructor(private _data) {}

  get data() {
    return this._data;
  }

  set contributors_count(contributorsCount) {
    this._contributors_count = contributorsCount;
  }

  get contributors_count(): number {
    return this._contributors_count;
  }
}

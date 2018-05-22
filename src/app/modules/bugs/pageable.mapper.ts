export class Pageable<T> {

  constructor(public totalPages: number,
              public totalRecords: number,
              public page: number,
              public perPage: number,
              public results: T[]) {}

}

// For search result page

export class PersonModel {
  workernum: string;
  name: string;

  constructor(data: any) {
    this.workernum = data.workernum;
    this.name = data.name;
  }
}

export class SearchPersonResultModel {
  totalLength: number;
  similarTechPerson: PersonModel[];
  wideNetwordPerson: PersonModel[];

  constructor(data: any) {
    this.totalLength = data.length_result;
    this.similarTechPerson = data.result_by_score.map(
      (person: any) => new PersonModel(person)
    );
    this.wideNetwordPerson = data.result_by_between_centrality.map(
      (person: any) => new PersonModel(person)
    );
  }
}

// For search detail page

export class PatentModel {
  id: number;
  publicNumber: string;
  name: string;

  constructor(data: any) {
    this.id = data.id;
    this.publicNumber = data.patent_number;
    this.name = data.title;
  }
}

export class CoAuthorModel {
  id: number;
  lastName: string;

  constructor(data: any) {
    this.id = data.id;
    this.lastName = data.name;
  }
}

export class DetailResultModel {
  userName: string;
  patents: PatentModel[];
  coAuthors: CoAuthorModel[];

  constructor(data: any) {
    this.userName = data.userName || '';
    this.patents = data.list_patent.map(
      (patent: any) => new PatentModel(patent)
    );
    this.coAuthors = data.list_coworker.map(
      (coAuthor: any) => new CoAuthorModel(coAuthor)
    );
  }
}

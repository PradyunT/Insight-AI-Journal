export interface Journal {
  createdAt: string;
  owner: string;
  text: string;
  _id: string;
}

export interface Note {
  _id: string;
  text: string;
  owner: string;
}

interface Params {
  id: string;
}

export interface Context {
  params: Params;
}

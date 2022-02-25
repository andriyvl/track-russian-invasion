import {MilitaryEnum} from "../enums/military.enum";

export interface MilitaryModel {
  name: MilitaryEnum,
  icon: string,
  lastSeenDateTime?: Date,
  title?: string,
  constantLocation?: boolean,
  direction?: string,
  quantity?: string,
  comment?: string
}

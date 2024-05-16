import { Specie } from "../types/types";

export const filterData = (species: Array<Specie>, type: string) => {
    return species.filter((item: any) => {
      return item.type === type;
    });
  };
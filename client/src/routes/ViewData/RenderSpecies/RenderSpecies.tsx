import React, { FC } from "react";
import { filterData } from "../../../API/filtering";
import { Specie } from "../../../types/types";
import getLevel from "../../../services/getLevel";

interface RenderSpeciesProps {
  species: Array<Specie>;
  data: any;
}

export const RenderSpecies: FC<RenderSpeciesProps> = ({ data, species }) => {
  const renderItems = (items: any, type: string) => {
    return items.map((item: Specie) => (
      <div className="specie" key={item.id}>
        <div key={item.id}>{item.name_ru}</div>
        <div className={`${getLevel(type, data[item.id])} viewDataValue`}>
          {data[item.id]}
        </div>
      </div>
    ));
  };

  return (
    <div className="viewDataWrapper">
      <div>
        <h3>Деревья</h3>
        {renderItems(filterData(species, "tree"), "tree")}
      </div>
      <div className="viewDataRightColumn">
        <h3>Травы</h3>
        {renderItems(filterData(species, "herb"), "herb")}
      </div>
    </div>
  );
};

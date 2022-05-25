import React, { useEffect, useState } from "react";
import { getLabel } from "@/hooks/getLabel";
import { getManifestById } from "@/services/iiif";
import Card from "@/components/Card/Card";
import { Item } from "@/components/Grid/Grid.styled";
import { Manifest } from "@iiif/presentation-3";

export interface GridItemProps {
  data: any;
}

const GridItem: React.FC<GridItemProps> = ({ data }) => {
  const [item, setItem] = useState<Manifest>();

  useEffect(() => {
    getManifestById(data.id).then((json) => {
      setItem(json);
    });
  }, []);

  let resource = null;

  if (!item) return <></>;

  /**
   * @todo: handle this better
   */
  if (item.items) resource = item.items[0].items[0].items[0].body;

  if (item.sequences)
    resource = item.sequences[0].canvases[0].images[0].resource;

  return (
    <Item className="can-grid-column">
      <Card
        key={data.id}
        label={getLabel(item.label)}
        path={`/works/${data.slug}`}
        resource={resource}
      />
    </Item>
  );
};

export default GridItem;

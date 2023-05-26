import React, {useEffect, useState} from "react";
import { NextSeo } from 'next-seo';
import {CanopyEnvironment} from "@/types/canopy";

const BaseTag = () => {
  const config = process.env.CANOPY_CONFIG as unknown as CanopyEnvironment;
  const titleTemplate = `${config.label.none[0]} | %s`;

  return (
    <NextSeo
      titleTemplate={titleTemplate}
      defaultTitle={config.label.none[0]}
      additionalLinkTags={
        [
          {
            rel: 'icon',
            href: '/images/favicon.ico',
          }
        ]
      }
    />
  );
};
export default BaseTag;
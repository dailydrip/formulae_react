// @flow

import React from "react";
import { SectionType } from "../../types";

type Props = {
  section: SectionType
};

export default function SectionAdmin(props: Props) {
  const { section } = props;
  return (
    <div>
      <input type="text" value={section.name} name="name" />
      <input type="text" value={section.content} name="content" />
    </div>
  );
}

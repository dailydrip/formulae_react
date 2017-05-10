// @flow

import React from "react";

type Props = {
  name: ?string,
  content: ?string
};

export default function SectionAdmin(props: Props) {
  const { name, content } = props;
  return (
    <div>
      <input type="text" value={name} name="name" />
      <input type="text" value={content} name="content" />
    </div>
  );
}

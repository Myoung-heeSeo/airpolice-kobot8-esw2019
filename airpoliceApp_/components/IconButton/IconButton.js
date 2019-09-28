import kind from "@enact/core/kind";
import UiIconButton from "@enact/ui/IconButton";
import React from "react";

import Button from "./Button";

import css from "./IconButton.module.css";

const IconButton = kind({
  name: "IconButton",
  render: props => {
    // Our IconButton only adds custom implemenations for Button and Icon.
    // Otherwise, we are just passing our customized styles via the `css`
    // prop.
    return (
      <UiIconButton
        {...props}
        css={css}
        buttonComponent={Button}
      />
    );
  }
});

export default IconButton;

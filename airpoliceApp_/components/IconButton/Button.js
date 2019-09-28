import kind from "@enact/core/kind";
import UiButton from "@enact/ui/Button";
import React from "react";

import css from "./Button.module.css";

const Button = kind({
  name: "Button",
  render: props => {
    // Our Button implementation relies completely on the markup and
    // behaviors defined by ui/Button. The style customization is
    // achieved by passing our `css` object to it and allowing Button
    // to match up the classes with its documented `publicClassNames`.
    return <UiButton {...props} css={css} />;
  }
});

export default Button;

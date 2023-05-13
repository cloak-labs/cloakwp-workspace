import { useBlockStyleBuilder } from "../hooks/useBlockStyleBuilder";
import { Fragment } from "react";
import { classNames } from "../utils/classNames";
import Block from "../Block";

export default function Buttons({ block, className }) {
  const { classes, styles } = useBlockStyleBuilder(block.data);

  return (
    <div
      className={classNames("flex items-start gap-3", classes, className)}
      style={styles}
    >
      {block.data.innerBlocks.map((buttonBlock, i) => (
        <Fragment key={i}>
          <Block
            block={buttonBlock}
            parentBlock={block.data}
            isNested={true}
          />
        </Fragment>
      ))}
    </div>
  );
}

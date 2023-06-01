import ConditionalWrapper from "../components/ConditionalWrapper";
import Container from "../components/Container";
import { useBlockStyleBuilder } from "../hooks/useBlockStyleBuilder";
import { Fragment } from "react";
import { classNames } from "../utils/classNames";
import Column from "./Column";
import Block from "../Block";

export default function Columns({ block }) {
  const { classes, styles } = useBlockStyleBuilder(block.data);
  const columns = block.data.innerBlocks;
  const numColumns = columns.length;
  let columnWidths = columns.map((col) => {
    const widthVal = parseFloat(col.attrs.width);
    return widthVal ? widthVal : 100 / columns.length; // if no width is specified, we make this safe mathematical assumption
  });

  // .. Ensure column widths add up to 100% (Gutenberg doesn't force the columns to add up to 100%; they can add up to more or less but we don't want that!)
  // eg. 2 columns with 60% and 45% widths (total of 105%) will be adjusted below to become 57.5% and 42.5% (total of 100%)
  let totalWidth = 0;
  columnWidths.forEach((width) => {
    if (width) totalWidth += width;
  });

  const isOver = totalWidth > 100;
  const isUnder = totalWidth < 100;
  if (isOver || isUnder) {
    const extra = Math.abs(100 - totalWidth);
    const adjustment = extra / columns.length;
    columnWidths = columnWidths.map((width) =>
      isOver ? width - adjustment : width + adjustment
    );
  }

  return (
    <ConditionalWrapper
      condition={block.isNested == false}
      wrapper={(children) => (
        <div style={styles} data-cloakwp-columns="true">
          <Container
            className={classNames("py-2", classes)}
            innerClassName={classNames(
              "grid",
              numColumns == 2 &&
                "gap-10 lg:gap-16 2xl:gap-20 grid-cols-1 sm:grid-cols-12",
              numColumns > 2 &&
                numColumns <= 4 &&
                "gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-8 lg:grid-cols-12",
              numColumns > 4 &&
                numColumns <= 6 &&
                "gap-3 lg:gap-4 grid-cols-1 xs:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12",
              numColumns > 6 && "gap-2 lg:gap-3 grid-cols-1 sm:grid-cols-12"
            )}
          >
            {children}
          </Container>
        </div>
      )}
    >
      {columns?.map((column, i) => (
        <Fragment key={i}>
          <Block
            block={column}
            parentBlock={block.data}
            isNested={true}
            index={i}
            width={columnWidths[i]}
            numColumns={numColumns}
          />
          {/* <Column column={column} index={i} width={columnWidths[i]} numColumns={numColumns} /> */}
        </Fragment>
      ))}
    </ConditionalWrapper>
  );
}

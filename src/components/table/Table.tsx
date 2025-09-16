import cn from "classnames";

import { Button } from "@components/buttons";
import { Text } from "@components/text/Text";

import * as styles from "./Table.scss";
import { TableProps } from "./types";

export function Table<T>({
  className,
  rows,
  columns,
  buttonConfig,
  header,
  bodyEmpty,
}: TableProps<T>) {
  return (
    <div className={cn(styles.container, className)}>
      {bodyEmpty ? (
        <div>{bodyEmpty}</div>
      ) : (
        <>
          {header && <div className={styles.header}>{header}</div>}
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column, i) => (
                  <th align="center" key={i}>
                    <Text size="md" type="secondary">
                      {column.title}
                    </Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((cells, i) => (
                <tr key={i}>
                  {columns.map((column, j) => (
                    <td align="center" key={j}>
                      <Text size="md">{cells[column.key] as string}</Text>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {buttonConfig && (
        <Button
          className={styles.button}
          type="primary"
          size="sm"
          variant="wide"
          {...buttonConfig}
        />
      )}
    </div>
  );
}

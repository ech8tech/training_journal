import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { Spacing } from "@components/spacing";
import { Text } from "@components/text";
import { dayjs } from "@configs/dayjs";
import { DAYS_IN_MONTH } from "@constants/dayjs";
import { MuscleGroupColor, MuscleGroupName } from "@constants/muscles";

import * as styles from "./Scatterplot.scss";
import { ScatterplotProps } from "./types";
import { getConfig } from "./utils";

export function Scatterplot({ data = [] }: ScatterplotProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [isShowNotification, setIsShowNotification] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const {
      width,
      height,
      marginTop,
      marginRight,
      marginLeft,
      marginBottom,
      muscleGroupTypes,
      dates,
      logRates,
      parsed,
      LEGEND_ROW_HEIGHT,
      CIRCLE_SIZE,
      AXIS_X_TEXT_HEIGHT,
      LEGEND_OFFSET_TOP,
      LEGEND_CIRCLE_SIZE,
    } = getConfig(data);

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginRight;

    let svg;

    if (!dates?.length) {
      setIsShowNotification(true);
    } else {
      setIsShowNotification(false);

      const [minDate, maxDate] = d3.extent(dates) as [Date, Date];

      const hideDays =
        dayjs(maxDate).diff(dayjs(minDate), "day") + 1 > DAYS_IN_MONTH;

      // Ось X
      const x = d3
        .scaleTime()
        .domain([minDate, maxDate])
        .range([marginLeft + CIRCLE_SIZE, width - marginRight - CIRCLE_SIZE]);

      // Ось Y
      const y = d3
        .scaleLinear()
        .domain(d3.extent(logRates) as [number, number])
        .range([height - marginBottom - CIRCLE_SIZE, marginTop + CIRCLE_SIZE])
        .nice();

      svg = d3
        .select(ref.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; ");

      svg.selectAll("*").remove();

      // Ось X (ЛИНИЯ)
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeDay.every(1)).tickSize(6))
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll(".tick line").attr("stroke", "white"))
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("y2", -innerHeight)
            .attr("stroke", "#13678a")
            .attr("stroke-opacity", 0.2),
        )
        .call((g) => {
          if (hideDays) {
            return g
              .append("text")
              .attr("x", marginLeft + width / 2)
              .attr("y", LEGEND_ROW_HEIGHT + 20)
              .attr("fill", "white")
              .style("text-anchor", "middle")
              .style("font-size", "1.5rem")
              .text("Выборка данных более, чем за месяц");
          }
        })
        .call((g) =>
          g
            .selectAll<SVGTextElement, Date>(".tick text")
            .attr("fill", "white")
            .style("font-size", "1.25rem")
            .each(function (d) {
              const text = d3.select(this);
              text.text("");

              if (!hideDays) {
                text
                  .append("tspan")
                  .attr("x", 0)
                  .attr("dy", "1.2em")
                  .text(dayjs(d).format("D"));

                text
                  .append("tspan")
                  .attr("x", 0)
                  .attr("dy", "1.5em")
                  .text(dayjs(d).format("dd"));
              }
            }),
        );

      // Ось Y (ЛИНИЯ)
      svg
        .append("g")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(
          d3
            .axisLeft(y)
            .ticks(6)
            .tickFormat((v) => {
              const _v = v as number;
              return _v % 1 === 0 ? String(v) : _v.toFixed(1);
            }),
        )
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll(".tick line").attr("stroke", "white"))
        .call((g) =>
          g
            .selectAll(".tick text")
            .attr("fill", "white")
            .style("font-size", "1.25rem"),
        )
        .call((g) =>
          g
            .selectAll(".tick line")
            .clone()
            .clone()
            .attr("x2", innerWidth)
            .attr("stroke", "#13678a")
            .attr("stroke-opacity", 0.2),
        );

      // Точки
      svg
        .append("g")
        .attr("stroke", "black")
        .selectAll("circle")
        .data(parsed)
        .join("circle")
        .attr("cx", (d) => x(d.date))
        .attr("cy", (d) => y(d.logRate))
        .attr("r", CIRCLE_SIZE)
        .attr("fill", (d) => d.color);

      // Легенда
      const legend = svg
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(0,${height - marginBottom})`);

      for (let i = 0; i < muscleGroupTypes.length; i++) {
        const y =
          i * LEGEND_ROW_HEIGHT + AXIS_X_TEXT_HEIGHT + LEGEND_OFFSET_TOP;

        const group = muscleGroupTypes[i];

        legend
          .append("circle")
          .attr("cx", marginLeft + LEGEND_CIRCLE_SIZE)
          .attr("cy", y)
          .attr("r", LEGEND_CIRCLE_SIZE)
          .attr("fill", MuscleGroupColor[group]);

        legend
          .append("text")
          .attr("x", marginLeft + LEGEND_CIRCLE_SIZE + 16)
          .attr("y", y)
          .attr("dy", 8)
          .attr("fill", "white")
          .style("font-size", "1.25rem")
          .text(MuscleGroupName[group]);
      }
    }
  }, [data]);

  return (
    <div>
      {isShowNotification ? (
        <Spacing space={24} className={styles.emptyData}>
          <Text>Нет данных за этот период</Text>
        </Spacing>
      ) : (
        <svg ref={ref} />
      )}
    </div>
  );
}

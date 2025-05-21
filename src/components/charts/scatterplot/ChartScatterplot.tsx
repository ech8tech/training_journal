import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

import { Spacing } from "@components/spacing";
import { Text } from "@components/text";
import { dayjs } from "@configs/dayjs";
import { MuscleGroupColor, MuscleGroupName } from "@constants/muscles";

import * as styles from "./ChartScatterplot.scss";
import { LineChartProps } from "./types";
import { getConfig } from "./utils";

export function ChartScatterplot({ data, hideDays }: LineChartProps) {
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

    let svg;

    if (!dates?.length) {
      setIsShowNotification(true);
    } else {
      setIsShowNotification(false);

      // Ось X
      const x = d3
        .scaleTime()
        .domain(d3.extent(dates) as [Date, Date])
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

      // Ось X (СЕТКА)
      const xGrid = svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(d3.timeDay.every(1))
            .tickSize(-height)
            .tickFormat(() => ""),
        );
      xGrid.selectAll("line").attr("stroke", "#13678a1c");
      xGrid.select(".domain").remove();

      // Ось Y (СЕТКА)
      const yGrid = svg
        .append("g")
        .attr("transform", `translate(${marginLeft}, 0)`)
        .call(
          d3
            .axisLeft(y)
            .tickSize(-width)
            .tickFormat(() => ""),
        );
      yGrid.selectAll("line").attr("stroke", "#13678a1c");
      yGrid.select(".domain").remove();

      // Ось X (ЛИНИЯ)
      svg
        .append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(d3.timeDay.every(1)).tickSize(6))
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll(".tick line").style("stroke", "white"))
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
            .style("font-size", "1.25rem")
            .style("fill", "white")
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
        .call((g) =>
          g
            .selectAll(".tick text")
            .style("font-size", "1.25rem")
            .style("fill", "white"),
        )
        .call((g) => g.selectAll(".tick line").style("stroke", "white"));

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

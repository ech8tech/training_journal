import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { getCircleSize } from "@components/charts/lineChart/utils";
import { dayjs } from "@configs/dayjs";
import { DAYS_IN_MONTH } from "@constants/dayjs";
import { MuscleGroupColor } from "@constants/muscles";

import { LineChartProps } from "./types";

export function LineChart({ data, muscleGroup, exerciseName }: LineChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const width = 928;
    const height = 840;
    const marginTop = 25;
    const marginRight = 15;
    const marginLeft = 50;
    const LEGEND_ROW_HEIGHT = 40;
    const AXIS_X_TEXT_HEIGHT = 80;
    const marginBottom = LEGEND_ROW_HEIGHT + AXIS_X_TEXT_HEIGHT;
    const LEGEND_OFFSET_TOP = 20;
    const LEGEND_CIRCLE_SIZE = 10;
    const CIRCLE_SIZE = getCircleSize(data.length);

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginRight;

    const parsed = data.map((d) => ({
      date: dayjs(d.date).toDate(),
      commonRate: Math.log10(d.commonRate),
    }));

    const [minDate, maxDate] = d3.extent(parsed, (d) => d.date) as [Date, Date];

    const hideDays =
      dayjs(maxDate).diff(dayjs(minDate), "day") + 1 > DAYS_IN_MONTH;

    const x = d3
      .scaleTime()
      .domain(d3.extent(parsed, (d) => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      // .domain([0, d3.max(parsed, (d) => d.commonRate)] as [number, number])
      .domain(d3.extent(parsed, (d) => d.commonRate) as [number, number])
      .nice()
      .range([height - marginBottom, marginTop]);

    const lineGen = d3
      .line<{ date: Date; commonRate: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.commonRate));

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(d3.timeDay.every(1)))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke", "white"))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("y2", -innerHeight)
          .attr("stroke-opacity", 0.2)
          .attr("stroke", "#13678a"),
      )
      .call((g) => {
        if (hideDays) {
          return g
            .append("text")
            .attr("x", marginLeft + width / 2)
            .attr("y", LEGEND_ROW_HEIGHT + 20)
            .attr("fill", "white")
            .style("font-size", "1.5rem")
            .style("text-anchor", "middle")
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

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(6))
      .call((g) => g.select(".domain").remove())
      .call((g) => g.selectAll(".tick line").attr("stroke", "white"))
      .call((g) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", innerWidth)
          .attr("stroke-opacity", 0.2)
          .attr("stroke", "#13678a"),
      )
      .call((g) => g.append("text").attr("x", -marginLeft).attr("y", 10))
      .call((g) =>
        g
          .selectAll("text")
          .style("font-size", "1.25rem")
          .style("fill", "white"),
      );

    svg
      .append("path")
      .datum(parsed)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineGen);

    // Точки
    svg
      .append("g")
      .attr("stroke", "black")
      .selectAll("circle")
      .data(parsed)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.commonRate))
      .attr("r", CIRCLE_SIZE)
      .attr("fill", MuscleGroupColor[muscleGroup]);

    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(0, ${height - marginBottom})`);

    const cY = AXIS_X_TEXT_HEIGHT + LEGEND_OFFSET_TOP;

    legend
      .append("circle")
      .attr("cx", marginLeft + LEGEND_CIRCLE_SIZE)
      .attr("cy", cY)
      .attr("r", LEGEND_CIRCLE_SIZE)
      .attr("fill", MuscleGroupColor[muscleGroup]);

    legend
      .append("text")
      .attr("x", marginLeft + LEGEND_CIRCLE_SIZE + 16)
      .attr("y", cY)
      .attr("dy", 8)
      .attr("fill", "white")
      .style("font-size", "1.25rem")
      .text(exerciseName);
  }, [data]);

  return <svg ref={ref} />;
}

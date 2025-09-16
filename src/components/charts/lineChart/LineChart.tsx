import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { getCircleSize } from "@components/charts/lineChart/utils";
import { Title } from "@components/title";
import { dayjs } from "@configs/dayjs";
import { DAYS_IN_MONTH } from "@constants/dayjs";
import { MuscleGroupColor } from "@constants/muscles";
import { SetDto } from "@pages/journal/types";

import { LineChartProps } from "./types";

export function LineChart({
  data = [],
  muscleGroup,
  exerciseName,
}: LineChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  const isNotEnoughData = data?.length <= 1;

  useEffect(() => {
    if (isNotEnoughData || !exerciseName || !muscleGroup) return;

    const width = 928;
    const height = 840;
    const marginTop = 25;
    const marginRight = 15;
    const marginLeft = 60;
    const LEGEND_ROW_HEIGHT = 40;
    const AXIS_X_TEXT_HEIGHT = 80;
    const marginBottom = LEGEND_ROW_HEIGHT + AXIS_X_TEXT_HEIGHT;
    const LEGEND_OFFSET_TOP = 20;
    const LEGEND_CIRCLE_SIZE = 10;
    const CIRCLE_SIZE = getCircleSize(data.length);

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginBottom;

    const parsed = data.map((d) => ({
      date: dayjs(d.date).toDate(),
      commonRate: d.commonRate === 0 ? 0 : d.commonRate,
      sets: d.sets,
    }));

    console.log(parsed);

    // const minRate = d3.min(parsed, (d) => d.commonRate) || 1;
    // const maxRate = d3.max(parsed, (d) => d.commonRate) || 1;
    //
    // const toPercent = (value: number) => {
    //   if (minRate === maxRate) return 0;
    //   return ((value - minRate) / (maxRate - minRate)) * 100;
    // };

    const [minDate, maxDate] = d3.extent(parsed, (d) => d.date) as [Date, Date];

    const hideDays =
      dayjs(maxDate).diff(dayjs(minDate), "day") + 1 > DAYS_IN_MONTH;

    const x = d3
      .scaleTime()
      .domain(d3.extent(parsed, (d) => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const y = d3
      .scaleLinear()
      // .domain([0, 100])
      .domain(d3.extent(parsed, (d) => d.commonRate) as [number, number])
      // .nice()
      .range([height - marginBottom, marginTop]);

    const lineGen = d3
      .line<{ date: Date; commonRate: number }>()
      .x((d) => x(d.date))
      .y((d) => y(d.commonRate));

    const areaGen = d3
      .area<{ date: Date; commonRate: number }>()
      .x((d) => x(d.date))
      .y0(y(d3.min(parsed, (d) => d.commonRate) || 0))
      .y1((d) => y(d.commonRate));

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    // Рисуем ось X
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

    const targetPxPerTick = 45;
    const approxTicks = Math.max(2, Math.floor(innerHeight / targetPxPerTick));

    // Рисуем ось Y
    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(
        d3
          .axisLeft(y)
          .ticks(approxTicks)
          // .tickFormat((d) => `${d}%`),
          .tickFormat((d) => d.toString()),
      )
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

    // Рисуем линию
    svg
      .append("path")
      .datum(parsed)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineGen);

    // Рисуем заливку под линией
    svg
      .append("path")
      .datum(parsed)
      .attr("fill", MuscleGroupColor[muscleGroup])
      .attr("fill-opacity", 0.25) // простая прозрачность заливки
      .attr("stroke", "none")
      .attr("d", areaGen);

    // Рисуем точки
    svg
      .append("g")
      .attr("stroke", "black")
      .selectAll("circle")
      .data(parsed)
      .join("circle")
      .attr("cx", (d) => x(d.date))
      .attr("cy", (d) => y(d.commonRate))
      .attr("r", CIRCLE_SIZE)
      .attr("fill", MuscleGroupColor[muscleGroup])
      .attr("cursor", "pointer")
      .on("click", function (event, d) {
        // toggle: hide if already visible and close enough
        showTooltip(event, d);
        event.stopPropagation(); // don’t trigger outside click
      });

    // Рисует легенду
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

    const host = (ref.current?.parentNode as HTMLElement) ?? document.body;
    const tooltip = d3
      .select(host)
      .append("div")
      .style("display", "none")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("padding", "8px 10px")
      .style("border-radius", "8px")
      .style("background", "rgba(0,0,0,0.85)")
      .style("color", "#fff")
      .style("font", "14px/1.3 system-ui, -apple-system, Segoe UI, Roboto")
      .style("box-shadow", "0 6px 18px rgba(0,0,0,0.35)")
      .style("z-index", "10");

    const showTooltip = (
      e: any,
      d: { date: Date; commonRate: number; sets: SetDto[] },
    ) => {
      const cx = x(d.date);
      const cy = y(d.commonRate);
      const svgEl = ref.current!;

      // user-space -> client coords (учитывает viewBox, CSS-скейл, трансформы)
      const pt = svgEl.createSVGPoint();
      pt.x = cx;
      pt.y = cy;
      const sp = pt.matrixTransform(svgEl.getScreenCTM()!); // { x, y } в client-координатах

      // границы области графика (в page-координатах)
      const svgBox = svgEl.getBoundingClientRect();
      const minX = svgBox.left + window.scrollX + 10; // pad
      const maxX = svgBox.right + window.scrollX - 10;
      const minY = svgBox.top + window.scrollY + 10;
      const maxY = svgBox.bottom + window.scrollY - 10;

      const rowsHtml = d.sets
        .map((s, i) => {
          return `
            <div>${i + 1}</div>
            <div>${s.reps ?? "—"}</div>
            <div>${s.weight != null ? `${Number(s.weight).toLocaleString("ru-RU")} кг` : "—"}</div>
          `;
        })
        .join("");
      // : `<div style="grid-column:1 / -1; opacity:.6;">Нет подходов</div>`;

      // подготовка контента и первичная отрисовка (скрыто, чтобы померить размер)
      tooltip.style("display", "block").style("visibility", "hidden").html(`
        <div style="font-size: 0.75rem">
          <div>${dayjs(d.date).format("DD MMM YYYY")}</div>
          <div
            style="
              display:grid;
              grid-template-columns:auto auto auto;
              gap:2px 10px;
              align-items:baseline;
              margin-top:6px;
              /*max-height:160px;*/
              overflow:auto;
              padding-right:2px;
            "
          >
          <div style="opacity:.6">#</div>
          <div style="opacity:.6">повт.</div>
          <div style="opacity:.6">вес</div>

          ${rowsHtml}
          </div>
            <div style="margin-top:6px;font-weight:600">Оценка: ${d.commonRate}</div>
          </div>
        </div>
    `);

      const node = tooltip.node() as HTMLDivElement;
      const w = node.offsetWidth;
      const h = node.offsetHeight;
      const gap = 12; // расстояние от точки до тултипа

      // исходная "желанная" позиция — СВЕРХУ и по ЦЕНТРУ
      let left = sp.x + window.scrollX - w / 2;
      let top = sp.y + window.scrollY - h - gap;

      // ---- FLIP по вертикали (если не влезает сверху — уходим вниз)
      if (top < minY) {
        top = sp.y + window.scrollY + gap; // вниз
      }
      // если и снизу не влезает — зажимаем внутри
      if (top + h > maxY) {
        top = Math.max(minY, maxY - h);
      }

      // ---- FLIP по горизонтали
      // если упёрся вправо — ставим тултип целиком СЛЕВА от точки
      if (left + w > maxX) {
        const leftCandidate = sp.x + window.scrollX - w - gap; // слева от точки
        if (leftCandidate >= minX) {
          left = leftCandidate;
        } else {
          // не хватает места слева — просто зажимаем в пределах
          left = maxX - w;
        }
      }
      // если упёрся влево — ставим целиком СПРАВА от точки
      if (left < minX) {
        const rightCandidate = sp.x + window.scrollX + gap; // справа от точки
        if (rightCandidate + w <= maxX) {
          left = rightCandidate;
        } else {
          // не хватает места справа — зажимаем
          left = minX;
        }
      }

      tooltip
        .style("left", `${left}px`)
        .style("top", `${top}px`)
        .style("visibility", "visible");
    };

    const hideTooltip = () => {
      tooltip.style("display", "none");
    };

    const onDocClick = () => hideTooltip();
    document.addEventListener("click", onDocClick);

    return () => {
      document.removeEventListener("click", onDocClick);
      svg.selectAll("*").remove();
      tooltip.remove();
    };
  }, [data, isNotEnoughData, exerciseName, muscleGroup]);

  if (isNotEnoughData) {
    return <Title size="h4">Недостаточно данных для показа графика</Title>;
  }

  return (
    <div>
      <svg ref={ref} />
    </div>
  );
}

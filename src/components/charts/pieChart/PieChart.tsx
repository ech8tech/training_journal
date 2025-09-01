import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { colorFromNameHSL } from "@components/charts/pieChart/utils";
import { Title } from "@components/title";

import { PieChartModel, PieChartProps } from "./types";

export function PieChart({ data = [] }: PieChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const prevTotalRef = useRef(0);

  const width = 1000;
  const height = 700;
  const innerRadius = 200;
  const radius = Math.min(width, height) / 2;
  const padAngle = 0.05;

  const isNotEnoughData = data?.length <= 1;

  useEffect(() => {
    if (isNotEnoughData) return;

    const svg = d3
      .select(ref.current)
      .attr("viewBox", `0 0 ${width} ${height}`) // строка с пробелами
      .attr("preserveAspectRatio", "xMidYMid meet") // масштаб с сохранением пропорций
      .style("width", "100%")
      .style("height", "auto")
      .style("display", "block");

    svg.selectAll("*").remove();
    svg.selectAll("*").interrupt();

    const total = d3.sum(data, (d) => d.count) || 0;
    const fmt = new Intl.NumberFormat("ru-RU");

    // const labelRadius = innerRadius + (outerRadius - innerRadius) * 0.62;

    const pie = d3
      .pie<PieChartModel>()
      .value((d) => d.count)
      .sort(null)
      .padAngle(padAngle);

    const arcs = pie(data);

    const arc = d3
      .arc<d3.PieArcDatum<PieChartModel>>()
      .innerRadius(innerRadius)
      .outerRadius(radius * 0.7);

    const arcHover = d3
      .arc<d3.PieArcDatum<PieChartModel>>()
      .innerRadius(innerRadius)
      .outerRadius(radius * 0.9);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // ==== Сектора ====
    const paths = g
      .append("g")
      .selectAll<SVGPathElement, d3.PieArcDatum<PieChartModel>>("path")
      .data(arcs, (d) => d.data.exerciseName)
      .join("path")
      .attr("fill", (d) => colorFromNameHSL(d.data.exerciseName))
      .attr("stroke", "#0e1720")
      .attr("stroke-width", 1)
      .attr("d", arcHover)
      .attr("opacity", 0);

    paths
      .transition()
      .delay((_, i) => i * 100)
      .duration(300)
      .attr("opacity", 1)
      .attr("d", arc);

    // ==== Подпись в центре ====
    const center = g.append("g").attr("text-anchor", "middle");

    const number = center
      .append("text")
      .attr("dy", "-0.15em")
      .style("font-size", Math.max(22, Math.floor(radius * 0.35)) + "px")
      .style("font-weight", 700)
      .style("fill", "white")
      .text(fmt.format(prevTotalRef.current));

    number
      .transition()
      .duration(800)
      .ease(d3.easeCubic)
      .tween("text", function (this) {
        const start = Number(this.textContent?.replace(/\s/g, "")) || 0;
        const i = d3.interpolate(start, total);
        return (t) => {
          this.textContent = fmt.format(Math.round(i(t)));
        };
      })
      .on("end interrupt", () => {
        number.text(fmt.format(total)); // гарантируем финал даже при прерывании
        prevTotalRef.current = total; // запоминаем для следующего рендера
      });

    center
      .append("text")
      .attr("dy", "1.2em")
      .style("font-size", Math.max(11, Math.floor(radius * 0.13)) + "px")
      .style("fill", "#9bb0bf")
      .text("всего");

    // ==== Подписи по бокам ====
    // геометрия для усиков и точек подписи
    const outerK = 0.9; // опорная окружность чуть за пончиком
    const labelK = 0.8; // насколько выносим конец усика наружу

    const edgePad = 8;
    const gap = 6;
    const rightBound = width / 2 - edgePad; // границы по X в системе g (центр = 0)
    const leftBound = -rightBound;

    const arcOuter = d3
      .arc<d3.PieArcDatum<PieChartModel>>()
      .innerRadius(radius * outerK)
      .outerRadius(radius * outerK);

    const side = (d: d3.PieArcDatum<PieChartModel>) =>
      (d.startAngle + d.endAngle) / 2 < Math.PI ? 1 : -1; // справа=1, слева=-1

    const endPoint = (d: d3.PieArcDatum<PieChartModel>) => {
      const [, y] = arcOuter.centroid(d);
      const rawX = side(d) * radius * labelK; // куда хотим поставить кончик
      const x = Math.max(leftBound, Math.min(rightBound, rawX)); // подрезаем по краям
      return [x, y] as [number, number];
    };

    // доступная ширина от кончика усика до края SVG
    const availWidth = (d: d3.PieArcDatum<PieChartModel>) => {
      const [ex] = endPoint(d);
      return side(d) === 1
        ? rightBound - (ex + gap) // справа
        : ex - gap - leftBound; // слева
    };

    // ---- POLYLINES (усовики) ----
    const polylines = g
      .append("g")
      .attr("class", "lines")
      .selectAll<SVGPolylineElement, d3.PieArcDatum<PieChartModel>>("polyline")
      .data(arcs, (d) => d.data.exerciseName)
      .join("polyline")
      .attr("points", (d) => {
        const p1 = arc.centroid(d); // точка в секторе
        const p2 = arcOuter.centroid(d); // «локоть»
        const [ex, ey] = endPoint(d); // конец (подрезанный)
        return `${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${ex},${ey}`;
      })
      .attr("fill", "none")
      .attr("stroke", "#9bb0bf")
      .attr("stroke-width", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-opacity", 0.85)
      .attr("opacity", 0);

    polylines
      .transition()
      .delay((_, i) => i * 120) // по очереди
      .duration(300)
      .attr("opacity", 1)
      .on("end interrupt", function () {
        d3.select(this).attr("opacity", 1);
      });

    // ---- LABELS фикс-ширины через <foreignObject> у конца усика ----
    const labelsLayer = g.append("g").attr("class", "labels").raise();

    const fo = labelsLayer
      .selectAll<SVGForeignObjectElement, d3.PieArcDatum<PieChartModel>>(
        "foreignObject",
      )
      .data(arcs, (d) => d.data.exerciseName)
      .join("foreignObject")
      .attr("height", 1) // одна строка
      .attr("width", (d) => Math.max(1, availWidth(d))) // НЕТ «60», даём реальную ширину
      .attr("y", (d) => endPoint(d)[1] - 10)
      .attr("x", (d) => {
        const [ex] = endPoint(d);
        const w = Math.max(1, availWidth(d));
        return side(d) === 1 ? ex + gap : ex - gap - w;
      })
      .style("opacity", 0);

    fo.transition()
      .delay((_, i) => i * 120 + 150)
      .duration(250)
      .style("opacity", 0.95)
      .on("end interrupt", function () {
        d3.select(this).style("opacity", 0.95);
      });

    // HTML внутри foreignObject: перенос слов и обрезка по высоте
    fo.append("xhtml:div")
      .style("width", "100%")
      .style("font-size", "1.2rem")
      .style("line-height", "1.2rem")
      .style("color", "white")
      .style("word-wrap", "break-word")
      .style("overflow", "hidden")
      .style("text-overflow", "ellipsis")
      .attr("align", (d) => (side(d) === -1 ? "right" : "left"))
      .text((d) => d.data.exerciseName);

    fo.each(function (d) {
      const foEl = this as SVGForeignObjectElement;

      const fontSize = 1.2 * 16;
      const stringLength = d.data.exerciseName.length;

      const containerWidth = Math.max(1, availWidth(d));
      const symbolSize = 0.55 * fontSize;
      const symbolsInRow = containerWidth / symbolSize;
      const rowsCount = Math.ceil(stringLength / symbolsInRow) || 1;

      const height = rowsCount * 20; // запасной минимум
      foEl.setAttribute("height", String(height));

      const [, ey] = endPoint(d);
      foEl.setAttribute("y", String(ey - height / 2)); // вертикально центрируем около кончика усика
    });

    return () => {
      if (ref.current) {
        d3.select(ref.current).selectAll("*").interrupt();
      }
    };
  }, [data]);

  if (isNotEnoughData) {
    return <Title size="h4">Недостаточно данных для показа графика</Title>;
  }

  return <svg ref={ref} />;
}

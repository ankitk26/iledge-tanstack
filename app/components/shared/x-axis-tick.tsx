import { getDateParts } from "~/lib/month-year-formatter";

export default function XAxisTick({ x, y, payload }: any) {
  if (!payload || typeof payload.value !== "string") {
    return null;
  }
  const { shortMonth, year } = getDateParts(payload.value);

  return (
    <g transform={`translate(${x},${y - 3})`}>
      <text x={0} y={0} textAnchor="middle" fontSize={12}>
        <tspan x={0} dy="0">
          {shortMonth}
        </tspan>
        <tspan x={0} dy="1.2em">
          {year}
        </tspan>
      </text>
    </g>
  );
}

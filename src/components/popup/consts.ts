import { BuildInPlacements } from "@rc-component/trigger";

const targetOffset = [0, 0];

export const placements: BuildInPlacements = {
  bottomLeft: {
    points: ["tl", "bl"],
    overflow: {
      adjustX: true,
      adjustY: true,
    },
    offset: [0, 8],
    targetOffset,
  },
  // leftBottom: {
  //   points: ["tr", "br"],
  //   overflow: {
  //     adjustX: true,
  //     adjustY: true,
  //   },
  //   offset: [0, 8],
  //   targetOffset,
  // },
};

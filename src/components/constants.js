export let totalGridSize = 21;

export let snakeInitialPosition = [
  {
    x: (totalGridSize - 1) / 2,
    y: (totalGridSize - 1) / 2,
  },
  {
    x: (totalGridSize - 1) / 2,
    y: (totalGridSize + 1) / 2,
  },
];

export let foodInitialPosition = [
  {
    x: 5,
    y: 5,
  },
];

export function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export const rules = {
  conaways: {
    alive: (neighbours) => {
      return neighbours === 2 || neighbours === 3;
    },
    dead: (neighbours) => {
      return neighbours === 3;
    },
  },
  
};

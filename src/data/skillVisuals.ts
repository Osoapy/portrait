import css3 from "../assets/skills/css3.svg";
import dart from "../assets/skills/dart.svg";
import figma from "../assets/skills/figma.svg";
import flutter from "../assets/skills/flutter.svg";
import lua from "../assets/skills/lua.svg";
import nodejs from "../assets/skills/nodejs.svg";
import python from "../assets/skills/python.svg";
import react from "../assets/skills/react.svg";
import typescript from "../assets/skills/typescript.svg";

export type SkillVisual = {
  icon?: string;
  from: string;
  to: string;
};

export const skillVisuals: Record<string, SkillVisual> = {
  React: { icon: react, from: "#087ea4", to: "#55c8e5" },
  TypeScript: { icon: typescript, from: "#235b9b", to: "#3178c6" },
  CSS: { icon: css3, from: "#164db1", to: "#39a5e3" },
  "Node.js": { icon: nodejs, from: "#2d682d", to: "#72ad47" },
  Flutter: { icon: flutter, from: "#026b98", to: "#59c5ec" },
  Dart: { icon: dart, from: "#036f99", to: "#36b6ad" },
  FlutterFlow: { from: "#5847a0", to: "#9a73d5" },
  Python: { icon: python, from: "#3776ab", to: "#e2b836" },
  Figma: { icon: figma, from: "#ab4b40", to: "#7d54bf" },
  Lua: { icon: lua, from: "#1c248c", to: "#4b6cce" },
  LÖVE2D: { from: "#b83262", to: "#e97596" },
  "Inteligência artificial": { from: "#4e3b9a", to: "#a874cf" },
  "Redes neurais": { from: "#225a8f", to: "#56a3bc" },
  "Análise de dados": { from: "#20706a", to: "#4bab88" },
  "Testes e automação": { from: "#526930", to: "#8c9e48" },
  "ERP e XML": { from: "#5b6071", to: "#8b91a6" },
};

import flutterflow from "../assets/skills/flutterflow.png";
import love2d from "../assets/skills/love2d.svg";
import brain from "../assets/skills/brain-circuit.svg";
import network from "../assets/skills/network.svg";
import chart from "../assets/skills/chart-no-axes-combined.svg";
import workflow from "../assets/skills/workflow.svg";
import xml from "../assets/skills/file-code-2.svg";
import css3 from "../assets/skills/css3.svg";
import dart from "../assets/skills/dart.svg";
import figma from "../assets/skills/figma.svg";
import flutter from "../assets/skills/flutter.svg";
import lua from "../assets/skills/lua.svg";
import nodejs from "../assets/skills/nodejs.svg";
import python from "../assets/skills/python.svg";
import react from "../assets/skills/react.svg";
import typescript from "../assets/skills/typescript.svg";
import scss from "../assets/skills/scss.svg";
import javascript from "../assets/skills/javascript.svg";
import kotlin from "../assets/skills/kotlin.svg";
import vscode from "../assets/skills/vscode.svg";
import visualstudio from "../assets/skills/visualstudio.svg";
import intellij from "../assets/skills/intellij.svg";
import obsidian from "../assets/skills/obsidian.svg";
import git from "../assets/skills/git.svg";
import github from "../assets/skills/github.svg";
import firebase from "../assets/skills/firebase.svg";

export type SkillVisual = {
  icon: string;
  from: string;
  to: string;
};

export const skillVisuals: Record<string, SkillVisual> = {
  React: { icon: react, from: "#087ea4", to: "#55c8e5" },
  TypeScript: { icon: typescript, from: "#235b9b", to: "#3178c6" },
  CSS: { icon: css3, from: "#164db1", to: "#39a5e3" },
  SCSS: { icon: scss, from: "#ad4b7a", to: "#cf649a" },
  "Node.js": { icon: nodejs, from: "#2d682d", to: "#72ad47" },
  JavaScript: { icon: javascript, from: "#a58f00", to: "#f0db4f" },
  Flutter: { icon: flutter, from: "#026b98", to: "#59c5ec" },
  Dart: { icon: dart, from: "#036f99", to: "#36b6ad" },
  Kotlin: { icon: kotlin, from: "#8958ae", to: "#e36275" },
  FlutterFlow: { icon: flutterflow, from: "#5847a0", to: "#9a73d5" },
  Python: { icon: python, from: "#3776ab", to: "#e2b836" },
  Figma: { icon: figma, from: "#ab4b40", to: "#7d54bf" },
  Lua: { icon: lua, from: "#1c248c", to: "#4b6cce" },
  LÖVE2D: { icon: love2d, from: "#b83262", to: "#e97596" },
  "VS Code": { icon: vscode, from: "#1276a7", to: "#28a5e8" },
  VS: { icon: visualstudio, from: "#613e91", to: "#a37acc" },
  IntelliJ: { icon: intellij, from: "#ad3971", to: "#e66c43" },
  Obsidian: { icon: obsidian, from: "#6343a4", to: "#9a77d4" },
  Git: { icon: git, from: "#ba442f", to: "#f05133" },
  GitHub: { icon: github, from: "#30343a", to: "#636b73" },
  Firebase: { icon: firebase, from: "#df890e", to: "#ffcb35" },
  "Inteligência artificial": { icon: brain, from: "#4e3b9a", to: "#a874cf" },
  "Redes neurais": { icon: network, from: "#225a8f", to: "#56a3bc" },
  "Análise de dados": { icon: chart, from: "#20706a", to: "#4bab88" },
  "Testes e automação": { icon: workflow, from: "#526930", to: "#8c9e48" },
  "ERP e XML": { icon: xml, from: "#5b6071", to: "#8b91a6" },
};

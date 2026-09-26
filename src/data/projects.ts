export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  team: string;
  url?: string;
  image?: string;
};
export const projects: Project[] = [
  {
    id: "fapesq",
    title: "Produto educacional FAPESQ",
    description:
      "Material educacional desenvolvido com React e SCSS para apresentar redes neurais de forma acessível.",
    stack: ["React", "SCSS", "Redes neurais", "Educação"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/produto-educacional-fapesq",
  },
  {
    id: "tutu",
    title: "Portfólio Tutu",
    description:
      "Portfólio web para a artista Tutu, com apresentação dos seus trabalhos e identidade visual própria.",
    stack: ["React", "TypeScript"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/portfolio-tutu",
  },
  {
    id: "adventure",
    title: "Adventure Beyond Limits",
    description:
      "Aplicação para organizar treinadores e montar equipes Pokémon.",
    stack: ["React", "JavaScript", "Sass", "Firebase"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/adventure-beyond-limits-react",
  },
  {
    id: "login-analysis",
    title: "Análise de logins",
    description:
      "Análise de registros de login para distinguir tentativas de ataque, com preparação de dados e classificação usando Random Forest.",
    stack: ["Python", "Pandas", "scikit-learn"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/neural-network-login-analysis",
  },
  {
    id: "cartpole",
    title: "DQN para CartPole",
    description:
      "Agente de aprendizado por reforço com rede DQN para resolver o desafio CartPole.",
    stack: ["Python", "PyTorch", "Gymnasium", "DQN"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/deep-q-leaning-cartpole-approach",
  },
  {
    id: "mountaincar",
    title: "PPO para MountainCar",
    description:
      "Treinamento de um agente para MountainCar com PPO, ajuste de recompensa e busca de hiperparâmetros.",
    stack: ["Python", "Gymnasium", "Stable-Baselines3", "PPO"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/deep-q-network-mountaincar-approach",
  },
  {
    id: "lua",
    title: "Compilador Online de Lua",
    description:
      "Criado para otimizar o tempo durante o minicurso Desvendando Lua: Conceito, Sintaxe e Aplicações.",
    stack: ["Lua"],
    team: "João Gabriel, Emanuel Franklyn, Hugo e Leonardo",
    url: "https://github.com/Osoapy/Desvendando-Lua",
  },
  {
    id: "flies",
    title: "Flies And Food",
    description:
      "Uma rede neural artificial em Lua, apresentada com LÖVE2D. Usa aleatoriedade, pesos e algoritmos geracionais para adaptar moscas à busca por comida.",
    stack: ["Lua", "LÖVE2D", "Redes neurais"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/love2d-artificial-neural-network-flies-and-food",
  },
  {
    id: "watchlist",
    title: "LÖVE2D Watchlist",
    description:
      "Projeto para a cadeira de POO que usa Lua e LÖVE2D para encapsulamento e armazenamento de dados em um CRUD de três entidades.",
    stack: ["Lua", "LÖVE2D", "POO", "CRUD"],
    team: "João Gabriel",
    url: "https://github.com/Osoapy/Love2d-Watchlist-CRUD",
  },
];

import next from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "scripts/**", ".archive/**"],
  },
  ...next,
];

export default eslintConfig;

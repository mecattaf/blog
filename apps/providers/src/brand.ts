// Hex colours from compute-hub/src/icons/brand.json (lobe-icons COLOR_PRIMARY
// or brand-page values). Monochrome SVGs from @lobehub/icons-static-svg 1.102.0
// (MIT, LobeHub packaging); the marks belong to their owners.
import gemini from "./logos/gemini.svg?raw";
import opencode from "./logos/opencode.svg?raw";
import groq from "./logos/groq.svg?raw";
import cerebras from "./logos/cerebras.svg?raw";
import mistral from "./logos/mistral.svg?raw";
import cohere from "./logos/cohere.svg?raw";
import nvidia from "./logos/nvidia.svg?raw";
import cloudflare from "./logos/cloudflare.svg?raw";
import huggingface from "./logos/huggingface.svg?raw";
import vercel from "./logos/vercel.svg?raw";
import xai from "./logos/xai.svg?raw";
import openrouter from "./logos/openrouter.svg?raw";
import anthropic from "./logos/anthropic.svg?raw";
import openai from "./logos/openai.svg?raw";
import local from "./logos/local.svg?raw";

export interface Brand {
  hex: string;
  hexDark?: string;
  svg: string;
}

export const brands: Record<string, Brand> = {
  gemini: { hex: "#3186FF", svg: gemini },
  opencode: { hex: "#211E1E", hexDark: "#F1ECEC", svg: opencode },
  groq: { hex: "#F55036", svg: groq },
  cerebras: { hex: "#F15A29", svg: cerebras },
  mistral: { hex: "#FA520F", svg: mistral },
  cohere: { hex: "#39594D", hexDark: "#D18EE2", svg: cohere },
  nvidia: { hex: "#76B900", svg: nvidia },
  cloudflare: { hex: "#F38020", svg: cloudflare },
  huggingface: { hex: "#FFD21E", svg: huggingface },
  vercel: { hex: "#000000", hexDark: "#FFFFFF", svg: vercel },
  xai: { hex: "#000000", hexDark: "#FFFFFF", svg: xai },
  openrouter: { hex: "#6566F1", svg: openrouter },
  claude: { hex: "#D97757", svg: anthropic },
  codex: { hex: "#10A37F", svg: openai },
  local: { hex: "#6B7280", hexDark: "#9CA3AF", svg: local },
};

/** Black or white, whichever reads better on the given tile colour. */
export function onColor(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.6 ? "#111111" : "#ffffff";
}

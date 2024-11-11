import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const crates = [
  "Meme Crate",
  "Defi Crate",
  "Stable Coin Crate",
  "GameFI Crate",
  "Misc Crate",
]

export const getCrateName = (id: number) => crates[id] || "Unknown Crate"


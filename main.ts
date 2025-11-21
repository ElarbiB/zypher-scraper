// main.ts
import 'https://deno.land/std@0.201.0/dotenv/load.ts';
import puppeteer from "npm:puppeteer";

const FIRECRAWL_KEY = Deno.env.get("FIRECRAWL_KEY");

async function scrapePage(url: string) {
  console.log(`Opening page: ${url}`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const h1 = await page.$$eval("h1", els => els.map(e => e.textContent?.trim()).filter(Boolean));
  const h2 = await page.$$eval("h2", els => els.map(e => e.textContent?.trim()).filter(Boolean));

  await browser.close();

  return [...h1, ...h2];
}

async function scrapeWithFirecrawl(url: string) {
  if (!FIRECRAWL_KEY) {
    console.log("FIRECRAWL_KEY not found, using local Puppeteer fallback.");
    return scrapePage(url);
  }

  console.log("Firecrawl activated with API key.");
  return scrapePage(url);
}

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function interactiveAgent(url: string) {
  const titles = await scrapeWithFirecrawl(url);
  console.log(`Titles retrieved: ${titles.length}`);

  const themes = [...new Set(titles.map(t => t.split(" ")[0]))];
  console.log("Detected themes:", themes.join(", "));

  const rl = readline.createInterface({ input, output });

  while (true) {
    const keyword = (await rl.question("\nType a keyword (or 'exit' to quit): ")).trim();
    if (keyword.toLowerCase() === "exit") break;

    const filtered = titles.filter(title => title.toLowerCase().includes(keyword.toLowerCase()));
    if (filtered.length === 0) {
      console.log("No titles found for this keyword.");
      continue;
    }

    console.log(`\nLocal summary for "${keyword}":`);
    console.log(filtered.join("; "));
  }

  rl.close();
}

interactiveAgent("https://edition.cnn.com/");

# Zypher Scraper Agent

## Overview
This project is a simple AI scraping agent built with **Deno** and **Puppeteer**. It fetches H1 and H2 titles from web pages and provides an interactive interface to filter and summarize them by keyword. The project includes a placeholder for **Firecrawl** integration for future cloud-based scraping.

## Features
- Scrapes H1 and H2 titles from any webpage.
- Interactive command-line interface to filter titles by keyword.
- Summarizes filtered titles locally.
- Placeholder for Firecrawl cloud scraping (requires API key).

## Installation
1. Install [Deno](https://deno.land/).
2. Clone this repository:
   ```bash
   git clone https://github.com/ElarbiB/zypher-scraper.git
   cd zypher-scraper
3. Create a .env file in the root directory and add your Firecrawl API key:
   FIRECRAWL_KEY=your_api_key_here
   
## Usage
Run the agent with the following command:
   deno run --allow-net --allow-read --allow-run --allow-write main.ts

.The agent will scrape the page URL provided in the code.
.After scraping, it displays detected titles and themes.
.You can type a keyword to filter titles and see a summary, or type exit to quit.

## Exemple
💡 Titles retrieved: 16
🔹 Detected themes: Ukraine, More, Travel, Business, Sports
🔹 Type a keyword (or 'exit' to quit): ukraine
📝 Local summary for "ukraine":
Ukraine faces choice of losing dignity or US support, Zelensky warns

##Notes
.Currently, Firecrawl integration is a placeholder; without a key, local Puppeteer scraping is used.
.Puppeteer runs in headless mode by default.
.Designed for educational/demo purposes as part of the CoreSpeed assessment.

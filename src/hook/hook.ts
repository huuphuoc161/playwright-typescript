import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
/*import { invokeBrowser, invokeBrowserBS, invokeBrowserRemote } from "../helper/browsers/browserManager";
import { pageFixture } from "./pageFixture";*/

import { readFileSync } from "fs";
import path from "path";
import { LocalizationStrings } from "../helper/types/type";

let browser: Browser;
let context: BrowserContext;

// Fonction pour charger le fichier de langue
function loadTranslations(language: string): LocalizationStrings {
  const filePath = path.resolve(__dirname, `../data/locales/${language}.json`);
  const rawData = readFileSync(filePath, "utf8");
  return JSON.parse(rawData);
}

declare global {
  var translations: LocalizationStrings;
  var randomNumber: number;
}

BeforeAll(async function () {
  console.log(process.env.LANGUAGE);
  console.log(process.env.BRAND);
  console.log(process.env.ENV);

  // Load the traductions
  global.translations = loadTranslations(process.env.LANGUAGE || "fr"); // Par default frensh

  if (process.env.BS == "true") {
    browser = await invokeBrowserBS();
  } else if (process.env.REMOTE == "true") {
    browser = await invokeBrowserRemote();
  } else {
    browser = await invokeBrowser();
  }

  global.randomNumber = Math.floor(Math.random() * 5) + 1; // Generates a random integer between 0 and 5
  console.log("RANDOM ....", global.randomNumber);
});

Before(async function () {
  const contextOptions = { viewport: null };
  context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle, result }) {
  console.log(result?.status);
  //screenshot
  if (result?.status == Status.FAILED) {
    const img = await pageFixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });

    this.attach(img, "image/png");
  }

  if (process.env.BS == "true") {
    await pageFixture.page.evaluate(
      () => {},
      `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: result?.status, reason: result?.message } })}`
    );
  }

  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});

const path = require("path")

import { create } from "express-handlebars"
import { RenderViewOptions } from "express-handlebars/types"

import { generatePDF } from "./pdf-generator"
import helpers from "./handlebars-helpers"
import { PaperFormat } from "puppeteer";
import { API_PORT } from "@/config";

const hbs = create({
  defaultLayout: "./templates/layouts/pdf-layout",
  extname: ".handlebars",
  helpers,
})

// As far as I can tell, express-handlebars is _supposed_ to be able to load templates
// without the extension, but for whatever reason it does not.
// This is a workaround.
function patchExtensionlessPath(viewPath: string) {
  if (path.extname(viewPath) === "") {
    return viewPath + hbs.extname
  }

  return viewPath
}

export function renderViewAsPromise(viewPath: string, options: RenderViewOptions): Promise<string> {
  const patchedViewPath = patchExtensionlessPath(viewPath)
  options = { ...options, API_PORT }
  return new Promise((resolve, reject) => {
    hbs.renderView(patchedViewPath, options, (error, result) => {
      if (error) {
        reject(error)
      } else if (result === null || result === undefined) {
        reject(new Error("No content rendered"))
      } else {
        resolve(result)
      }
    })
  })
}

export function renderViewAsPdf(viewPath: string, options: RenderViewOptions, format: PaperFormat = "letter", landscape: boolean = false) {
  return renderViewAsPromise(viewPath, options).then((htmlToRenderAsPDF) => {
    return generatePDF(htmlToRenderAsPDF, format, landscape)
  })
}

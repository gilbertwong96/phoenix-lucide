import plugin from 'tailwindcss/plugin';
import type { PluginAPI } from 'tailwindcss/plugin';
import path from "path";
import fs from "fs";
import { optimize } from "svgo";

export default plugin(function({ matchComponents, theme }: PluginAPI) {
  let iconsDir = path.join(process.cwd(), "deps", "lucide", "icons")
  let values: Record<string, string> = {}

  fs.readdirSync(path.join(iconsDir)).forEach(file => {
    let name = path.basename(file, ".svg")
    values[name] = path.join(iconsDir, file)
  })

  matchComponents({
    "lucide": (value: string) => {
      const fullPath = value
      const name = path.basename(fullPath, path.extname(fullPath))
      let content = fs.readFileSync(fullPath).toString().replace(/\r?\n|\r/g, "")
      let optimized_svg = optimize(content, {
        plugins: [
          {
            name: 'removeAttrs',
            params: {
              attrs: ['width', 'height']
            }
          },
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [
                { 'aria-hidden': 'true' }
              ]
            }
          }
        ]
      });
      content = optimized_svg.data
      content = encodeURIComponent(content)
      let size = theme("spacing.6")
      return {
        [`--lucide-${name}`]: `url('data:image/svg+xml;utf8,${content}')`,
        "-webkit-mask": `var(--lucide-${name})`,
        "mask": `var(--lucide-${name})`,
        "mask-repeat": "no-repeat",
        "background-color": "currentColor",
        "vertical-align": "middle",
        "display": "inline-block",
        "width": size,
        "height": size
      }
    }
  }, {values})
}) as ReturnType<typeof plugin>

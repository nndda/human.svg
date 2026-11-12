import fs from "fs";
import { optimize, type Config } from "svgo";

interface BadgeVariant {
  bgColor: string,
  textColor: {
    made: string,
    withLove: string,
    byHuman: string,
  },
}

if (process.argv.includes("--build")) {

  const
    svgBaseStr = fs.readFileSync("./svg/base.svg", { encoding: "utf8" })
  , variants: Record<string, BadgeVariant> = {

      light: {
        bgColor: "#f6f6f6",
        textColor: {
          made: "#0c0c09",
          withLove: "#a60638",
          byHuman: "#724c0a",
        },
      },

      dark: {
        bgColor: "#0c0c09",
        textColor: {
          made: "#eaeaea",
          withLove: "#ff6797",
          byHuman: "#f5cf0e",
        },
      },

    }
  , svgoConf: Config = {
      multipass: true,
    }
  ;

  for (const variant in variants) {
    const
      data = variants[variant]!
    , svgVariant = svgBaseStr
        // lord forgive me
        .replaceAll("{bgColor}", data.bgColor)
        .replaceAll("{textColor_made}", data.textColor.made)
        .replaceAll("{textColor_withLove}", data.textColor.withLove)
        .replaceAll("{textColor_byHuman}", data.textColor.byHuman)
    ;

    fs.writeFileSync(
      "./dist/" + variant + ".svg",
      optimize(svgVariant, svgoConf).data,
    );
  }
}

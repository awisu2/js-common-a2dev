const path = require("path")
const fs = require("fs-extra")
const babel = require("babel-core")

const PACKAGES_DIR_NAME = "packages"
const SOURCE_DIR_NAME = "src"
const DIST_DIR_NAME = "dist"

const currentDir = path.dirname(process.argv[1])
const projectDir = path.dirname(currentDir)
const packagesDir = path.resolve(projectDir, PACKAGES_DIR_NAME)

const transformFile = function (srcFile, distFile) {
  let code = babel.transformFileSync(srcFile).code
  fs.writeFileSync(distFile, code)
}

const transformByDir = function (srcDir, distDir) {
  // clear output directory
  if (fs.existsSync(distDir)) fs.removeSync(distDir)
  fs.mkdirSync(distDir)

  // transcode files
  let files = fs.readdirSync(srcDir)
  for (let i in files) {
    let src = path.resolve(srcDir, files[i])
    let dist = path.resolve(distDir, files[i])
    let stat = fs.statSync(src)

    // is directory
    if (stat.isDirectory()) {
      transformByDir(src, dist)
    } else if (stat.isFile()) {
      transformFile(src, dist)
    }
  }

}

const main  = function () {
  try {
    let packageDirs = fs.readdirSync(packagesDir)

    for (let i in packageDirs) {
      let packageDir = path.resolve(packagesDir, packageDirs[i])
      let sourceDir = path.resolve(packageDir, SOURCE_DIR_NAME)
      let distDir = path.resolve(packageDir, DIST_DIR_NAME)

      transformByDir(sourceDir, distDir)
    }
  } catch (e) {
    console.log(e)
  }
}

main()
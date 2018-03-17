const path = require("path")
const fs = require("fs-extra")
const babel = require("babel-core")

const PACKAGES_DIR_NAME = "packages"
const SOURCE_DIR_NAME = "src"
const DIST_DIR_NAME = "dist"
const TRANSFORM_CONFIG = {
  minified: true
}

const currentDir = path.dirname(process.argv[1])
const projectDir = path.dirname(currentDir)
const packagesDir = path.resolve(projectDir, PACKAGES_DIR_NAME)

/**
 * check arguments has watch
 * @return {[type]}
 */
const checkWatchByArgs = function () {
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] == '--watch' || process.argv[i] == '-w') {
      return true
    }
  }
  return false
}
const isWatch = checkWatchByArgs()

/**
 * babel transform and save file
 * @param  {string}
 * @param  {string}
 * @return {undefined}
 */
const transformFile = function (srcFile, distFile) {
  try {
    let code = babel.transformFileSync(srcFile, TRANSFORM_CONFIG).code
    fs.outputFileSync(distFile, code)

    console.log('transformFile: "' + path.relative(packagesDir, srcFile))
  } catch (err) {
    console.log('ERROR transformFile', err)
    return err
  }
}

/**
 * babel transform under directory
 * @param  {string}
 * @param  {string}
 * @return {undefined}
 */
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

/**
 * @return {[type]}
 */
const changeFile = function (file, srcDir, distDir) {
  let src = path.resolve(srcDir, file)
  let dist = path.resolve(distDir, file)

  if (!fs.existsSync(src)) return

  let stat = fs.statSync(src)
  if (stat.isDirectory()) {
    if (!fs.existsSync(dist)) {
      fs.mkdirSync(dist)
    }
  } else if (stat.isFile()) {
    transformFile(src, dist)
  }
}

const watchChangeFile = function (srcDir, distDir) {
  fs.watch(srcDir, {recursive: true}, (type, file) => {
    changeFile(file, srcDir, distDir)
  })
}

const main  = function (options) {
  try {
    let packageDirs = fs.readdirSync(packagesDir)

    for (let i in packageDirs) {
      let packageDir = path.resolve(packagesDir, packageDirs[i])
      let srcDir = path.resolve(packageDir, SOURCE_DIR_NAME)
      let distDir = path.resolve(packageDir, DIST_DIR_NAME)

      // watch setting
      if (isWatch) watchChangeFile(srcDir, distDir)

      transformByDir(srcDir, distDir)
    }
  } catch (e) {
    console.log(e)
  }
}

main()
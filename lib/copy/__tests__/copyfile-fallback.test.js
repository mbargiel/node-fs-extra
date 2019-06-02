const fs = require('fs')
const path = require('path')

/* global after, describe */

if (typeof fs.copyFile === 'function') {
  // Re-run all copy tests without fs.copyFile
  describe('> when using copyFileFallback', () => {
    const originalCopyFile = fs.copyFile

    after(done => {
      fs.copyFile = originalCopyFile
      done()
    })

    delete fs.copyFile
    const fallbackTest = path.basename(__filename)
    fs.readdirSync(__dirname)
      .filter(filename => filename.endsWith('.test.js') && filename !== fallbackTest)
      .map(filename => {
        const testModule = `./${filename}`
        delete require.cache[require.resolve(testModule)]
        require(testModule)
      })
  })
}

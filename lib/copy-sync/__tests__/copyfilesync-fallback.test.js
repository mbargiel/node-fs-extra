const fs = require('fs')
const path = require('path')

/* global after, describe */

if (typeof fs.copyFileSync === 'function') {
  // Re-run all copySync tests without fs.copyFileSync
  describe('> when using copyFileSyncFallback', () => {
    const originalCopyFile = fs.copyFileSync

    after(done => {
      fs.copyFileSync = originalCopyFile
      done()
    })

    delete fs.copyFileSync
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

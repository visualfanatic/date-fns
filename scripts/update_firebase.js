#!/usr/bin/env node

/**
 * @file
 * The script generates the site data (docs, versions, etc.)
 * and writes it to Firebase.
 *
 * It's a part of the release process.
 */

const {getFirebaseDB} = require('./_lib/firebase')
const path = require('path')
const fs = require('fs')
const childProcess = require('child_process')
const listLocales = require('./_lib/list_locales')
const countries = require('world-countries')
const {version} = require('../package.json')

const prereleaseRegExp = /(test|alpha|beta|rc)/

const features = {
  docs: true,
  i18n: true,
  camelCase: false,
  fp: false,
  esm: false,
  utc: false
}

function generateVersionData () {
  const tag = `v${version}`

  const commit = childProcess.execSync('git rev-parse HEAD')
    .toString()
    .replace(/[\s\n]/g, '')

  const date = parseInt(
    childProcess.execSync('git show -s --format=%ct')
      .toString()
      .replace(/[\s\n]/g, ''),
    10
  ) * 1000

  const docsJSON = fs.readFileSync(path.resolve(process.cwd(), 'dist/date_fns_docs.json'))
    .toString()
  const docs = JSON.parse(docsJSON)
  const docsCategories = Object.keys(docs)
  const docsPages = docsCategories.reduce((acc, category) => acc.concat(docs[category]), [])
  const docsKeys = docsPages
    .map(({urlId, category, title, description}, index) => ({urlId, category, title, description, key: index}))

  return {
    tag,
    date,
    prerelease: Boolean(prereleaseRegExp.exec(tag)),
    commit,
    docsPages,
    docsKeys,
    docsCategories,
    features
  }
}

function generateDocs (data) {
  const {tag, docsPages, docsKeys, docsCategories} = data

  return {
    tag,
    pages: docsPages,
    keys: docsKeys,
    categories: docsCategories
  }
}

function generateVersion (data, docsKey) {
  const {
    tag,
    date,
    commit,
    prerelease,
    features,
  } = data

  return {
    tag,
    date,
    commit,
    prerelease,
    features,
    docsKey
  }
}

getFirebaseDB()
  .then(db => {
    const data = generateVersionData()

    const docsListRef = db.ref('/docs')
    const docsRef = docsListRef.push()

    const versionListRef = db.ref('/versions')
    const versionRef = versionListRef.push()

    //console.log(JSON.stringify([
      //generateDocs(data),
      //generateVersion(data, 'docsRef.key')
    //]))

    return Promise.all([
      docsRef.set(generateDocs(data)),
      versionRef.set(generateVersion(data, docsRef.key))
    ])
  })
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })

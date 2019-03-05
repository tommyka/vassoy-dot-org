# Vassoy dot org

[![Netlify Status](https://api.netlify.com/api/v1/badges/8c94022c-544c-4601-a93a-8e254817ac11/deploy-status)](https://app.netlify.com/sites/vassoy/deploys)

### Utvikling lokalt
```
$ git clone https://github.com/tommyka/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ npm run develop
```
For at teste CMS-delen lokalt
```
$ npm run build
$ npm run serve
```

## Debugging
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')

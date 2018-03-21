# js-common-a2dev

gather sometimes need.

```bash
npm run bootstrap
npm test
```

# paskages

- [common-a2dev](./packages/common-a2dev)
- [file-a2dev](./packages/file-a2dev)
- [http-a2dev](./packages/http-a2dev)
- [log-a2dev](./packages/log-a2dev)
- [mochatester-a2dev](./packages/mochatester-a2dev)
- [tasks-a2dev](./packages/tasks-a2dev)
- [slack-a2dev](./packages/slack-a2dev)

# npm scripts

- all clean: `npm run clean`
- bootstrap: `npm run bootstrap`
  - learn bootstrap and build
- build: `npm run build`
  - bable transform all package
  - **NOTE**: each package need `.babelrc`
- dev: `npm run dev`
  - watch file change and auto transform

# test

## test all packages

use `mocha`

```bash
npm run test
```

## test one package or grep

```bash
# one package
npm run testOne -- ./packages/${package}/test
# one package with grep
npm run testOne -- ./packages/${package}/test --grep #{pattern}
```

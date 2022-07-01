import { Addon } from '@embroider/addon-dev/rollup';
import ts from 'rollup-plugin-ts';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: {
    ...addon.output(),
    sourcemap: true,
  },

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints(['index.ts', 'components/xrouter.ts']),

    // This allows us to reexport modules into the app's module namespace so
    // that traditional global resolving can find them.
    addon.appReexports(['components/xrouter.js']),

    ts({
      transpiler: 'babel',
      browserslist: false,
      tsconfig: {
        // when `hooks` is specified, fileName is required
        fileName: 'tsconfig.json',
        hook: (config) => ({
          ...config,
          declaration: true,
          declarationMap: true,
          // See: https://devblogs.microsoft.com/typescript/announcing-typescript-4-5/#beta-delta
          // Allows us to use `exports` to define types per export
          // However, we can't use that feature until the minimum supported TS is 4.7+
          declarationDir: './dist',
        }),
      },
    }),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets(['**/*.css']),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};

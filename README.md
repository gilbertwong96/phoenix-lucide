[![npm version](https://img.shields.io/npm/v/phoenix-lucide)](https://www.npmjs.com/package/phoenix-lucide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![CI](https://github.com/gilbertwong96/phoenix-lucide/actions/workflows/ci.yml/badge.svg)](https://github.com/gilbertwong96/phoenix-lucide/actions/workflows/ci.yml)

# Phoenix Lucide

This plugin is used to integrate [lucide][lucide] icons with the project using the
[Phoenix Framework][phoenix-framework] and [Tailwind CSS][tailwind].


## Usage

1. Declare lucide dependency in mix.exs:

``` elixir
defp deps do
  [
    ...
    {:lucide,
     github: "lucide-icons/lucide",
     tag: "v0.265.0",
     sparse: "icons",
     app: false,
     compile: false,
     depth: 1}
    ...
  ]
end
```

2. Add the package into `assets/package.json`:

```bash
pnpm --prefix assets add phoenix-lucide
```

3. Declare the plugin in the `assets/app.css`:

``` css
@import "tailwindcss" source(none);
@source "../css";
@source "../js";
@source "../../lib/your_app_web";

@plugin "phoenix-lucide";
```

4. Run the tailwind command:

```js
mix tailwind your_app
```

## License

MIT © Gilbert Wong. See [LICENSE.md](LICENSE.md) for details.

[lucide]: https://lucide.dev
[phoenix-framework]: https://www.phoenixframework.org
[tailwind]: https://tailwindcss.com

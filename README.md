<h3 align="center">
    <br />
    rbxts-transformer-inline
</h3>

<p align="center">
A debugging transformer, lets you get better debugging in roblox-ts
</p>

&nbsp;

## Main Feature 🔥

automatically adds `$file` symbol to your logging methods.

```ts
log.Info("Hello world")
```

```lua
log.Info("src/sever/example.ts Hello world")
```

###### works with templates, variables and strings

## Symbols 

### `$line`

get the line you are on.

```ts
const firstLine = $line

print(firstLine, $line)
```

```lua
local firstLine = 1

print(1, 3)
```

### `$column`

get the column you are on.
###### you get the column from the start of the symbol

```ts
const column = $column

print(column, $column)
```

```lua
local column = 16

print(16, 15)
```

### `$file`

get the file you are on.

```ts
const thisFile = $file

print(thisFile)
```

```lua
local thisFile = "src/sever/example.ts"

print(thisFile)
```

## configuration

### FileSymbolFormat [string]

lets you add some things to the transform result.

#### `%l`

add the line info: `"%main:%l"` -> `src/server/example.ts:1`

#### `%c`

add the column info: `"%main:%c"` -> `src/server/example.ts:1`
###### from the start of the $file symbol

#### `%main`
add the file info (you should always include this): `%main` -> `src/server/example.ts`

### CustomLogger [object]

#### `Enabled` [boolean]

enables or disables this feature.

default: `true`

#### `PackageName` [string]

the name of the package for your logging class.

default: `@rbxts/log`

#### `LogMethods` [string[]]

the methods used to log messages within your logging class.

default: `["Verbose", "Debug", "Info", "Warn", "Error", "Fatal"]`

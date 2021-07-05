[@pashoo2/data-cache-utils](README.md) / Exports

# @pashoo2/data-cache-utils

## Table of contents

### Interfaces

- [IDataCachingDecoratorDecoratedFunction](interfaces/idatacachingdecoratordecoratedfunction.md)

### Type aliases

- [FirstParameter](modules.md#firstparameter)
- [TSimpleTypes](modules.md#tsimpletypes)

### Functions

- [dataCachingUtilsCachingDecoratorGlobalCachePerClass](modules.md#datacachingutilscachingdecoratorglobalcacheperclass)
- [mapValuesForFurtherComparison](modules.md#mapvaluesforfurthercomparison)
- [memoize](modules.md#memoize)
- [memoizeLastReturnedValue](modules.md#memoizelastreturnedvalue)

## Type aliases

### FirstParameter

Ƭ **FirstParameter**<`F`\>: `Parameters`<`F`\> extends infer FirstArg[] ? `FirstArg` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends (`arg`: `any`) => `any` |

#### Defined in

types.ts:10

___

### TSimpleTypes

Ƭ **TSimpleTypes**: `number` \| `Number` \| `string` \| `String` \| `boolean` \| ``null`` \| `undefined`

#### Defined in

types.ts:1

## Functions

### dataCachingUtilsCachingDecoratorGlobalCachePerClass

▸ `Const` **dataCachingUtilsCachingDecoratorGlobalCachePerClass**<`T`, `V`, `I`\>(`cacheItemsMaxCapacity?`, `getKeyByMethodArgument?`): (`target`: `object`, `propertyKey`: `string`, `descriptor`: `PropertyDescriptor`) => `PropertyDescriptor`

!WARNING - it used the same cache for all
instances of a class.

decorator for a method, will be wrapped for
caching values of a mostly used keys.
Must be used only for immutable
key-value stores

**`property`** {number} cachedValuesCount - number
of a cached values

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `V` |
| `I` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `cacheItemsMaxCapacity` | `number` |
| `getKeyByMethodArgument?` | (`value`: `T`) => `unknown` |

#### Returns

`fn`

▸ (`target`, `propertyKey`, `descriptor`): `PropertyDescriptor`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `object` |
| `propertyKey` | `string` |
| `descriptor` | `PropertyDescriptor` |

##### Returns

`PropertyDescriptor`

#### Defined in

data-cache-utils-caching-decorator-global-cache-per-class/data-cache-utils-caching-decorator-global-cache-per-class.ts:39

___

### mapValuesForFurtherComparison

▸ `Const` **mapValuesForFurtherComparison**(`values`): `any`[]

Map array passed to a map which includes a
values by itself and some primitive values
which are determine that the value has
changed.
E.g. it may be a number of keys in an object,
or number of items into an array or entries in
a SET

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `any`[] |

#### Returns

`any`[]

#### Defined in

data-cache-utils-main.ts:57

___

### memoize

▸ `Const` **memoize**<`F`, `A`, `R`\>(`functionToMemoize`): (`arg`: `A`) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends (`arg`: `any`) => `any` |
| `A` | extends `unknown` |
| `R` | extends `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionToMemoize` | `F` |

#### Returns

`fn`

▸ (`arg`): `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `A` |

##### Returns

`R`

#### Defined in

data-cache-utils-memoization.ts:6

___

### memoizeLastReturnedValue

▸ `Const` **memoizeLastReturnedValue**<`F`\>(`func`): (...`args`: `Parameters`<`F`\>) => `ReturnType`<`F`\>

Returns a function which will return the same result
as the last one if the arguments are equals to the
arguments for the last result memoized.

**`template`**

**`template`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends (...`arg`: `any`[]) => `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `F` |

#### Returns

`fn`

- returns a function which only the last result will be memoized

▸ (...`args`): `ReturnType`<`F`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<`F`\> |

##### Returns

`ReturnType`<`F`\>

#### Defined in

data-cache-utils-memoization.ts:42

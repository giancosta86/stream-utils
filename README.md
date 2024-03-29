# stream-utils

_Utilities for streams and iterables_

![GitHub CI](https://github.com/giancosta86/stream-utils/actions/workflows/publish-to-npm.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@giancosta86%2Fstream-utils.svg)](https://badge.fury.io/js/@giancosta86%2Fstream-utils)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)

**stream-utils** is a minimalist TypeScript library providing utilities for _streams_ and _iterables_.

In particular:

- `AsyncIterable.from()` takes a variable list of arguments of any type, creating an `AsyncIterable` which returns their values. Each argument can be:

  - an `Iterable` or an `AsyncIterable`: in this case, its elements will be yielded, one by one

  - _any other data type_: it will be yielded as it is

- `AsyncIterable.wrapXml()`: takes an `AsyncIterable<string>` of XML chunks and returns another - having a customizable XML opening tag at the beginning and the related closing tag at the end

- `addBatchListener()`: attaches an event listener - to any event of any `Stream` - that gets called only after such event has been notified the number of times

- `Iterable.isEmpty()`: returns if the `Iterable` is empty

- `Iterable.isSupported()`: type guard ensuring that the value is an `Iterable`

- `Iterable.getFirst()`: returns the first item of an `Iterable`; if such `Iterable` is empty, an error is thrown

- `Iterable.equals()`: returns `true` if the two given iterables have the same length - and all the items at the same position are equal according to the given _equality function_ passed as the optional 3rd argument (by default, _strict equality_ via `===`)

- `Iterable.rangeIncluding()`: returns an `Iterable<number>` returning the values from the lower bound L up to the upper bound U - including both. If L > U, an empty `Iterable` is returned instead

## Installation

```bash
npm install @giancosta86/stream-utils
```

or

```bash
yarn add @giancosta86/stream-utils
```

The public API entirely resides in the root package index, so you shouldn't reference specific modules.

## Further reference

For additional examples, please consult the unit tests in the source code repository.

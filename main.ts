//-----------------------------------------------------
// 0 - Basic Function
//-----------------------------------------------------
/*
export function getNumberOf(value) {
  return value.length || value.size || value;
}
*/
// implicit argument type is any (sloppy transpiler configuration)
// implicit return type is any (user assumes number)
// Implicit type casts in logical ORs are error-prone (length = 0, ect.)
// user is responsible for correct usage (passing of only valid arguments)
// type errors in undefined and null unit tests


//-----------------------------------------------------
// 1 - Explicit any Type
//-----------------------------------------------------
// activates strict mode
/*
export function getNumberOf(value: any) {
  return value.length || value.size || value;
}
*/
// explicit argument type is any (explicitly suggests that it can handle any type)
// implicit return type is any (user assumes number yet may receive undefined)
// implicit type casts in logical ORs are error-prone
// user is responsible for correct usage (passing of only valid arguments)
// type errors in undefined and null unit tests

//-----------------------------------------------------
// 2 - Falsy Check
//-----------------------------------------------------
// adds handling of undefined and null
/*
export function getNumberOf(value: any) {
  if (value) {
    return value.length || value.size || value;
  }
}
*/
// explicit argument type is any (explicitly suggests that it can handle any type)
// implicit return type is any (user assumes number yet may receive undefined)
// Implicit type casts in logical ORs are error-prone (number = 0, etc.)


//-----------------------------------------------------
// (2a) - Optional Chaining
//-----------------------------------------------------
/*
export function getNumberOf(value: any) {
  if (value?.length || value?.size) { 
    return value.length || value.size || value;
  }
}
*/
// explicit argument type is any (explicitly suggests that it can handle any type)
// implicit return type is any (user assumes number yet may receive undefined)
// Implicit type casts in logical ORs are error-prone (''.length = 0, etc.)
// ignores numbers


//-----------------------------------------------------
// 3 - Strict undefined / null Checks
//-----------------------------------------------------
/*
export function getNumberOf(value: any) {
  if (value !== undefined && value !== null) {
    if ((value.length !== undefined && value.length !== null)) {
      return value.length;
    } else if (value.size !== undefined && value.size !== null) {
      return value.size;
    } else {
      return value;
    }
  }
}
*/
// explicit argument type is any (explicitly suggests that it can handle any type)
// implicit return type is any (user assumes number yet may receive undefined)
// ignores booleans, Symbols, etc.
// complex runtime check
// poor readability


//-----------------------------------------------------
// 4 - Union Return Type
//-----------------------------------------------------
// adds explicit return types
/*
export function getNumberOf(value: any): number | undefined {
  if (value !== undefined && value !== null) {
    if ((value.length !== undefined && value.length !== null)) {
      return value.length;
    } else if (value.size !== undefined && value.size !== null) {
      return value.size;
    } else {
      return value;
    } 
  }

  return undefined;
}
*/
// explicit argument type is any (explicitly suggests that it can handle any type)
// explicit return type is not unambigous
// ignores booleans, Symbols, etc.
// complex runtime check
// poor readability

//----------------------------------------------------------------------
// 5 - unknown Argument Type / in-Operator / hasOwnProperty / Type Cast
//----------------------------------------------------------------------
// sets unknown argument type
/*
export function getNumberOf(value: unknown): number | undefined {
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length;
  } else if (typeof value === 'number') {
    return value;
  } else if (value instanceof Map) {
    return value.size;
  }
  else if (typeof value === 'object' && value !== null) {
    if ('length' in value) {
      return (value as { length: number }).length;
    } else if ('size' in value) {
      return (value as { size: number }).size;
    }
  }

  return undefined;
}
*/
// transpiler error as length property cannot be infered
// explicit return type is not unambigous
// type cast reduces transpiler safety
// neither in nor hasOwnProperty are perfect
// complex runtime check


//-----------------------------------------------------
// 6 - Union argument type
//-----------------------------------------------------
// sets explicit argument type
/*
export function getNumberOf(value: number | { length: number } | { size: number }): number {
  return typeof value === 'number' ? value : value.length ?? value.size;
}
*/
// transpiler error as length and size properties cannot be infered


//-----------------------------------------------------
// 7 - Type Guards
//-----------------------------------------------------
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
/*
export function hasSize(value: object): value is { size: number } {
  return typeof value === 'object' && value !== null && 'size' in value;
}

export function getNumberOf(value: number | { length: number } | { size: number }): number {
  if (isNumber(value)) {
    return value;
  } else if (hasSize(value)) {
    return value.size;
  }

  return value.length;
}
*/
// hasSize type guard argument must be any instead of object


//-----------------------------------------------------
// 8 - Never Type
//-----------------------------------------------------
/*
type LengthOrSize = number | { length: number, size?: never } | { length?: never, size: number };

export function getNumberOf(value: LengthOrSize): number {
  if (isNumber(value)) {
    return value;
  } else {
    return value.length ?? value.size;
  }
}
*/
// HasLengthOrSize type is not generic


//-----------------------------------------------------
// 9 - Generic Utility Type
//-----------------------------------------------------
/*
type EitherOr<Type, KeysEither extends keyof any, KeysOr extends keyof any, KeysType = unknown> =
  Type extends
  ({ [Key in KeysEither]: KeysType } & { [Key in KeysOr]?: never }) |
  ({ [Key in KeysEither]?: never } & { [Key in KeysOr]: KeysType })
  ? Type : never;

type LengthOrSize<Type> = EitherOr<Type, 'length', 'size', number>;

export function getNumberOf<Type>(value: number | LengthOrSize<Type>) {
  return isNumber(value) ? value : value.length ?? value.size;
}
*/
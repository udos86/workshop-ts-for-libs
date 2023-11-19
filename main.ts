//-----------------------------------------------------
// Basic Function
//-----------------------------------------------------
export function getNumberOf(value) {
  return value.length || value.size || value;
}
// Implicit any (sloppy transpiler configuration)
// implicit return type is any (user assumes number)
// Implicit type casts in logical ORs
// prone to incorrect usage 
// very bad code quality overall


//-----------------------------------------------------
// Explicit any Type
//-----------------------------------------------------
/*
export function getNumberOf(value: any) {
  return value.length || value.size || value;
}
*/
// Implicit any return type
// prone to incorrect usage


//-----------------------------------------------------
// Falsy Check
//-----------------------------------------------------
/*
export function getNumberOf(value: any) {
  if (value) {
    return value.length || value.size || value;
  }
}
*/


//-----------------------------------------------------
// Optional Chaining
//-----------------------------------------------------
/*
export function getNumberOf(value: any) {
  if (value?.length || value?.size) { 
    return value.length || value.size || value;
  }
}
*/


//-----------------------------------------------------
// Strict undefined / null Checks
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
// ignores booleans 
// implicitly returns undefined / return type is any (user assumes number)
// complex runtime check
// poor readability


//-----------------------------------------------------
// Union Return Type
//-----------------------------------------------------
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
// does not consider booleans
// complex runtime check
// poor readability


//-----------------------------------------------------
// unknown Argument Type / in-Operator / hasOwnProperty / Type Cast
//-----------------------------------------------------
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
// type cast reduces transpiler safety
// neither in nor hasOwnProperty are perfect
// complex runtime check


//-----------------------------------------------------
// Union argument type
//-----------------------------------------------------
/*
export function getNumberOf(value: number | string | { length: number } | { size: number }): number {
  return typeof value === 'number' ? value : value.length ?? value.size;
}
*/
// transpiler error as length and size properties cannot be infered


//-----------------------------------------------------
// Type Guards
//-----------------------------------------------------
function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
/*
function hasSize(value: any): value is { size: number } {
  return typeof value === 'object' && value !== null && 'size' in value;
}

export function getNumberOf(value: number | string | { length: number } | { size: number }): number {
  if (isNumber(value)) {
    return value;
  } else if (hasSize(value)) {
    return value.size;
  }

  return value.length;
}
// hasSize type guard argument must be any
*/

//-----------------------------------------------------
// Never Type
//-----------------------------------------------------
/*
type LengthOrSize = number | string | { length: number, size?: never } | { length?: never, size: number };

export function getNumberOf(value: LengthOrSize): number {
  if (isNumber(value)) {
    return value;
  } else {
    return value.length ?? value.size;
  }
}
// HasLengthOrSize type is not generic
*/


//-----------------------------------------------------
// Generic Utility Type
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
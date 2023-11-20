num getNumberOf(dynamic value) {
  switch (value) {
    case num():
      return value;
    case Iterable() || String():
      return value.length;
    case {'length': var lengthOrSize} || {'size': var lengthOrSize}:
      return lengthOrSize;
    case (length: var lengthOrSize) || (size: var lengthOrSize):
      return lengthOrSize;
    default: 
      return -1;
  }
}
// Only works for Maps & Records (not for classes)
// Dart dynamic type cannot prevent the passing unambigious arguments

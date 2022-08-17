/**
 * Filters all elements in an array that match a given substring.
 * @param array an array of random attributes.  can be object/string/number/etc
 * @param searchTerm a string or substring
 */
export const fuzzySearch = <T>(array: T[], searchTerm: string): T[] =>
  array.reduce<T[]>((searchedElements, element) => {
    if (typeof element === 'object' && searchObject(element, searchTerm))
      return [...searchedElements, element]

    if (
      typeof element === 'string' ||
      typeof element === 'number' ||
      typeof element === 'boolean'
    ) {
      if (searchElement(element, searchTerm))
        return [...searchedElements, element]
    }

    // if (Array.isArray(element) && fuzzySearch(element, searchTerm).length > 0)
    //   return [...searchedElements, element]

    return searchedElements
  }, [])

/**
 *  compares every attribute of an object to a string.
 *  If any attributes match the string, the function returns true.
 *  If the attribute is an object, this function is run recursively.
 * @param object any type of object
 * @param searchTerm whatever substring you are wanting to search
 */
export const searchObject = <T extends Record<any, any>>(
  object: T,
  searchTerm: string
): boolean =>
  Object.values(object).reduce((isMatch, attribute) => {
    // If any attribute in the object has matched, return true
    if (isMatch) return true

    if (!attribute) return isMatch

    // If the attribute is an object, recurse
    if (typeof attribute === 'object')
      return searchObject(attribute, searchTerm)

    // if the attribute is a string/bool/num, check if it matches
    if (typeof attribute === 'number' || typeof attribute === 'boolean') {
      return searchElement(attribute.toString(), searchTerm)
    }

    if (typeof attribute === 'string')
      return searchElement(attribute, searchTerm)

    // if (Array.isArray(attribute)) return false
    // return fuzzySearch(attribute, searchTerm).length !== 0

    // If it's anything else, ignore it
    return isMatch
  }, false)

type Element = string | number | boolean
const searchElement = (element: Element, searchTerm: string) =>
  sanitize(element).includes(sanitize(searchTerm))

const sanitize = (element: Element) => element.toString().toLowerCase()

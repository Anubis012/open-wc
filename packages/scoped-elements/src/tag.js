let counter = 0;

export const SUFFIX = 'se'; // scoped element

// https://html.spec.whatwg.org/multipage/custom-elements.html#prod-potentialcustomelementname
const pcenChar = `
    -
    | \\.
    | [0-9]
    | [a-z]
    | \\u00B7
    | [\\u00c0-\\u00d6]
    | [\\u00d8-\\u00f6]
    | [\\u00f8-\\u037d]
    | [\\u037f-\\u1fff]
    | [\\u200c-\\u200d]
    | [\\u203f-\\u2040]
    | [\\u2070-\\u218f]
    | [\\u2c00-\\u2fef]
    | [\\u3001-\\ud7ff]
    | [\\uf900-\\ufdcf]
    | [\\ufdf0-\\ufffd]
    | [\\u10000-\\ueffff]
`.replace(/(\r\n|r\|\n|\s)/gm, '');

const tagRegExp = new RegExp(`[a-z](${pcenChar})*-(${pcenChar})*`);

const isValidTag = tag => tagRegExp.exec(tag) !== null;

const isTagRegistered = (registry, name) => !!registry.get(name);

const incrementTagName = (registry, tag) => {
  const newName = `${tag}${(counter += 1)}`;

  if (isTagRegistered(registry, newName)) {
    return incrementTagName(registry, tag);
  }

  return newName;
};

export const createUniqueTag = (registry, tagName = '') => {
  if (!isValidTag(tagName)) {
    throw new Error('tagName is invalid');
  }

  const tag = `${tagName}-${SUFFIX}`;

  if (isTagRegistered(registry, tag)) {
    return incrementTagName(registry, tag);
  }

  return tag;
};

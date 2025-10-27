import { hasOwn } from 'yq-ui-code/src/utils/util';

export function isVNode(node) {
  return node !== null && typeof node === 'object' && hasOwn(node, 'componentOptions');
};

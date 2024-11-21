import { MosaicNode } from 'react-mosaic-component';
import { ViewId } from './mosaic';

export const generateNewId = (): ViewId => {
  const timestamp = Date.now();
  return `new-${timestamp}` as ViewId;
};

export const removeNodeFromMosaic = (
  node: MosaicNode<ViewId>,
  id: ViewId
): MosaicNode<ViewId> | null => {
  if (!node) return null;
  if (node === id) return null;
  if (typeof node === 'object') {
    const newFirst = removeNodeFromMosaic(node.first, id);
    const newSecond = removeNodeFromMosaic(node.second, id);

    if (!newFirst && !newSecond) return null;
    if (!newFirst) return newSecond!;
    if (!newSecond) return newFirst!;

    return { ...node, first: newFirst, second: newSecond };
  }
  return node;
};



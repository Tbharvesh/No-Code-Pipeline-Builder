// ImageDisplayNode.js
import { BaseNode } from './BaseNode';

export const ImageDisplayNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Image Display"
      inputHandles={[{ id: `${id}-imageInput` }]}
    >
      <span>Displays image from input</span>
    </BaseNode>
  );
};

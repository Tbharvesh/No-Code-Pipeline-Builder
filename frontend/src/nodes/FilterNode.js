import { BaseNode } from './BaseNode';

export const FilterNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="Filter"
      inputHandles={[{ id: `${id}-in` }]}
    >
      <span>Logs data here.</span>
    </BaseNode>
  );
};

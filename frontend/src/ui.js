// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { KnowledgeBaseReader } from './nodes/KnowledgeBaseReader'; 
import { LoggerNode } from './nodes/LogNode';
import { APICallNode } from './nodes/APICallNode';
import { MathNode } from './nodes/MathNode';
import { ImageDisplayNode } from './nodes/ImageDisplayNode';


import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  log: LoggerNode,
  knowledgebasereader: KnowledgeBaseReader,
  apiCall: APICallNode,
  math: MathNode,
  imageDisplay: ImageDisplayNode
};


const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);
   const getInitNodeData = (nodeID, type) => {
  switch (type) {
    case 'customInput':
      return { inputName: 'Input', inputType: 'Text' };
    case 'customOutput':
      return { outputName: 'Output', outputType: 'Text' };
    case 'text':
      return { text: '{{input}}' };
    case 'log':
      return { log: 'Log this message' };
    case 'math':
      return { a: 0, b: 0, operation: 'add' };
    case 'knowledgebasereader':
      return { filterCondition: 'default' };
    case 'imageDisplay':
      return { imageSrc: 'https://via.placeholder.com/150' };

    case 'apiCall':
      return { url: 'https://jsonplaceholder.typicode.com/posts/1' };

    default:
      return { nodeType: type };
  }
};



    // const getInitNodeData = (nodeID, type) => {
      
      
    //   let nodeData = { id: nodeID, nodeType: `${type}` };
    //   return nodeData;
    // }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div ref={reactFlowWrapper} style={{width: '100wv', height: '70vh'}}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
            >
                <Background color="#aaa" gap={gridSize} />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
        </>
    )
}
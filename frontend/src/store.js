// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    // NEW: Execution-related state
    nodeData: {}, // Stores input/output data for each node
    executionStatus: 'idle', // 'idle', 'running', 'completed', 'error'
    executionQueue: [], // Array of node IDs in execution order
    nodeExecutionStatus: {}, // Status of individual nodes: 'pending', 'running', 'completed', 'error'
    executionResults: {}, // Store execution results/outputs for each node
    executionError: null, // Store any execution errors
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
        
      });
    },
    updateNodeField: (nodeId, field, value) => {
  set((state) => ({
    nodes: state.nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            [field]: value
          }
        };
      }
      return node;
    }),
  }));
},
}))
    // updateNodeField: (nodeId, fieldName, fieldValue) => {
    //   set({
    //     nodes: get().nodes.map((node) => {
    //       if (node.id === nodeId) {
    //         node.data = { ...node.data, [fieldName]: fieldValue };
    //       }
  
    //       return node;
    //     }),
    //   });
    // updateNodeField: (nodeId, fieldName, fieldValue) => {
  // }));

    // executionStatus : (nodeId, status) => set({
    //     nodes: get().nodes.map((node) => {
    //       if (node.id === nodeId) {
    //         node.data = { ...node.data, executionStatus: status };
    //       }
    //       return node;
    //     }),
    //   }); 
    // executionQueue: (queue) => set({
    //     executionQueue: queue,
    //   }),

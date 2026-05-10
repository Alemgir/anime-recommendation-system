import treeData from '../data/animeDecisionTree.json';

/**
 * Returns the whole tree data
 * @returns {Object} The tree
 */
export const getDecisionTree = () => {
  return treeData;
};

/**
 * Validates the JSON decision tree structure.
 * Checks for missing nodes, invalid next references, etc.
 * @param {Object} tree - The JSON tree data
 * @returns {boolean} True if valid
 */
export const validateDecisionTree = (tree = treeData) => {
  if (!tree.startNode) {
    console.warn("Tree is missing 'startNode'");
    return false;
  }
  
  const nodes = tree.nodes;
  if (!nodes) {
    console.warn("Tree is missing 'nodes'");
    return false;
  }
  
  if (!nodes[tree.startNode]) {
    console.warn(`Start node '${tree.startNode}' not found in nodes`);
    return false;
  }

  let isValid = true;

  Object.values(nodes).forEach(node => {
    if (node.type === 'question') {
      if (!node.options || node.options.length === 0) {
        console.warn(`Question node '${node.id}' has no options.`);
        isValid = false;
      } else {
        node.options.forEach(opt => {
          if (!nodes[opt.next]) {
            console.warn(`Broken link: Node '${node.id}' references non-existent next node '${opt.next}'.`);
            isValid = false;
          }
        });
      }
    } else if (node.type === 'result') {
      if (!node.anime) {
        console.warn(`Result node '${node.id}' is missing 'anime' data.`);
        isValid = false;
      }
    } else {
      console.warn(`Node '${node.id}' has unknown type '${node.type}'.`);
      isValid = false;
    }
  });

  if (isValid) {
    console.log("Decision tree validated successfully. No broken links found.");
  }
  
  return isValid;
};

/**
 * Gets a specific node by ID
 * @param {string} nodeId
 * @returns {Object|null}
 */
export const getNode = (nodeId) => {
  return treeData.nodes[nodeId] || null;
};

/**
 * Gets the start node
 * @returns {Object}
 */
export const getStartNode = () => {
  return getNode(treeData.startNode);
};

/**
 * Gets the next node based on the current node and chosen option index
 * @param {Object} currentNode 
 * @param {number} optionIndex 
 * @returns {Object|null}
 */
export const getNextNode = (currentNode, optionIndex) => {
  if (!currentNode || currentNode.type !== 'question' || !currentNode.options[optionIndex]) {
    return null;
  }
  return getNode(currentNode.options[optionIndex].next);
};

/**
 * Checks if a node is a result node
 * @param {Object} node 
 * @returns {boolean}
 */
export const isResultNode = (node) => {
  return node && node.type === 'result';
};

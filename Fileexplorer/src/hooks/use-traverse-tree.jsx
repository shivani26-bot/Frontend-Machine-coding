// here we will use tree datastructure, when we click on anynode we have more items inside it

// custom hook
// we will insert the node into the parent node

const useTraverseTree = () => {
  // folderId- id of the folder inside which we are suppose to insert a file or folder
  // item- item to be insertNode
  // isfolder- whether the inserted item is folder or file
  // tree- entire tree structure
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      // return the tree after modifying
      return tree;
    }
    // recursively traverse through the tree use dfs to traverse the tree
    // logic for nested folders
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });
    // return the tree after modifying
    return { ...tree, items: latestNode };
  }

  //   const deleteNode = () => {};
  //   const updateNode = () => {};
  return { insertNode };
};

export default useTraverseTree;

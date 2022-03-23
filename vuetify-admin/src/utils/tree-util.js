/**
 * Flatten tree
 *
 * @param {*} tree
 * @param field if null is given, return every node of tree
 * @returns
 */
export const flattenTree = (tree, field = null) => {
  const resultArr = [];
  tree.forEach((t) => {
    if (!t.children) {
      resultArr.push(field ? t[field] : t);
    } else {
      resultArr.push(field ? t[field] : t, ...flattenTree(t.children, field));
    }
  });
  return resultArr;
};

/**
 * Get certain node by id
 *
 * @param {*} tree
 * @param {*} id
 */
export const getNode = (tree, id) => {
  let result = null;
  tree.forEach((t) => {
    if (t.id === id) {
      result = t;
    } else if (t.children && !result) {
      result = getNode(t.children, id);
    }
  });

  return result;
};

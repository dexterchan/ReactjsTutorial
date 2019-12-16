import _ from "lodash";

const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _.slice(items, startIndex, startIndex + pageSize);
  /*
  Or lodash API
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
    */
};

export { paginate };

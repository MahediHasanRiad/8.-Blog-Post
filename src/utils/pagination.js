export const Pagination = ({
  page = 1,
  limit = 10,
  totalUser = 0,
  totalPage = 0,
}) => {
  const pagination = {
    page,
    limit,
    totalUser,
    totalPage,
  };
  if (page > 1) {
    pagination.prev = page - 1;
  }
  if (page < totalPage) {
    pagination.next = page + 1;
  }

  return pagination
};

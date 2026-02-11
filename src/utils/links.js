
// export const Links = ({ req, pagination }) => {
//   const links = {
//     self: req.path,
//   };

//   if (pagination.next) {
//     // convert query object to string
//     const query = new URLSearchParams({...req.query, page: page + 1,}).toString();
//     links.next = `${req.path}?${query}`;
//   }

//   if (pagination.prev) {
//     const query = new URLSearchParams({ ...req.query, page: page - 1 }).toString();
//     links.prev = `${req.path}?${query}`;
//   }

//   return links;
// };
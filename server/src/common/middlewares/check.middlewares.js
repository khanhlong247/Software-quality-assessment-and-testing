const userServices = require("../../api/services/user.service");

// module.exports.handleQuery = async (req, res, next) => {
//   const columns = await bananaServices.getColumnNames('users');

//   let {
//       page,
//       limit,
//       sort,
//       order
//   } = req.query;

//   order.toLowerCase() === "desc" ? order = "desc" : order = "asc";

//   if (!columns.includes(sort.toLowerCase())) {
//       sort = ("id");
//   } else {
//       sort = sort.toLowerCase();
//   }

//   if (isNaN(limit) || limit < 1) {
//       limit = 5;
//   }

//   if (isNaN(page) || page < 1) {
//       page = 1
//   }

//   req.filter = {
//       page,
//       limit,
//       sort,
//       order
//   };
//   next();
// }

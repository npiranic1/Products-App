const Sequelize = require("sequelize");
const BranchProduct = require("../models/BranchProduct");
const OrderProduct = require("../models/OrderProduct");

// novo ime baze u phpSql
const db = new Sequelize("products2", "root", "", {
  host: "localhost",
  dialect: "mysql",
  //port: 3306
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.log("error:" + err);
  });

const User = require("../models/User")(db, Sequelize);
const Product = require("../models/Product")(db, Sequelize);
const Order = require("../models/Order")(db, Sequelize);
const Branch = require("../models/Branch")(db, Sequelize);
const branchProduct = require("../models/BranchProduct")(db, Sequelize);
const orderProduct = require("../models/OrderProduct")(db, Sequelize);
db.users = User;
db.products = Product;
db.orders = Order;
db.branches = Branch;
db.branch_products = BranchProduct;
db.order_products = OrderProduct;

// veze
// branchProduct link
db.branch_products = db.branches.belongsToMany(db.products, {
  through: branchProduct,
  foreign_key: "branchId",
});
db.products.belongsToMany(db.branches, {
  through: branchProduct,
  foreign_key: "productId",
});
// orderProduct link
db.orderProduct = db.orders.belongsToMany(db.products, {
  through: orderProduct,
  foreign_key: "orderId",
});
db.products.belongsToMany(db.orders, {
  through: orderProduct,
  foreign_key: "productId",
});
// user order link
db.orders.belongToMany(db.users, {
  foreign_key: "userId"
})


db.sync(() => console.log(`Kreirane tabele i uneseni podaci!`));

module.exports = db;

# DropShop Ecommerce

## 🌐 Live Demo
[DropShop Ecommerce](https://dropshop-client.vercel.app/)


## 📝 Project Overview

The **DropShop Ecommerce** platform includes a simple **Ecommerce Management System** and **Reseller Panel** designed to provide seamless shopping experiences and efficient reseller operations.

### **Key Functionalities:**
- 🛒 **Cart Management:** Add, update, and remove items from the shopping cart.
- 🔗 **Persistent Cart:** Ensure the cart remains active across sessions.
- 📦 **Reseller Panel:** Resellers can manage orders, track profits, and initiate withdrawals.
- 🔄 **Real-time Updates:** Live pricing and stock validation.
- 🔐 **Security:** Role-based access control for secure transactions.

## 🚀 Features (Developed by Me)

### **Cart Management System**

#### **Cart API Endpoints**
- **POST** `/api/cart` - Add a product to the cart.
- **GET** `/api/cart` - Retrieve the cart for a logged-in user.
- **PATCH** `/api/cart/:itemId` - Update item quantity.
- **DELETE** `/api/cart/:itemId` - Remove an item from the cart.

#### **Cart Interface Features**
- **Cart Icon with Badge:** Shows the total items in the cart.
- **Cart Page:** Displays all added products with subtotal calculations.
- **Quantity Management:** Increase/decrease product quantity dynamically.
- **Real-time Price Updates:** Automatically adjust totals based on item changes.
- **Validation:** Prevent out-of-stock purchases.

### **Reseller Panel**

#### **Reseller API Endpoints**
- **GET** `/api/reseller/stats` - Fetch reseller balance and earnings.
- **GET** `/api/orders` - Retrieve reseller's orders.
- **GET** `/api/orders/:id` - Fetch a specific order by ID.
- **GET** `/api/profit/monthly` - Fetch monthly profit statistics.
- **POST** `/api/payment/withdraw` - Request a withdrawal.

#### **Reseller Panel Interface**
- **Dashboard Overview:**
  - 📊 **Stats Display:** Available balance, monthly profits, and order status breakdown.
  - 🔍 **Order Analytics:** Pie chart representing completed, pending, and canceled orders.
  - 💰 **Earnings Overview:** Recent transactions with order details.

- **Customer & Order Management:**
  - 🛍 **Customer List:** View and filter customers by total spend, number of orders, and contact details.
  - 📦 **Order List:** Search and filter orders by status, date, and customer.
  - 📄 **Order Details:** Manage each order with status updates and profit tracking.

- **Profit & Withdrawal Management:**
  - 📈 **Earnings Graph:** Displays daily profits for the last 30 days.
  - 💵 **Withdraw Funds:** Request withdrawals based on available balance.
  - 🔄 **Transaction History:** Track previous withdrawals and payment statuses.

## 🔒 Security & Authorization
- **Role-based Access:** Only authorized users can access and modify cart or reseller panel data.
- **Session Management:** Persistent login for better user experience.

## 📚 Tech Stack
- **Frontend:** React.js, JavaScript, Material UI, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB, Yup
- **Authentication:** JWT-based secure login system
- **State Management:** Context API for live cart updates

## 📦 Installation
```sh
# Clone the repository
git clone https://github.com/mustaqimbd/dropShop.git
cd dropShop

# Copy .env.example to .env and configure the environment variables
cp .env.example .env

# Install dependencies
npm install

# Run the application
npm run dev
```
### Environment Variables
Make sure to configure the `.env` file with appropriate values.

## 👥 Team

Developed by **Md. Mustaqim Khan** and **Md. Abir Mahmud**.

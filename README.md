# ** Payments App**  
A simple **Payment** application built using **Node.js, Express, MongoDB**, and soon-to-be **React + TailwindCSS** for the frontend.

![GitHub repo size](https://img.shields.io/github/repo-size/Ajeeth-07/transaction-project)
![GitHub last commit](https://img.shields.io/github/last-commit/Ajeeth-07/transaction-project)


---

## 📌 **Features**
✅ User authentication with **JWT**  
✅ Secure password hashing with **bcrypt**  
✅ CRUD operations using **REST APIs**  
✅ User account creation with **random balance initialization**  
✅ User profile update  
✅ Fetch user list (bulk search)  
✅ Check account balance  
🔜 Transfer amount between users  
🔜 Full **React frontend** with **TailwindCSS** 

---

## 🛠 **Tech Stack**
### **Backend:**
- 🟢 **Node.js** + **Express.js** – Server & API  
- 🟢 **MongoDB** + **Mongoose** – Database  
- 🔐 **JWT** – Authentication  
- 🔑 **bcrypt** – Password hashing  
- ✅ **Zod** – Request validation  

### **Frontend **:
- ⚛ **React.js** – UI  
- 🎨 **TailwindCSS** – Styling  
- 🔄 **Recoil / Context API** – State management  
- 🔗 **Axios** – API requests  

---


## ⚡ **Installation & Setup**

### **1️⃣ Clone the repository**
```bash
git clone https://github.com/yourusername/paytm-clone.git
cd paytm-clone
npm install
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
node src/index.js
```
| Endpoint              | Method | Description                         |
|----------------------|--------|-------------------------------------|
| `/signup`           | `POST` | Register a new user                |
| `/signin`           | `POST` | Authenticate user & return JWT     |
| `/update`           | `PUT`  | Update user profile (**Auth required**) |
| `/bulk?filter=<query>` | `GET` | Get user list with search filter  |


| Endpoint     | Method | Description                                    |
|-------------|--------|------------------------------------------------|
| `/balance`  | `GET`  | Fetch user account balance (**Auth required**) |
| `/transfer` | `POST` | Transfer money between users (**Coming Soon**) |

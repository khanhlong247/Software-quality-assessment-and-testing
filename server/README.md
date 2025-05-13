# 🚀 Express JavaScript Basic Authentication

## 🛠️ Getting Started

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- `cd server` 
- Install dependencies: `npm install`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run start:dev`


## 📁 Server Structure

``` server
├── node_modules/
├── src/
│   ├── api/
│   │   ├── configs/
│   │   │   ├── db.js
│   │   │   └── role.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── user.controller.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── user.routes.js
│   │   ├── services/
│   │   │   ├── auth.service.js
│   │   │   └── user.service.js
│   │   └── api-docs/
│   │       └── swagger.js
│   └── common/
│       └── middlewares/
│       │   ├── auth.middlewares.js
│       │   ├── check.middlewares.js
│       │   └── role.middlewares.js
│       └─── utils/
│
├──.env
├──.gitignore
├── app.js
├── package-lock.json
├── package.json
├── .gitignore
└── README.md
```
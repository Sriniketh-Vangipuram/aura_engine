# Aura Engine

> High-performance inventory management backend built for the Aura Engine
> commercial client delivery project.

## Overview

Aura Engine is a production-oriented Node.js backend designed to efficiently
manage and analyze large-scale inventory data.

The system is designed around a dataset of 50,000+ products and provides:

- Server-side pagination
- Product search
- Category filtering
- Dynamic sorting
- MongoDB indexing
- MongoDB aggregation analytics
- Request validation with Zod
- Business-rule enforcement
- Centralized error handling
- Performance testing

The primary goal is to prevent large inventory datasets from being loaded
into application memory and to move filtering, pagination, and analytics
operations to MongoDB.

---

## Technology Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Zod
- Helmet
- CORS
- dotenv
- Faker.js
- Render

---

## Project Structure

```text
aura-engine/
│
├── scripts/
│   ├── seedProducts.js
│   ├── testQueryPerformance.js
│   └── testAnalyticsPerformance.js
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── analytics.controller.js
│   │   └── inventory.controller.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   └── Product.js
│   │
│   ├── routes/
│   │   ├── analytics.routes.js
│   │   └── inventory.routes.js
│   │
│   ├── services/
│   │   ├── analytics.service.js
│   │   └── inventory.service.js
│   │
│   ├── validators/
│   │   └── product.validator.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example


Product Schema

Each inventory product contains:

productName
sku
category
price
cost
stockQuantity
reorderLevel
lastUpdated

SKU values are unique.

Database Indexing

Indexes are used for frequently accessed inventory fields:

sku
category
productName

The SKU and category indexes were verified using MongoDB query
execution plans.

This allows MongoDB to perform indexed lookups rather than relying
on full collection scans for supported queries.

Data Seeding

The project includes a standalone seeding script capable of generating
50,000 realistic mock inventory products.

Run:

node scripts/seedProducts.js

The seeded dataset is used for testing query and aggregation performance
under realistic data volume.

API
Health Check
GET /health

Example response:

{
  "success": true,
  "message": "Aura Engine API is healthy"
}
Get Inventory
GET /api/inventory
Query Parameters
Parameter	Description	Example
page	Page number	1
limit	Records per page	50
search	Product name search	audio
category	Category filter	electronics
sort	Sorting field	-price
Example
GET /api/inventory?page=1&limit=5&search=audio&category=electronics&sort=-price

The response contains:

{
  "success": true,
  "data": [],
  "pagination": {
    "totalRecords": 100,
    "totalPages": 20,
    "currentPage": 1,
    "hasNextPage": true
  }
}

Pagination is performed server-side so that the API only returns the
requested records rather than the complete inventory dataset.

Analytics
GET /api/analytics

The analytics endpoint uses a MongoDB aggregation pipeline rather than
retrieving all products into Node.js.

The pipeline uses:

$match
$group
$project
$multiply

The aggregation calculates:

Total products
Total stock
Total inventory valuation
Category-level statistics

Inventory valuation is calculated as:

price × stockQuantity

Example response:

{
  "success": true,
  "data": [
    {
      "totalProducts": 6285,
      "totalStock": 3172692,
      "totalValuation": 4021383544.71,
      "category": "electronics"
    }
  ]
}
Validation

Product creation and updates use Zod validation.

Business rules include:

price >= cost
stockQuantity >= 0

Invalid requests return:

400 Bad Request

The API also handles duplicate SKUs and invalid MongoDB product IDs
through centralized error handling.

Performance

The database was seeded with 50,000 products to test realistic query
performance.

The analytics aggregation was tested against the seeded dataset and
completed within the required 500ms target.

Example measured execution:

Analytics execution time: 255.83 ms

MongoDB execution-plan testing also verified index usage for supported
queries.

Environment Variables

Create a .env file:

MONGODB_URI=your_mongodb_connection_string
PORT=5000

Never commit the .env file to source control.

A .env.example file is included for configuration reference.

Running Locally

Clone the repository and install dependencies:

npm install

Configure environment variables:

MONGODB_URI=your_mongodb_connection_string
PORT=5000

Start the server:

node src/server.js

The API will be available at:

http://localhost:5000
Production Deployment

The API is deployed on Render.

Production URL:

https://aura-engine-26r2.onrender.com/

Health check:

https://aura-engine-26r2.onrender.com/health

AI Transparency

AI assistance was used as an engineering support tool during development.

Details of the AI interactions and engineering decisions are documented
in:

Prompts.md

AI-generated suggestions were reviewed and adapted to the project's
architecture and requirements.

Project Status

The Aura Engine backend MVP is complete and deployed.

Implemented:

50,000+ product dataset
MongoDB indexes
Inventory API
Server-side pagination
Search
Category filtering
Sorting
Analytics aggregation
Product validation
Business-rule validation
Centralized error handling
Performance testing
Production deployment
├── .gitignore
├── Prompts.md
├── package.json
└── README.md

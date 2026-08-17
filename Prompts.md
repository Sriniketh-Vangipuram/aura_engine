# AI Interaction Documentation

## Project
Aura Engine

## Purpose

AI assistance was used as an engineering support tool while implementing
the MongoDB inventory backend.

## MongoDB Aggregation

### Problem

The analytics endpoint needed to calculate inventory statistics without
loading all 50,000 products into application memory.

### Engineering Approach

An aggregation pipeline was designed using:

- `$match` to filter inventory records
- `$group` to calculate product count, total stock and inventory valuation
- `$project` to format the API response

Inventory valuation is calculated using:

price × stockQuantity

### Performance Verification

The aggregation was tested against the seeded dataset.

MongoDB execution used the category index and completed within the
required performance target of 500ms.

## API Validation

Zod was used to validate POST and PUT product requests.

Business rules include:

- price cannot be lower than cost
- stockQuantity cannot be negative

Invalid requests return HTTP 400.

## Engineering Decision

AI-generated suggestions were reviewed and adapted to the project's
existing architecture rather than copied blindly.
# Database Schema

This directory contains Supabase database schemas and migrations.

## Schema Files

### `schema/tables.sql`
Main database tables and core configuration:
- users table and profile management
- products table
- orders and order_items tables
- RLS (Row Level Security) policies

### `schema/addresses.sql`
User address management:
- addresses table
- Automatic updated_at trigger
- Address limit per user (5 addresses)

### `schema/storage.sql`
File storage configuration:
- avatars bucket creation
- File upload policies
- Security rules

## Setup

1. Open SQL Editor in your Supabase project
2. Run the files in this order:
   ```
   1. schema/tables.sql
   2. schema/addresses.sql
   3. schema/storage.sql
   ```

## Migrations

The `migrations/` directory will be used for future database changes.

## Seed Data

The `seeds/` directory will be used for test data.

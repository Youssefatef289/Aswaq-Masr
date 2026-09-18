# Supabase Setup

## Environment

Create `.env` locally from `.env.example`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Never commit `.env`, service-role keys, or user passwords.

## Database

Run [`supabase_schema.sql`](./supabase_schema.sql) in the Supabase SQL editor. It creates:

> If the SQL editor reports missing columns such as `brands.name_ar`, `offers.sort_order`, or `site_settings.id`, the project contains an older incompatible schema. In that case, use a new empty Supabase project or remove the old application tables first, then run the complete file from top to bottom. Do not run only the final `ALTER TABLE` lines; the foreign-key relationships are required for the nested product and order queries.

- `profiles`: Auth profile data, unique usernames, and `customer`/`manager`/`admin` roles.
- `categories`, `brands`, `products`, `product_images`: public catalog data. Products include `subcategory` for type-based search.
- `offers`, `coupons`: promotions.
- `orders`, `order_items`: checkout data and order history.
- `site_settings`: store contact details, delivery defaults, social links, and `whatsapp_governorates`.
- `wishlists`: authenticated customer wishlists.

The `handle_new_user` trigger creates a profile after Supabase Auth registration. The app generates an internal Auth email and users sign in with their unique username and password. RLS allows public reads for active catalog/settings rows, customer access to their own records, and admin/manager writes. The `delete_user_account` RPC deletes an Auth account and is restricted to admin/manager roles.

After applying the schema, disable **Confirm email** in Supabase under **Authentication > Providers > Email** because registration does not ask the customer for an email address. Customers use their username and password to sign in.

## Admin account

1. Create the account in Supabase Dashboard under **Authentication > Users > Add user**.
2. Confirm the email as needed for the project.
3. Run this statement while signed in as the project owner in SQL Editor, replacing the email:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@example.com';
```

The application reads the role only from `public.profiles`; it never trusts client metadata.

## Data migration

Import catalog rows into the tables above using the Supabase dashboard CSV importer or a one-time server-side script. The React app no longer imports local product, category, brand, offer, or order mock files. `src/data/governorates.js` contains only the static delivery-area selector and can be replaced later by a `governorates` table if per-area shipping management is needed.

## Verification

```bash
npm install
npm run build
```

Test registration, login, an admin-only route, catalog CRUD, order creation, order status updates, customer deletion, and the WhatsApp visibility rule after applying the schema.
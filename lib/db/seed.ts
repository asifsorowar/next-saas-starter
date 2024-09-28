import { stripe } from "../payments/stripe";
import { db } from "./drizzle";
import {
  users,
  teams,
  teamMembers,
  permissions,
  PermissionEnum,
} from "./schema";
import { hashPassword } from "@/lib/auth/session";

async function createStripeProducts() {
  console.log("Creating Stripe products and prices...");

  const baseProduct = await stripe.products.create({
    name: "Base",
    description: "Base subscription plan",
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 800, // $8 in cents
    currency: "usd",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: "Plus",
    description: "Plus subscription plan",
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 1200, // $12 in cents
    currency: "usd",
    recurring: {
      interval: "month",
      trial_period_days: 7,
    },
  });

  console.log("Stripe products and prices created successfully.");
}

async function createPostPermissions(
  role: "owner" | "user" | "author",
  actions: PermissionEnum[]
) {
  await db.insert(permissions).values([
    {
      permissions: actions,
      collectionName: "post",
      role: role,
    },
  ]);
}

async function createUser(role: "owner" | "user" | "author", teamId: number) {
  const email = `${role}@test.com`;
  const password = "test1234";
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: role,
      },
    ])
    .returning();

  await db.insert(teamMembers).values({
    teamId: teamId,
    userId: user.id,
    role: role,
  });

  console.log(`Initial ${role} 'user' created.`);

  return user;
}

async function seed() {
  const [team] = await db
    .insert(teams)
    .values({
      name: "Test Team",
    })
    .returning();

  await createUser("user", team.id);
  await createPostPermissions("user", ["read"]);

  await createUser("author", team.id);
  await createPostPermissions("author", ["read", "create", "update"]);

  await createUser("owner", team.id);
  await createPostPermissions("owner", ["read", "create", "delete"]);

  await createStripeProducts();
}

seed()
  .catch((error) => {
    console.error("Seed process failed:", error);
    process.exit(1);
  })
  .finally(() => {
    console.log("Seed process finished. Exiting...");
    process.exit(0);
  });

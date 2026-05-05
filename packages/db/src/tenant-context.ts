import { getPool } from './index.js';
import type pg from 'pg';

/**
 * Sets the PostgreSQL session variable `app.current_tenant_id` on a given client.
 * This is used by Row-Level Security policies to filter data by tenant.
 */
export async function setTenantContext(client: pg.PoolClient, tenantId: string): Promise<void> {
  await client.query("SET LOCAL app.current_tenant_id = $1", [tenantId]);
}

/**
 * Executes a query function within a tenant-scoped database session.
 * Sets the tenant context on the connection, runs the provided function,
 * and ensures the client is released back to the pool.
 *
 * Usage:
 *   const result = await withTenant(tenantId, async (client) => {
 *     return client.query('SELECT * FROM bookings');
 *   });
 */
export async function withTenant<T>(
  tenantId: string,
  queryFn: (client: pg.PoolClient) => Promise<T>,
): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    await setTenantContext(client, tenantId);
    const result = await queryFn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

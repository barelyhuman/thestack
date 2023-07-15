import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export function exclude<T extends Record<string, unknown>, Key extends keyof T>(
  model: T,
  keys: Key[]
): Omit<T, Key> {
  return Object.fromEntries(
    Object.entries(model).filter(([key]) => !keys.includes(key as Key))
  ) as Omit<T, Key>
}

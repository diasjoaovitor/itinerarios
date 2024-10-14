import { query } from '@/query'

export const prepareTestsEnvironment = async () => {
  const [tables] = await query('show tables;')
  await query(
    `
      set foreign_key_checks = 0;
      ${(tables as any[]).map(({ Tables_in_local_database: name }) => `truncate table ${name};`).join(' ')}
      set foreign_key_checks = 1;
    `,
    [],
    true
  )
}

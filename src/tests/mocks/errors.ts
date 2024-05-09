const error = {
  name: 'DatabaseError',
  message: 'Não foi possível realizar esta operação.',
  status: 422
}

export const mockedDatabaseError = {
  referenced_table_does_not_have_the_id: {
    ...error,
    code: 'ER_NO_REFERENCED_ROW_2'
  },
  id_is_already_referenced_in_another_table: {
    ...error,
    code: 'ER_ROW_IS_REFERENCED_2'
  },
  invalid_format: {
    ...error,
    code: 'ER_TRUNCATED_WRONG_VALUE'
  },
  duplicated_data: {
    ...error,
    code: 'ER_DUP_ENTRY'
  }
}

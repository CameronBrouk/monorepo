import { describe, expect, test } from 'vitest'
import { GroupClassPayload } from './groupClass.validators.js'
import { createSingle, updateSingle, getSingle } from '../test-utils.js'

const MOCK_DATE = new Date(1969, 6, 9)

const requestBody: GroupClassPayload = {
  danceType: 'test',
  description: '',
  difficultyLevel: '',
  end: MOCK_DATE,
  start: MOCK_DATE,
  location: '',
  name: 'Starting Swing',
  stripeProductId: 1
}

describe('Group Class', () => {
  test('GET, Create, Update, and Delete a Group Class', async () => {
    // Create Works
    const createResponse = await createSingle('group-class', requestBody)
    expect(createResponse.status).toBe(200)
    expect(createResponse.body.name).toBe('Starting Swing')

    // Update Works
    const updateResponse = await updateSingle(
      'group-class',
      { name: 'Continuing Swing' },
      createResponse.body.id
    )
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body.name).toBe('Continuing Swing')

    // Get Works
    const getResponse = await getSingle('group-class', updateResponse.body.id)
    expect(getResponse.status).toBe(200)
    expect(getResponse.body.name).toBe('Continuing Swing')
  })
})

import { closeConnections, getConnection } from './connect'
import mongoose from 'mongoose'

jest.mock('mongoose')

describe('connect', () => {
  beforeEach(async () => {
    mongoose.connect.mockReset()
  })

  afterAll(async () => {
    await closeConnections()
  })

  it('Should throw an error', async () => {
    // Given
    mongoose.connect = jest.fn(() => Promise.reject(new Error('Connection impossible')))
    const nbOfTries = 5

    // When
    const error = await getConnection(nbOfTries).catch(error => error)

    // Then
    expect(mongoose.connect.mock.calls).toBeDefined()
    expect(mongoose.connect.mock.calls).toHaveLength(nbOfTries)
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty('message')
    expect(error.message).toContain('Out of retries')
  })

  it('Should connect once', async () => {
    // Given
    // When
    await getConnection()

    // Then
    expect(mongoose.connect.mock.calls).toBeDefined()
    expect(mongoose.connect.mock.calls).toHaveLength(1)
  })
})

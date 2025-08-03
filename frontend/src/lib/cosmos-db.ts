import type { InputValues, CalculationResults } from "../types"

export interface DatabaseRecord {
  id?: string
  inputs: InputValues
  outputs: CalculationResults | null
  timestamp: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api'

export async function saveToDatabase(data: DatabaseRecord): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: data.inputs,
        outputs: data.outputs,
        timestamp: data.timestamp,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("✅ Saved to Cosmos DB:", result.id)
  } catch (error) {
    console.error("❌ Failed to save to Cosmos DB:", error)
    throw error
  }
}

export async function loadFromDatabase(): Promise<DatabaseRecord | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/load`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error("❌ Failed to load from Cosmos DB:", error)
    return null
  }
}

export async function deleteFromDatabase(companyName: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/delete/${encodeURIComponent(companyName)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log("🗑️ Deleted from Cosmos DB:", companyName)
  } catch (error) {
    console.error("❌ Failed to delete from Cosmos DB:", error)
    throw error
  }
} 
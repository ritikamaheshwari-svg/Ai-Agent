const queue: (() => Promise<void>)[] = []

let processing = false

export const addToQueue = (task: () => Promise<void>) => {
  queue.push(task)
  processQueue()
}

const processQueue = async () => {
  if (processing) return

  processing = true

  while (queue.length > 0) {
    const job = queue.shift()

    if (job) {
      try {
        await job()
      } catch (err) {
        console.error("Queue tx error:", err)
      }
    }
  }

  processing = false
}
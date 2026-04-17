const queue: (() => Promise<void>)[] = []
let processing = false

export const addToQueue = (txFn: () => Promise<void>) => {
  queue.push(txFn)
  processQueue()
}

const processQueue = async () => {
  if (processing) return
  processing = true

  while (queue.length > 0) {
    const tx = queue.shift()
    if (tx) await tx()
  }

  processing = false
}
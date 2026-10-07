import { createInterface } from "node:readline"
import { Writable } from "node:stream"

export async function ask(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const answer = await new Promise<string>((resolve) => rl.question(question, resolve))
  rl.close()
  return answer.trim()
}

/** Reads a line without echoing it to the terminal. */
export async function askHidden(question: string): Promise<string> {
  let muted = false
  const output = new Writable({
    write(chunk, _enc, cb) {
      if (!muted) process.stdout.write(chunk)
      cb()
    },
  })
  const rl = createInterface({ input: process.stdin, output, terminal: true })
  process.stdout.write(question)
  muted = true
  const answer = await new Promise<string>((resolve) => rl.question("", resolve))
  rl.close()
  process.stdout.write("\n")
  return answer
}

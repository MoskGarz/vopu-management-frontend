import { tolgee } from '../plugins/tolgee'

async function getMessage(key: string): Promise<string> {
  await tolgee.run()
  return tolgee.t(key) ?? key
}

export function useMessages() {
  return { getMessage }
}
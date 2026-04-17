import { deposit } from "../src/services/vaultService"

async function main() {

  const tx = await deposit("1")

  console.log("Deposited 1 ETH:", tx)

}

main()
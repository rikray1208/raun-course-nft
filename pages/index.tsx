import {BaseLayout, NftList} from "@ui"
import ntfs from "../content/meta.json"
import {INft} from "@models/INft"
import {useWeb3} from "@ui/providers/web3";

export default function Home() {
    const {ethereum, provider, contract} = useWeb3();
    if (contract) {
        console.log(provider)
    }

    if( provider ) {
        getAcc()
    }

    async function getAcc() {
        const temp = await provider!.listAccounts();
        console.log(temp)
    }
  return (
      <BaseLayout>
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
              <div className="absolute inset-0">
                  <div className="bg-white h-1/3 sm:h-2/3" />
              </div>
              <div className="relative">
                  <div className="text-center">
                      <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Amazing Creatures NFTs</h2>
                      <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                          Mint a NFT to get unlimited ownership forever!
                      </p>
                  </div>
                  <NftList nfts={ntfs as INft[]}/>
              </div>
          </div>
      </BaseLayout>
  )
}

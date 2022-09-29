export interface IChainValue {
  id: number;
  symbol: string;
  slug: string;
  name: string;
  imageUrl: string;
  color: string;
}
export const getChainValue = (chainId: number): IChainValue => {
  return chainValueList[chainId - 1];
};
export const chainValueList: IChainValue[] = [
  {
    id: 1,
    symbol: 'BTC',
    slug: 'bitcoin',
    name: 'Bitcoin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
    color: '#F7931A',
  },
  {
    id: 2,
    symbol: 'ETH',
    slug: 'ethereum',
    name: 'Ethereum',
    imageUrl:
      'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
    color: '#627EEA',
  },
  {
    id: 3,
    symbol: 'ETH2',
    slug: 'ethereum-2',
    name: 'Ethereum 2',
    imageUrl:
      'https://dynamic-assets.coinbase.com/9f3242d7cd65e806cc3a12b3d5c2ba3a6a1140dee43f7d1eafaad8747855065aff50fe2bda4d897076cbdada8b9b971015cb2d19c04e67b20a8145d506283287/asset_icons/4e321a458d36c0c6467b346f85e88caddde59fcc0f03444e374de32cc3def4d6.png',
    color: '#8E76FF',
  },
  {
    id: 4,
    symbol: 'USDT',
    slug: 'tether',
    name: 'Tether',
    imageUrl:
      'https://dynamic-assets.coinbase.com/41f6a93a3a222078c939115fc304a67c384886b7a9e6c15dcbfa6519dc45f6bb4a586e9c48535d099efa596dbf8a9dd72b05815bcd32ac650c50abb5391a5bd0/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png',
    color: '#22A079',
  },
  {
    id: 5,
    symbol: 'USDC',
    slug: 'usdc',
    name: 'USD Coin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png',
    color: '#2775CA',
  },
  {
    id: 6,
    symbol: 'BNB',
    slug: 'bnb',
    name: 'BNB',
    imageUrl:
      'https://dynamic-assets.coinbase.com/36f266bc4826775268588346777c84c1ae035e7de268a6e124bcc22659f0aa2bf4f66dcad89b2ac978cfdb4d51c2d9f63cf7157769efb500b20ca16a6d5719c7/asset_icons/7deb6ff58870072405c0418d85501c4521c3296e33ef58452be98e4ca592ed19.png',
    color: '#F0B90B',
  },
  {
    id: 7,
    symbol: 'XRP',
    slug: 'xrp',
    name: 'XRP',
    imageUrl:
      'https://dynamic-assets.coinbase.com/e81509d2307f706f3a6f8999968874b50b628634abf5154fc91a7e5f7685d496a33acb4cde02265ed6f54b0a08fa54912208516e956bc5f0ffd1c9c2634099ae/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png',
    color: '#222222',
  },
  {
    id: 8,
    symbol: 'BUSD',
    slug: 'binance-usd',
    name: 'Binance USD',
    imageUrl:
      'https://dynamic-assets.coinbase.com/e155811f316fe86805fd984c690b316a916660f3331d93e4eda952bde355160056872add3c54ea7bde7310e5fcea71eb26a28f50962f601fe4f4b9d8f332f4aa/asset_icons/8ff4f66b560b0bd5e292eab3fdf73229c5fc8944024adbe8920d3fa912494590.png',
    color: '#F0B90B',
  },
  {
    id: 9,
    symbol: 'ADA',
    slug: 'cardano',
    name: 'Cardano',
    imageUrl:
      'https://dynamic-assets.coinbase.com/da39dfe3632bf7a9c26b5aff94fe72bc1a70850bc488e0c4d68ab3cf87ddac277cd1561427b94acb4b3e37479a1f73f1c37ed311c11a742d6edf512672aea7bb/asset_icons/a55046bc53c5de686bf82a2d9d280b006bd8d2aa1f3bbb4eba28f0c69c7597da.png',
    color: '#0033AD',
  },
  {
    id: 10,
    symbol: 'SOL',
    slug: 'solana',
    name: 'Solana',
    imageUrl:
      'https://dynamic-assets.coinbase.com/2eefc7ffd92b6460ebdcab6fd67e384146ecdec29bff68d78f68b5d9cb9af05652a8d78087b6090c6d598f8fb9af1c3c062c33df15d0db3ba8e465b819841820/asset_icons/fd6899026b1e517bbb7995e5c992c71dc33b85edb3b28b66591579d6706deab2.png',
    color: '#728BD3',
  },
  {
    id: 11,
    symbol: 'DOGE',
    slug: 'dogecoin',
    name: 'Dogecoin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/3803f30367bb3972e192cd3fdd2230cd37e6d468eab12575a859229b20f12ff9c994d2c86ccd7bf9bc258e9bd5e46c5254283182f70caf4bd02cc4f8e3890d82/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png',
    color: '#BA9F33',
  },
  {
    id: 12,
    symbol: 'DOT',
    slug: 'polkadot',
    name: 'Polkadot',
    imageUrl:
      'https://dynamic-assets.coinbase.com/9957ebecd9f4d6a2a4cf877577364e8c9bfb937c7f8385e153fc878e9ed3766a563cdd1a80903f465f50b4edfb5089251e045d362a8fbe5b888b9de18bfcc09a/asset_icons/f786d2f3573f77db841b406bf607ac7ddfe70d533acc6d05f2cb3cb3eab11925.png',
    color: '#E6007A',
  },
  {
    id: 13,
    symbol: 'DAI',
    slug: 'dai',
    name: 'Dai',
    imageUrl:
      'https://dynamic-assets.coinbase.com/90184cca292578d533bb00d9ee98529b889c15126bb120582309286b9129df9886781b30c85c21ee9cae9f2db6dc11e88633c7361fdd1ba5046ea444e101ae15/asset_icons/ebc24b163bf1f58a9732a9a1d2faa5b2141b041d754ddc2260c5e76edfed261e.png',
    color: '#FFB74D',
  },
  {
    id: 14,
    symbol: 'MATIC',
    slug: 'polygon',
    name: 'Polygon',
    imageUrl:
      'https://dynamic-assets.coinbase.com/085ce26e1eba2ccb210ea85df739a0ca2ef782747e47d618c64e92b168b94512df469956de1b667d93b2aa05ce77947e7bf1b4e0c7276371aa88ef9406036166/asset_icons/57f28803aad363f419a950a5f5b99acfd4fba8b683c01b9450baab43c9fa97ea.png',
    color: '#8247E5',
  },
  {
    id: 15,
    symbol: 'SHIB',
    slug: 'shiba-inu',
    name: 'SHIBA INU',
    imageUrl:
      'https://dynamic-assets.coinbase.com/c14c8dc36c003113c898b56dfff649eb0ff71249fd7c8a9de724edb2dedfedde5562ba4a194db8433f2ef31a1e879af0727e6632751539707b17e66d63a9013b/asset_icons/a7309384448163db7e3e9fded23cd6ecf3ea6e1fb3800cab216acb7fc85f9563.png',
    color: '#1C2951',
  },
  {
    id: 16,
    symbol: 'TRX',
    slug: 'tron',
    name: 'TRON',
    imageUrl:
      'https://dynamic-assets.coinbase.com/49567ec5f7c7a1ccb3ce247297c443b3dd32072ee5b91902abc0f6789654e14fd3b9ed8851580b93b4daf7da13324bc61e143a2d391d9e6d8b98f8d69923e4b4/asset_icons/3c5b36c70a05bad40eee4f711aeefbb1809169a17db047bf91f1ef45828349e5.png',
    color: '#E60815',
  },
  {
    id: 17,
    symbol: 'AVAX',
    slug: 'avalanche',
    name: 'Avalanche',
    imageUrl:
      'https://dynamic-assets.coinbase.com/35f69b8c1f2c2771170e72bdb61a986b17f7d8d20c5e10bc4fc347fe301e6137960c01c31ebbac976b9fd933bf95344d751e052a27eee0dc868f8c036bb2632a/asset_icons/d8a464a40be5c1eba32428ed1d815c878d4933231193edfa483957bd3cbfe750.png',
    color: '#E84142',
  },
  {
    id: 18,
    symbol: 'UNI',
    slug: 'uniswap',
    name: 'Uniswap',
    imageUrl:
      'https://dynamic-assets.coinbase.com/a1f4b7b34069888e313f284b49012a01b3bbc37b5113319c7105170a8fe268de8f60be5a0af7a8dafa8aba31fcc21ef44bc30c1e8bbb8379064ac94965bccf26/asset_icons/aafc2f5fff21664213e2a5a2c6e31aa055f277d1069b16745d54f84c0e94f1f3.png',
    color: '#FF007A',
  },
  {
    id: 19,
    symbol: 'WBTC',
    slug: 'wrapped-bitcoin',
    name: 'Wrapped Bitcoin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/51bfc85a5a881014b4558bbe8f9758c354a0c831208f189286be93b6b0b86b886a3d656cff4122bac435ec97bd54f08a8d198103dcfab6cae8578bbc1c81afc3/asset_icons/bb1ab3b1677110aea1e1ed5a93f4440d229e01b901de963201417861c57d9add.png',
    color: '#1E182A',
  },
  {
    id: 20,
    symbol: 'LEO',
    slug: 'unus-sed-leo',
    name: 'UNUS SED LEO',
    imageUrl:
      'https://dynamic-assets.coinbase.com/d9ed743daad1025e1b137a8dcf608b860978ba595141b83bad78bdc125566802f0aee1ad29775a9748245e9d2fb08e8ec6e8a995aba843bb6d77671acda37ad9/asset_icons/af7beadbbb2b506072b8b82b3bb445b0551929460a577c2fbde5a485dbcb01fa.png',
    color: '#0667D0',
  },
  {
    id: 21,
    symbol: 'LINK',
    slug: 'chainlink',
    name: 'Chainlink',
    imageUrl:
      'https://dynamic-assets.coinbase.com/37ef8491789cea02a81cf80394ed3a4b5d9c408a969fd6bea76b403e04e7fd9cef623384d16a60f3c39e052006bc79522d902108764ce584466674a4da6cb316/asset_icons/c551d7b5ffe48f1d72e726ab8932ad98758ab414062e5e07479096089c547220.png',
    color: '#0667D0',
  },
  {
    id: 22,
    symbol: 'LTC',
    slug: 'litecoin',
    name: 'Litecoin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/f018870b721574ef7f269b9fd91b36042dc05ebed4ae9dcdc340a1bae5b359e8760a8c224bc99466db704d10a3e23cf1f4cd1ff6f647340c4c9c899a9e6595cd/asset_icons/984a4fe2ba5b2c325c06e4c2f3ba3f1c1fef1f157edb3b8ebbfe234340a157a5.png',
    color: '#A6A9AA',
  },
  {
    id: 23,
    symbol: 'ETC',
    slug: 'ethereum-classic',
    name: 'Ethereum Classic',
    imageUrl:
      'https://dynamic-assets.coinbase.com/954e17be0facc99b81203f98c65bb7cdaca969f1bc8cd8b52e7feb91cbe55d7f9581066f5bbd715c2e80f3474cb166674ac0a55e30a3486c6a004d558ade8fb9/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
    color: '#59D4AF',
  },
  {
    id: 24,
    symbol: 'ATOM',
    slug: 'cosmos',
    name: 'Cosmos',
    imageUrl:
      'https://dynamic-assets.coinbase.com/b92276a1f003b87191983dab71970a9a6d522dde514176e5880a75055af1e67ce5f153b96a2ee5ecd22729a73d3a8739b248d853bde74ab6e643bef2d1b4f88d/asset_icons/9c760bf25bca9823f9ef8d651681b779aadc71a2f543f931070034e59ef10120.png',
    color: '#2E3148',
  },
  {
    id: 25,
    symbol: 'FTT',
    slug: 'ftx-token',
    name: 'FTX Token',
    imageUrl:
      'https://dynamic-assets.coinbase.com/088c335a751afca4e1eebe1730b9d716f3ac36c6ca354015589cde70b3c7f592f8019dcc6bf0cb2ae1b6a808cb68313a0ba8e332dbfd8b91a089bae627710aa8/asset_icons/9d6f17a8256cd40984d1e85b2f99c9cc9cbc634855c75250054b8d0c671ff006.png',
    color: '#0667D0',
  },
  {
    id: 26,
    symbol: 'CRO',
    slug: 'crypto-com-coin',
    name: 'Crypto.com Coin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/b9cca547a64af22552489abd90e6aef1beda7a7891e4db2d2e622b3d892da1bd6d92b7bf8f96daefc9f49a239b9c257a9067d4c553e7e6845249e31ac683e52e/asset_icons/e54f79cc0e1915d2d49be224372e5bd33ac7c140bf8878e2d92d8beb7e5cb8b2.png',
    color: '#1D3F65',
  },
  {
    id: 27,
    symbol: 'NEAR',
    slug: 'near-protocol',
    name: 'NEAR Protocol',
    imageUrl:
      'https://dynamic-assets.coinbase.com/5ea79a9a3931318ea33126c7a8a0ff557dcfee5162010e148c271484810b3f512ca99f04d0f0d33c4dd857efb036edd1b7f6f5f3d8f9a977f513a8b3a3a3af64/asset_icons/59d6d2f03f37990397656133cf91c9397017f69652e0232f3f3b8850d18367cb.png',
    color: '#24272A',
  },
  {
    id: 28,
    symbol: 'XLM',
    slug: 'stellar',
    name: 'Stellar Lumens',
    imageUrl:
      'https://dynamic-assets.coinbase.com/ddaf9d27a2388105c5568c68ebe4078d057efac1cb9b091af6a57f4d187cf06b2701b95f75bd148d3872df32b69ebb678de71a42da317370aaec7d6448bda379/asset_icons/80782fe2d690f299e7f5bb9b89af87e1db75769e59c14fa0257054c962401805.png',
    color: '#000000',
  },
  {
    id: 29,
    symbol: 'XMR',
    slug: 'monero',
    name: 'Monero',
    imageUrl:
      'https://dynamic-assets.coinbase.com/a353373ccecedb0e8b6f51ed78db22fbe0167d63d129b15963407f71392c052ae5f2ffd5fbaa6e976da86b73987a335462022f5f54ec559360683ddb8da3da96/asset_icons/a6f13081ab7468290003b49b78fc383614e113700a151a4f9794c556f5c3ca9a.png',
    color: '#FF7519',
  },
  {
    id: 30,
    symbol: 'ALGO',
    slug: 'algorand',
    name: 'Algorand',
    imageUrl:
      'https://dynamic-assets.coinbase.com/434cf9473be68c296f9c213b64a8caaebeb0f0fcf4096f38af3175eead7107425676652c9219c003f2acaafdcb07bce1f4862fe4f3f692ca1ae1da3c3dbff546/asset_icons/40447ba4170da28e92cf5c02d5675103d44d75fd6076ad8b0f5a953b3d4d3b9e.png',
    color: '#000000',
  },
  {
    id: 31,
    symbol: 'BCH',
    slug: 'bitcoin-cash',
    name: 'Bitcoin Cash',
    imageUrl:
      'https://dynamic-assets.coinbase.com/93a4303d1b0410b79bb1feac01020e4e7bdf8e6ece68282d0af2c7d0b481c5f5c44c0cec1d7071ae8f84674dbd139e290d50a038a6a4c1bbc856ec0871b5f3e2/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png',
    color: '#8DC351',
  },
  {
    id: 32,
    symbol: 'FIL',
    slug: 'filecoin',
    name: 'Filecoin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/2bbc4131cbc45d77e1732e3f733c6d80a2bc9e514e85344cb517d59660b79e5b7377ed5e28a924f5ed750ef2c1b0718d3ef3f2504a6b0a1f6efd3d789ebf71bd/asset_icons/da7c0257d0caecc0e09e6fdd7e37c8eb23f7688329c58affd2157147f0529573.png',
    color: '#0E79FE',
  },
  {
    id: 33,
    symbol: 'LUNA',
    slug: 'terra-luna',
    name: 'Terra',
    imageUrl:
      'https://dynamic-assets.coinbase.com/349c78bb0cca8d9a48d660f500b43a88417337074e4948b964c005252a999548b514b9d06b177b5392421996329ef3b944e80638151f21ae445e8c7a19a78d4f/asset_icons/2925e68c9ec25fc3cffa661d2f5d88798a10c191ea613dd4c3951ab86904ad69.png',
    color: '#2D47A7',
  },
  {
    id: 34,
    symbol: 'FLOW',
    slug: 'flow',
    name: 'Flow',
    imageUrl:
      'https://dynamic-assets.coinbase.com/00ec02d5bad8ff25a8d3d7ac3829094182c612bb4fa883eaa96092c433271176de7d48b3b75c686f01b10ae274b3868870506e503995132954a5678af6a53664/asset_icons/fa89d5746755536254fa3351b74e1edf179a9466736dc0d9845e694135fabdfb.png',
    color: '#00EF8B',
  },
  {
    id: 35,
    symbol: 'APE',
    slug: 'apecoin',
    name: 'ApeCoin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/71d2a21895c80ade641c5e18d1cf2f7fa9c9ab47775ee6e771c98d51bd97419c9041dfb7c661f125a7f663ab7653534c16dca476dacb340197750ce378926c36/asset_icons/c23c607a3e4479ff21f66cfece0e096d673f847c46b873329ac1760dd72dc0a2.png',
    color: '#0442BE',
  },
  {
    id: 36,
    symbol: 'VET',
    slug: 'vechain',
    name: 'VeChain',
    imageUrl:
      'https://dynamic-assets.coinbase.com/0ad9feddd1edfda57c5ee772f241bf8a1b5c78c8d90da7acf5281718d67e121f9d8934e6a796cfc9d7693da2e188926b40bba5a25f9802fb2350bb5af2ff2c2c/asset_icons/2163bda6b530aca9b138244a21abf50f87626beb0605fc5fd492d0dc0eb04143.png',
    color: '#58BBF8',
  },
  {
    id: 37,
    symbol: 'QNT',
    slug: 'quant',
    name: 'Quant',
    imageUrl:
      'https://dynamic-assets.coinbase.com/edd22c67c1be01d12733c8b099847c61f917b32a3beec2627a87929904677a90c19c828cf8d4e6bc38c1601df8ad2ea72da8c0358e3dc35a973a64709fd49b61/asset_icons/acf561ece7dec38f3f5bdba4098ca00ba09dd4f9546c669e6054af6b646e927e.png',
    color: '#EF4F1F',
  },
  {
    id: 38,
    symbol: 'TON',
    slug: 'toncoin',
    name: 'Toncoin',
    imageUrl:
      'https://dynamic-assets.coinbase.com/76abfeb07c682708a146eafa744feb36ef842ce69fd5a4898a13a8a9d4f90835ec197d1514dcc917934ddb4cacba5855bed2923e100c513533cac94bd26a5183/asset_icons/b8c02d1da75b3357d5c66c8078c2f764443b74eae892ca2b1fcf70106d1b76a3.png',
    color: '#0667D0',
  },
  {
    id: 39,
    symbol: 'ICP',
    slug: 'internet-computer',
    name: 'Internet Computer',
    imageUrl:
      'https://dynamic-assets.coinbase.com/ed7bf42a67c2cd79802a5685e3e2b297ecf71d5cb982c0026af14642a6db0ec6cb2d38a0be5064bd840e8004c480e30d57e3815f0839f25689a4c5f2d6534225/asset_icons/629aeccaf62a91a47136afb8ea3d1b8f444bd3740984e37f3bdeaec54c61625a.png',
    color: '#292A2E',
  },
  {
    id: 40,
    symbol: 'CHZ',
    slug: 'chiliz',
    name: 'Chiliz',
    imageUrl:
      'https://dynamic-assets.coinbase.com/272d99cdacc88f37e3dfcc2288a14a28b2943b73f77d81c590506a5ee7ff4908b6c8ce302cbc28f977c311992e23c30dee92ddee4a6676aa0270684b0a17ddb0/asset_icons/e3867b2fce424b81ffa29d4d9c01dca00a4313ca79d0a7834655b50b87106329.png',
    color: '#B02728',
  },
  {
    id: 41,
    symbol: 'HBAR',
    slug: 'hedera',
    name: 'Hedera',
    imageUrl:
      'https://dynamic-assets.coinbase.com/9723f1c6d5f27b06241e43255beb6f36cd78640c20699eec1c4efe40c85f6fd78705ad1b41217f3cd88f933c408855bda98e2ff6f2c640e8b11f50138951bbc4/asset_icons/ad9328a7d74c7faf3c051f50ec614a58e6b4e04cd171c638a84d43d7c6d0f5ec.png',
    color: '#0A0B0D',
  },
  {
    id: 42,
    symbol: 'XTZ',
    slug: 'tezos',
    name: 'Tezos',
    imageUrl:
      'https://dynamic-assets.coinbase.com/196aae0d1ec13906a21975544fac79eb2752e379a149a1e5c6b7ffe6159986f474c67f929afe61541df773d97d883e638911f125753fd8974d91eca8c1657aff/asset_icons/e294b1cf6ec96713bf6a15e72b13313e446489d7709cda328f825679370b46b9.png',
    color: '#2C7DF7',
  },
  {
    id: 43,
    symbol: 'MANA',
    slug: 'decentraland',
    name: 'Decentraland',
    imageUrl:
      'https://dynamic-assets.coinbase.com/e0e4a3520fda10f3955134f55373dbe6f74d286dcc0a7473586f950bdd7ed6db4aa97f89ae79858fb099f41f7136ed679549aa69f3f72e85433a0dce58831378/asset_icons/ef7c6e37d8cb47adc33193e086c8d8e1a01ad7c5666cec3f6484a3e3560da9db.png',
    color: '#B8AFA2',
  },
  {
    id: 44,
    symbol: 'SAND',
    slug: 'the-sandbox',
    name: 'The Sandbox',
    imageUrl:
      'https://dynamic-assets.coinbase.com/636bffe426aa918ed0b2bdb246c070dcd080f9fb2ac4f7086f9ad4214fa3ab807fff973d7c1a3fd284f512d5ce95f3b9a9590d68bec5bfd90ff08a1f0634457f/asset_icons/1e0ff193e9cb40ae8cbdfc3ee7253eea6a3cc943fcf14a4f053f086e80b29dd1.png',
    color: '#00AEEF',
  },
  {
    id: 45,
    symbol: 'EOS',
    slug: 'eos',
    name: 'EOS',
    imageUrl:
      'https://dynamic-assets.coinbase.com/deaca3d47b10ed4a91a872e9618706eec34081127762d88f2476ac8e99ada4b48525a9565cf2206d18c04053f278f693434af4d4629ca084a9d01b7a286a7e26/asset_icons/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png',
    color: '#000000',
  },
  {
    id: 46,
    symbol: 'EGLD',
    slug: 'elrond-egld',
    name: 'Elrond',
    imageUrl:
      'https://dynamic-assets.coinbase.com/ddb0a134f87419ccbc8ea7c630347c18dd4c024c68140f4bb13f18cd92b0af775b6460379f33740c4595c0e51175b26cfc0a5294bdd2a3ac1c64c945d12df0ef/asset_icons/7572261d622ff9ee9d78f04838a88100044c3cf1f7d1c389d6a9871558b21a45.png',
    color: '#0667D0',
  },
  {
    id: 47,
    symbol: 'THETA',
    slug: 'theta-network',
    name: 'Theta Network',
    imageUrl:
      'https://dynamic-assets.coinbase.com/3be5d54f1653ac3e70ffa43ac8f6aa127e315432cbee2f6526d5b9dde19b0d6927ffdc911c3c96917c4ac66b3f717b5b6afa21cfda0ce57f135ddfdf8512c459/asset_icons/4e59a25a86b06b64147f7f1420a875b5a353b1be247ba8a4f714be53f1733e9a.png',
    color: '#0667D0',
  },
  {
    id: 48,
    symbol: 'AAVE',
    slug: 'aave',
    name: 'Aave',
    imageUrl:
      'https://dynamic-assets.coinbase.com/6ad513d3c9108b163cf0a4c9fd3441cadcb9cf656ea7b9fb333eb7e4a94cd503528e0a94188285d31aedfc392f0793fd4161f7ad4e04d5f6b82e4d70a314d295/asset_icons/80f3d2256652f5ccd680fc48702d130dd01f1bd7c9737fac560a02949efac3b9.png',
    color: '#A5378C',
  },
  {
    id: 49,
    symbol: 'AXS',
    slug: 'axie-infinity',
    name: 'Axie Infinity',
    imageUrl:
      'https://dynamic-assets.coinbase.com/ed34b4bc1039d6dc676534148cf61f77fb2cf1cf9de2c71a35880e3051c5b4daa001dde2841fb49e470a18316d53c36b5c7eeaa3e7bbf4f949f2b5b1157f388f/asset_icons/adb3bb720b424e6e1f09cab13dd5a6d2d26eb33c1f84e38a0051569308559655.png',
    color: '#0055D5',
  },
  {
    id: 50,
    symbol: 'BSV',
    slug: 'bitcoin-sv',
    name: 'Bitcoin SV',
    imageUrl:
      'https://dynamic-assets.coinbase.com/dbf675ba34815d8c76f42a481729953d83c0665c4ed4a38b68074b84b65bbd7be179817b818dfc490175e9061b3471d2375e23ae726a7d07cfe88c734d2e09e1/asset_icons/1d23bd6ffcbb743c32d080b850684215ec089964c7c12c6ccc40c4032ecf7c28.png',
    color: '#0667D0',
  },
  {
    id: 51,
    symbol: 'PAX',
    slug: 'paxos-standard',
    name: 'Paxos Standard',
    imageUrl:
      'https://dynamic-assets.coinbase.com/f7011c5e40b4632eb98c27ec01ca882e7312e0aa142da2874ca53c127d500421b5e97b2df8bb5ac4f117a02b40055725febfa59ecf794ba4cd8012e46cb67e0d/asset_icons/6250a9500c719441c58b39cdcb96f8540dbae71f8394b68c2a302b1168ba3a84.png',
    color: '#2F8260',
  },
  {
    id: 52,
    symbol: 'OKB',
    slug: 'okb',
    name: 'OKB',
    imageUrl:
      'https://dynamic-assets.coinbase.com/a2e23962fd43db23d708d85ca096d87d754a0435534292952577619ddc6c05d8f4a374f168cd727c007a476c4d624e31e027d28820fabd71a15f85ac8c678da9/asset_icons/223611cb63b78283446de0b66f862d2e71bbd6f50a01d1d1c964766472b0b5c4.png',
    color: '#0667D0',
  },
  {
    id: 53,
    symbol: 'KCS',
    slug: 'kucoin-token',
    name: 'KuCoin Token',
    imageUrl:
      'https://dynamic-assets.coinbase.com/5f8ac44d7c0aaff9a27c82da3f1c5a2bc4624ec198ac1483414b5a9b56898c728e1274f77ac782a662647fc6c7080b161a6708582428820408c71c724fb71eb5/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
    color: '#0E75EE',
  },
  {
    id: 54,
    symbol: 'TUSD',
    slug: 'trueusd',
    name: 'TrueUSD',
    imageUrl:
      'https://dynamic-assets.coinbase.com/bd29b4c7c73c57f45076b3919333d17d6f35716bb65ec6cc7ee6494f045f0d46a3cb9b6ad0ba38c07ba3e02d37dfefe2233133fdd75f83d2e0f6ed3224e4e331/asset_icons/1df69704368a4f54f6e915a896b6bc5f37a2002f9db2636820c2853aa4a517ef.png',
    color: '#0667D0',
  },
  {
    id: 55,
    symbol: 'ZEC',
    slug: 'zcash',
    name: 'Zcash',
    imageUrl:
      'https://dynamic-assets.coinbase.com/000ecacb555ab8496677c23f854854b051bd62cec6bbe4c3bad9c7325183cae5f28a8758eed9c655b1b0fab1aa148e2c0fb052a02577c87ec981b16836c7cd9e/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png',
    color: '#ECB244',
  },
  {
    id: 56,
    symbol: 'MIOTA',
    slug: 'iota',
    name: 'IOTA',
    imageUrl:
      'https://dynamic-assets.coinbase.com/23886119e204f60756a1b7cc89e40b64e11373111f5f6f607580a76a5ba3bbd8637c446f8e985ed70373ebbeb91bf516be286ab49b9cf36849627cf8b6f388da/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png',
    color: '#242424',
  },
  {
    id: 57,
    symbol: 'XEC',
    slug: 'ecash',
    name: 'eCash',
    imageUrl:
      'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/d53f1edd0300b2db114388c28813a93a907c44cf965540ba7e96ace48db7fa76.png',
    color: '#0667D0',
  },
  {
    id: 58,
    symbol: 'USDD',
    slug: 'usdd',
    name: 'USDD',
    imageUrl:
      'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/4a2125caa6fd094e4bb5998fdef721f48100d8394259d2f79cc42a673aceb8a9.png',
    color: '#0667D0',
  },
  {
    id: 59,
    symbol: 'BTT',
    slug: 'bittorrent-new',
    name: 'BitTorrent-New',
    imageUrl:
      'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/785b333ae477e4dda6df5539eb0168a55bbd3d054d888d8c84328417cb18a97e.png',
    color: '#0667D0',
  },
  {
    id: 60,
    symbol: 'MKR',
    slug: 'maker',
    name: 'Maker',
    imageUrl:
      'https://dynamic-assets.coinbase.com/72be4627a61ff07a564bc85f46f20e926b0a578ee791e91ef73eb477b5bcd176edadb63b3474f82b98e1cc83ba23b1d170a539356ed8e809937f76a13580bfad/asset_icons/debfcbc694825f71051ce956aeae3a4bb197437756d4fc5cd1a207b8ea135ab6.png',
    color: '#1AAB9B',
  },
];
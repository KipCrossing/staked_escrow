/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  SingleStakedEscrow,
  SingleStakedEscrowInterface,
} from "../SingleStakedEscrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_merchant",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_requestedGoodsDescription",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EscrowCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
    ],
    name: "TradeCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
    ],
    name: "TradeCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "TradeEntered",
    type: "event",
  },
  {
    inputs: [],
    name: "cancelEscrow",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "cancelTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "completeTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "enterTrade",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "isDead",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isDeposited",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isTrading",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "merchantContactDetails",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "requestedGoodsDescription",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c0604052600d60809081526c5374616b656420457363726f7760981b60a0526000906200002e9082620001b1565b503480156200003c57600080fd5b5060405162000fd138038062000fd18339810160408190526200005f916200029a565b6200006c6004836200039e565b15620000be5760405162461bcd60e51b815260206004820152601e60248201527f616d6f756e74206d7573742062652061206d756c7469706c65206f6620340000604482015260640160405180910390fd5b600180546001600160a01b038087166001600160a01b031992831617909255600280549286169290911691909117905560038290556005620001018282620001b1565b5050505050620003c1565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200013757607f821691505b6020821081036200015857634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001ac57600081815260208120601f850160051c81016020861015620001875750805b601f850160051c820191505b81811015620001a85782815560010162000193565b5050505b505050565b81516001600160401b03811115620001cd57620001cd6200010c565b620001e581620001de845462000122565b846200015e565b602080601f8311600181146200021d5760008415620002045750858301515b600019600386901b1c1916600185901b178555620001a8565b600085815260208120601f198616915b828110156200024e578886015182559484019460019091019084016200022d565b50858210156200026d5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b80516001600160a01b03811681146200029557600080fd5b919050565b60008060008060808587031215620002b157600080fd5b620002bc856200027d565b93506020620002cd8187016200027d565b6040870151606088015191955093506001600160401b0380821115620002f257600080fd5b818801915088601f8301126200030757600080fd5b8151818111156200031c576200031c6200010c565b604051601f8201601f19908116603f011681019083821181831017156200034757620003476200010c565b816040528281528b868487010111156200036057600080fd5b600093505b8284101562000384578484018601518185018701529285019262000365565b600086848301015280965050505050505092959194509250565b600082620003bc57634e487b7160e01b600052601260045260246000fd5b500690565b610c0080620003d16000396000f3fe60806040526004361061009c5760003560e01c806399baa10c1161006457806399baa10c146101375780639c76230c14610151578063c52f2e0814610166578063d0268c1414610185578063d0e30db01461018d578063d45b00071461019557600080fd5b806306fdde03146100a15780631b31056b146100cc578063234d442b146100e15780636ab4ab2b146100f85780636e9087db1461010d575b600080fd5b3480156100ad57600080fd5b506100b66101aa565b6040516100c39190610ad1565b60405180910390f35b3480156100d857600080fd5b506100b6610238565b3480156100ed57600080fd5b506100f6610245565b005b34801561010457600080fd5b506100b66104d6565b34801561011957600080fd5b506004546101279060ff1681565b60405190151581526020016100c3565b34801561014357600080fd5b506006546101279060ff1681565b34801561015d57600080fd5b506100f66104e3565b34801561017257600080fd5b5060065461012790610100900460ff1681565b6100f66106a4565b6100f6610820565b3480156101a157600080fd5b506100f661099b565b600080546101b790610b1f565b80601f01602080910402602001604051908101604052809291908181526020018280546101e390610b1f565b80156102305780601f1061020557610100808354040283529160200191610230565b820191906000526020600020905b81548152906001019060200180831161021357829003601f168201915b505050505081565b600580546101b790610b1f565b60065460ff16156102715760405162461bcd60e51b815260040161026890610b59565b60405180910390fd5b60045460ff166102d15760405162461bcd60e51b815260206004820152602560248201527f5472616465206d75737420626520696e2070726f677265737320746f20636f6d604482015264706c65746560d81b6064820152608401610268565b6001546001600160a01b0316331461032b5760405162461bcd60e51b815260206004820152601760248201527f4f6e6c792062757965722063616e20636f6d706c6574650000000000000000006044820152606401610268565b6004805460ff199081168255600680549091166001179055600354906000906103549083610b81565b60405190915033907f8590489f6cd1dc4e28c0160f90ebe1cc8b9295529621ede22be53d1efd2495ef90600090a26002546000906001600160a01b031661039b8385610ba3565b604051600081818185875af1925050503d80600081146103d7576040519150601f19603f3d011682016040523d82523d6000602084013e6103dc565b606091505b505090508061042d5760405162461bcd60e51b815260206004820152601b60248201527f5472616e7366657220746f206d65726368616e74206661696c656400000000006044820152606401610268565b6001546040516000916001600160a01b03169084908381818185875af1925050503d806000811461047a576040519150601f19603f3d011682016040523d82523d6000602084013e61047f565b606091505b50509050806104d05760405162461bcd60e51b815260206004820152601860248201527f5472616e7366657220746f206275796572206661696c656400000000000000006044820152606401610268565b50505050565b600780546101b790610b1f565b60065460ff16156105065760405162461bcd60e51b815260040161026890610b59565b60045460ff166105645760405162461bcd60e51b815260206004820152602360248201527f5472616465206d75737420626520696e2070726f677265737320746f2063616e60448201526218d95b60ea1b6064820152608401610268565b6002546001600160a01b031633146105be5760405162461bcd60e51b815260206004820152601860248201527f4f6e6c79206d65726368616e742063616e2063616e63656c00000000000000006044820152606401610268565b6004805460ff191681556003546000916105d791610b81565b60405190915033907fbd9b0d8f9d224c898f55ec0a0cc63dbef10a9e2c719e7cf5e24e2daa01cc7f4590600090a26002546040516000916001600160a01b03169083905b60006040518083038185875af1925050503d8060008114610658576040519150601f19603f3d011682016040523d82523d6000602084013e61065d565b606091505b50509050806106a05760405162461bcd60e51b815260206004820152600f60248201526e151c985b9cd9995c8819985a5b1959608a1b6044820152606401610268565b5050565b60065460ff16156106c75760405162461bcd60e51b815260040161026890610b59565b60045460ff161561070e5760405162461bcd60e51b8152602060048201526011602482015270547261646520696e2070726f677265737360781b6044820152606401610268565b600460035461071d9190610b81565b341461076b5760405162461bcd60e51b815260206004820152601a60248201527f496e636f727265637420616d6f756e74206465706f73697465640000000000006044820152606401610268565b6002546001600160a01b031633146107d55760405162461bcd60e51b815260206004820152602760248201527f4f6e6c79207468652076616c6964206d65726368616e742063616e20656e74656044820152667220747261646560c81b6064820152608401610268565b6004805460ff1916600117905560405133907f2b93c40ae0acf581b1b376321dc5162e4796208697bb8d21de07e664d27ac8fe906108169034815260200190565b60405180910390a2565b60065460ff16156108435760405162461bcd60e51b815260040161026890610b59565b600654610100900460ff161561089b5760405162461bcd60e51b815260206004820152601760248201527f4465706f73697420697320616c7265616479206d6164650000000000000000006044820152606401610268565b6001546001600160a01b031633146108ee5760405162461bcd60e51b815260206004820152601660248201527513db9b1e48189d5e595c8818d85b8819195c1bdcda5d60521b6044820152606401610268565b60046003546108fd9190610b81565b60035461090a9190610ba3565b34146109585760405162461bcd60e51b815260206004820152601a60248201527f496e636f727265637420616d6f756e74206465706f73697465640000000000006044820152606401610268565b6006805461ff00191661010017905560405133907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c906108169034815260200190565b60065460ff16156109be5760405162461bcd60e51b815260040161026890610b59565b60045460ff1615610a055760405162461bcd60e51b8152602060048201526011602482015270547261646520696e2070726f677265737360781b6044820152606401610268565b6001546001600160a01b03163314610a5f5760405162461bcd60e51b815260206004820152601c60248201527f4f6e6c792062757965722063616e2063616e63656c20657363726f77000000006044820152606401610268565b6006805460ff19166001179055600354600090610a7e90600490610b81565b600354610a8b9190610ba3565b6040519091507f6e3be9294e58d10b9c8053cfd5e09871b67e442fe394d6b0870d336b9df984a990600090a16001546040516000916001600160a01b031690839061061b565b600060208083528351808285015260005b81811015610afe57858101830151858201604001528201610ae2565b506000604082860101526040601f19601f8301168501019250505092915050565b600181811c90821680610b3357607f821691505b602082108103610b5357634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252600e908201526d115cd8dc9bddc81a5cc81919585960921b604082015260600190565b600082610b9e57634e487b7160e01b600052601260045260246000fd5b500490565b80820180821115610bc457634e487b7160e01b600052601160045260246000fd5b9291505056fea26469706673582212203cb6fed529d0c915fd48101e20b12a5e37ca4d0835c730e86329942d20b060e464736f6c63430008120033";

type SingleStakedEscrowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SingleStakedEscrowConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SingleStakedEscrow__factory extends ContractFactory {
  constructor(...args: SingleStakedEscrowConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _buyer: AddressLike,
    _merchant: AddressLike,
    _amount: BigNumberish,
    _requestedGoodsDescription: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _buyer,
      _merchant,
      _amount,
      _requestedGoodsDescription,
      overrides || {}
    );
  }
  override deploy(
    _buyer: AddressLike,
    _merchant: AddressLike,
    _amount: BigNumberish,
    _requestedGoodsDescription: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _buyer,
      _merchant,
      _amount,
      _requestedGoodsDescription,
      overrides || {}
    ) as Promise<
      SingleStakedEscrow & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): SingleStakedEscrow__factory {
    return super.connect(runner) as SingleStakedEscrow__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SingleStakedEscrowInterface {
    return new Interface(_abi) as SingleStakedEscrowInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): SingleStakedEscrow {
    return new Contract(address, _abi, runner) as unknown as SingleStakedEscrow;
  }
}

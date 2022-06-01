/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  StakingContract,
  StakingContractInterface,
} from "../StakingContract";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "tokenTransfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakes",
    outputs: [
      {
        internalType: "uint256",
        name: "stakeTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakeBalance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "viewStakeBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "_balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5073234d11e2382c47283fbbbe42835676058009bf186000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555073bc4ca0eda7647a8ab7c2061c2e118a18a936f13d600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c7c806100c96000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806316934fc4146100515780632e1a7d4d14610082578063a694fc3a146100b2578063e0af8a02146100ce575b600080fd5b61006b6004803603810190610066919061078c565b6100ec565b604051610079929190610994565b60405180910390f35b61009c600480360381019061009791906107de565b610110565b6040516100a9919061091e565b60405180910390f35b6100cc60048036038101906100c791906107de565b61037d565b005b6100d66105f8565b6040516100e39190610979565b60405180910390f35b60026020528060005260406000206000915090508060000154908060010154905082565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000816000015411801561017a57506203f480816000015461017691906109ce565b4210155b1561021e57600061018961066f565b90506402540be4008161019c9190610a24565b8260010160008282546101af91906109ce565b9250508190555083826001015410156101fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f490610959565b60405180910390fd5b838260010160008282546102119190610aaf565b9250508190555050610281565b8281600101541015610265576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161025c90610959565b60405180910390fd5b828160010160008282546102799190610aaf565b925050819055505b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33856040518363ffffffff1660e01b81526004016102dc9291906108f5565b602060405180830381600087803b1580156102f657600080fd5b505af115801561030a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061032e91906107b5565b50600191507f15eaef6b52cca0422fcfd03599b7a19d583624be50c7516f29664df698613aad303385604051610366939291906108be565b60405180910390a142816000018190555050919050565b60018060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b81526004016103d991906108a3565b60206040518083038186803b1580156103f157600080fd5b505afa158015610405573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104299190610807565b101561046a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046190610939565b60405180910390fd5b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b815260040161050a939291906108be565b602060405180830381600087803b15801561052457600080fd5b505af1158015610538573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061055c91906107b5565b50600061056761066f565b90508282600101600082825461057d91906109ce565b925050819055506402540be400816105959190610a24565b8260010160008282546105a891906109ce565b925050819055507f15eaef6b52cca0422fcfd03599b7a19d583624be50c7516f29664df698613aad3330856040516105e2939291906108be565b60405180910390a1428260000181905550505050565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600061064661066f565b90506402540be400816106599190610a24565b826001015461066891906109ce565b9250505090565b600080600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600081600001541180156106d957506203f48081600001546106d591906109ce565b4210155b156107345760008160000154426106f09190610aaf565b905060006001826107019190610a24565b9050630f731400816402540be400600a61071b9190610a55565b6107259190610a55565b61072f9190610a24565b935050505b5090565b60008135905061074781610c01565b92915050565b60008151905061075c81610c18565b92915050565b60008135905061077181610c2f565b92915050565b60008151905061078681610c2f565b92915050565b60006020828403121561079e57600080fd5b60006107ac84828501610738565b91505092915050565b6000602082840312156107c757600080fd5b60006107d58482850161074d565b91505092915050565b6000602082840312156107f057600080fd5b60006107fe84828501610762565b91505092915050565b60006020828403121561081957600080fd5b600061082784828501610777565b91505092915050565b61083981610ae3565b82525050565b61084881610af5565b82525050565b600061085b602a836109bd565b915061086682610b89565b604082019050919050565b600061087e601a836109bd565b915061088982610bd8565b602082019050919050565b61089d81610b21565b82525050565b60006020820190506108b86000830184610830565b92915050565b60006060820190506108d36000830186610830565b6108e06020830185610830565b6108ed6040830184610894565b949350505050565b600060408201905061090a6000830185610830565b6109176020830184610894565b9392505050565b6000602082019050610933600083018461083f565b92915050565b600060208201905081810360008301526109528161084e565b9050919050565b6000602082019050818103600083015261097281610871565b9050919050565b600060208201905061098e6000830184610894565b92915050565b60006040820190506109a96000830185610894565b6109b66020830184610894565b9392505050565b600082825260208201905092915050565b60006109d982610b21565b91506109e483610b21565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610a1957610a18610b2b565b5b828201905092915050565b6000610a2f82610b21565b9150610a3a83610b21565b925082610a4a57610a49610b5a565b5b828204905092915050565b6000610a6082610b21565b9150610a6b83610b21565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610aa457610aa3610b2b565b5b828202905092915050565b6000610aba82610b21565b9150610ac583610b21565b925082821015610ad857610ad7610b2b565b5b828203905092915050565b6000610aee82610b01565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f536f7272792c206f6e6c7920426f72656420417065204e4654206f776e65727360008201527f2063616e207374616b6500000000000000000000000000000000000000000000602082015250565b7f416d6f756e742065786365656473204241542062616c616e6365000000000000600082015250565b610c0a81610ae3565b8114610c1557600080fd5b50565b610c2181610af5565b8114610c2c57600080fd5b50565b610c3881610b21565b8114610c4357600080fd5b5056fea2646970667358221220dd29282a993ba1e682871469186c58aa9a13c110b4fd5d625a5b63a755f79e6064736f6c63430008040033";

export class StakingContract__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StakingContract> {
    return super.deploy(overrides || {}) as Promise<StakingContract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): StakingContract {
    return super.attach(address) as StakingContract;
  }
  connect(signer: Signer): StakingContract__factory {
    return super.connect(signer) as StakingContract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingContractInterface {
    return new utils.Interface(_abi) as StakingContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingContract {
    return new Contract(address, _abi, signerOrProvider) as StakingContract;
  }
}

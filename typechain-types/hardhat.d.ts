/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Lock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock__factory>;
    getContractFactory(
      name: "SingleStakedEscrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SingleStakedEscrow__factory>;
    getContractFactory(
      name: "StakedEscrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakedEscrow__factory>;

    getContractAt(
      name: "Lock",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Lock>;
    getContractAt(
      name: "SingleStakedEscrow",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.SingleStakedEscrow>;
    getContractAt(
      name: "StakedEscrow",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.StakedEscrow>;

    deployContract(
      name: "Lock",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock>;
    deployContract(
      name: "SingleStakedEscrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SingleStakedEscrow>;
    deployContract(
      name: "StakedEscrow",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakedEscrow>;

    deployContract(
      name: "Lock",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Lock>;
    deployContract(
      name: "SingleStakedEscrow",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SingleStakedEscrow>;
    deployContract(
      name: "StakedEscrow",
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StakedEscrow>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.Contract>;
  }
}

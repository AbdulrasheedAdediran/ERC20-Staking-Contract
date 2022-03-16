/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface TokenMarketInterface extends ethers.utils.Interface {
  functions: {
    "getLatestPrice()": FunctionFragment;
    "swapEthToUsd(uint256,uint8)": FunctionFragment;
    "swapUsdToEth(uint256,uint8)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getLatestPrice",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "swapEthToUsd",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "swapUsdToEth",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getLatestPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapEthToUsd",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapUsdToEth",
    data: BytesLike
  ): Result;

  events: {};
}

export class TokenMarket extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TokenMarketInterface;

  functions: {
    getLatestPrice(overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;

    swapEthToUsd(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _value: BigNumber }>;

    swapUsdToEth(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { _value: BigNumber }>;
  };

  getLatestPrice(overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;

  swapEthToUsd(
    _amount: BigNumberish,
    _precision: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  swapUsdToEth(
    _amount: BigNumberish,
    _precision: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    getLatestPrice(overrides?: CallOverrides): Promise<[BigNumber, BigNumber]>;

    swapEthToUsd(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapUsdToEth(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    getLatestPrice(overrides?: CallOverrides): Promise<BigNumber>;

    swapEthToUsd(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    swapUsdToEth(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getLatestPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swapEthToUsd(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    swapUsdToEth(
      _amount: BigNumberish,
      _precision: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
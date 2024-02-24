import moment from "moment";
import memoize from "lodash/memoize";
import { getAddress } from "@ethersproject/address";
import { useColorModeValue } from "@chakra-ui/react";

// Make short Contract Address string
export const shortAddr = (addr: any): string => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 5)}...${addr.slice(addr.length - 2)}`;
};
// Make medium Contract Address string
export const mediumAddr = (addr: any): string => {
  if (addr.length < 10) return addr;
  return `${addr.slice(0, 10)}...${addr.slice(addr.length - 5)}`;
};

// Format special date from now using moment
export const formatDateFromNow = (date: string) => {
  return moment(date).startOf("day").fromNow();
};

export const commafy = (num: number | string | undefined) => {
  num = Number(num);
  if (num < 1 && num > 0) {
    return num;
  }
  var str = num.toFixed(2).split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  return str.join(".");
};

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
});

export const formatColor = (value: any) => {
  const n = parseInt(value);
  if (n >= 0) {
    return useColorModeValue("green.500", "green.500");
  } else if (n < 0) {
    return useColorModeValue("red.500", "red.500");
  }
};

export const formatPrice = (price: any) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const formattedPriceWithoutDecimals = (price: any) => {
  const formattedPrice = price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formattedPrice.replace(/\.00/g, "");
};

export const formattedAmountWithSymbol = (amount: any, symbol: string) => {
  if (!amount) return "-";
  const formattedAmount = amount?.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });

  return `${formattedAmount} ${symbol.toUpperCase()}`;
};

export const formatPercentage = (num: any) => {
  return (num / 100).toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatPercentageOrigin = (num: any) => {
  return num.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

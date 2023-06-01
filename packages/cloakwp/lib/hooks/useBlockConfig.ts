import { useContext } from "react";
import { BlockConfigContext } from "../context/blockConfig";

export function useBlockConfig() {
  let config = useContext(BlockConfigContext)
	return config
}
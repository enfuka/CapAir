import { createContext } from "react";

// set the defaults
const SearchContext = createContext({
  search: null,
  setSearch: () => {},
  printExpanded: false,
  setPrintExpanded: () => {},
});

export default SearchContext;

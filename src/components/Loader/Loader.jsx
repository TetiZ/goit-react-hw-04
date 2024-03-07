import { MagnifyingGlass } from "react-loader-spinner";

export default function Loader() {
  return (
    <MagnifyingGlass
      visible={true}
      height={80}
      width={80}
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{ margin: "0 auto 12px", display: "block" }}
      wrapperClassName="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#070707"
    />
  );
}

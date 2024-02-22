import useSetTitle from "../../hooks/useSetTitle";

function MyShopDashboard() {
  useSetTitle((defaultTitle) => `Shop Dashboard | ${defaultTitle}`);
  return <div>dashboard</div>;
}

export default MyShopDashboard;

import { Tabs } from "antd";
import SearchBar from "./searchBar";
import TripLookupForm from "./tripLookupForm";
const TabPane = (props) => (
  <Tabs
    type="card"
    items={[
      {
        label: `Book`,
        key: 1,
        children: <SearchBar />,
      },
      {
        label: `My Trips`,
        key: 2,
        children: <TripLookupForm type="mytrips" />,
      },
      {
        label: `Check-in`,
        key: 3,
        children: <TripLookupForm type="checkin" />,
      },
    ]}
  />
);
export default TabPane;

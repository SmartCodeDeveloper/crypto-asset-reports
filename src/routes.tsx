import { Icon } from "@chakra-ui/react";
import { FaHome, FaQuestionCircle } from "react-icons/fa";

import Dashboard from "@/views/dashboard";
import CoinDetails from "./views/coinDetails";
import Detail from "./views/detail";

const routes = [
  {
    name: "Crypto Assets",
    layout: "/",
    path: "/crypto-assets",
	visible: true,
    icon: <Icon as={FaHome} width="24px" height="24px" color="inherit" />,
    component: Dashboard,
  },
  {
    name: "Crypto Assets Detail",
    path: "/currencies/:id",
	visible: false,
    component: Detail,
  },
  {
    name: "Questions",
    layout: "/",
    path: "/faq",
	visible: true,
    icon: (
      <Icon as={FaQuestionCircle} width="24px" height="24px" color="inherit" />
    ),
    component: Detail,
  },
];

export default routes;

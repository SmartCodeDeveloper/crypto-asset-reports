import { Icon } from "@chakra-ui/react";
import { FaHome, FaQuestionCircle } from "react-icons/fa";

import Dashboard from "@/views/dashboard";
import Detail from "@/views/detail";
import FAQ from "@/views/faq";

const routes = [
  {
    name: "Crypto Assets",
    layout: "/crypto-assets",
    path: "/crypto-assets",
    visible: true,
    icon: <Icon as={FaHome} width="24px" height="24px" color="inherit" />,
    component: Dashboard,
  },
  {
    name: "Asset Details",
    layout: "/assets",
    path: "/assets/:id",
    visible: false,
    component: Detail,
  },
  {
    name: "FAQ",
    layout: "/faq",
    path: "/faq",
    visible: true,
    icon: (
      <Icon as={FaQuestionCircle} width="24px" height="24px" color="inherit" />
    ),
    component: FAQ,
  },
];

export default routes;

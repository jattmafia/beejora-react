import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";

export const productOptions = [
  {
    IconType: Feather,
    IconName: "shopping-cart",
    PTitle: "Product Variants",
    Status: "Pending",
    Lock: false,
    Chev: Entypo,
    ChevName: "chevron-thin-right",
    jumpTo: "CreateSet",
  },
  {
    IconType: MaterialCommunityIcons,
    IconName: "tape-measure",
    PTitle: "Add Size Set",
    Status: "Pending",
    Lock: false,
    Chev: Entypo,
    ChevName: "chevron-thin-right",
    jumpTo: "",
  },
  {
    IconType: AntDesign,
    IconName: "linechart",
    PTitle: "Stock",
    Status: "Pending",
    Lock: false,
    Chev: EvilIcons,
    ChevName: "lock",
    jumpTo: "",
  },
  {
    IconType: Entypo,
    IconName: "ticket",
    PTitle: "Attributes & Styles",
    Status: "Pending",
    Lock: false,
    Chev: Entypo,
    ChevName: "chevron-thin-right",
    jumpTo: "",
  },
  {
    IconType: MaterialCommunityIcons,
    IconName: "format-list-text",
    PTitle: "Catelog",
    Status: "Pending",
    Lock: false,
    Chev: Entypo,
    ChevName: "chevron-thin-right",
    jumpTo: "",
  },
];

export const clearData = (dispatch, foo) => {
  console.log("running");
  dispatch(foo(""));
};

export const dispatchAction = (dispatch, foo, param) => {
  // dispatch(foo())
  console.log(param);
};

export const AttributesAndStylesList = [
  {
    _style: "Style",
    req: true,
    _attributes: [
      "Ankle Boot",
      "Army Boot",
      "Full Boot",
      "Long Boot",
      "Rain Boot",
      "Safety Boot",
    ],
    selected: "",
  },
  {
    _style: "Sole",
    req: true,
    _attributes: [
      "Air Mix - (First Grade)",
      "Crepe",
      "Eva - (First Grade)",
      "Eva - (Second Grade)",
      "Neolite",
      "P.U. - (First Grade)",
      "P.U. - (Second Grade)",
      "P.U. - (Third Grade)",
    ],
    selected: "",
  },
  {
    _style: "Upper",
    req: false,
    _attributes: [
      "Micro Foam",
      "Milled Foam",
      "Nubuck Foam",
      "PU Rexine",
      "PVC RExine",
      "Patent Foam",
      "Rexine",
      "Softy Foam",
    ],
    selected: "",
  },
  {
    _style: "Lining",
    req: true,
    _attributes: [
      "Cloth",
      "Leather",
      "N/A",
      "Naturat Fur",
      "Synthetic Faux Fur",
      "Synthetic Foam",
    ],
    selected: "",
  },
  {
    _style: "Packaging",
    req: true,
    _attributes: ["Branded Box", "Loose", "Non-Branded Box"],
    selected: "",
  },
  {
    _style: "Upper Material",
    req: true,
    _attributes: ["1st Grade", "2nd Grade", "3rd Grade", "4th Grade"],
    selected: "",
  },
];

export const _Catelog = [
  {
    lable: "Beejora Price",
    value: ["599", "899"],
  },
  {
    lable: "Video URL",
    value: [""],
  },
  {
    lable: "Size Chart",
    value: [""],
  },
  {
    lable: "Tags",
    value: [""],
  },
  {
    lable: "HSN Code",
    value: ["845290099"],
  },
];

export const OrderTrackingData = [
  {
    order_pic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    status: "Dispatched",
    itemQty: 1,
    des: "Men Relexed Fit Tshirt",
    delivery_date: "04/03/2022",
    price: "Rs.699",
    chevUp: false,
    detailShown: false,
    orderSummaryShown: false,
    orderSummary: [
      {
        _attributes: [
          {
            lable: "Art.no.",
            val: "09700858009",
          },
          {
            lable: "Quantity:",
            val: "1",
          },
          {
            lable: "Colour:",
            val: "Black",
          },
          {
            lable: "Size:",
            val: "L",
          },
          {
            lable: "Total",
            val: "Rs.699",
          },
        ],
        estimated_delivery: "",
        delivery_method: "Standard Delivery",
        orderTimeline: [
          {
            _track_status: "Order Received",
            remarks: "Great! we've got your order.",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Processed",
            remarks: "Order is packed",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Dispatched",
            remarks: "Your Order is on the way to your customer.",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Order Delivered",
            remarks: "Your Order should be delivered by estimate date.",
            delivered_date: "04/03/2022",
            completed: true,
          },
        ],
      },
    ],
  },
  {
    order_pic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    status: "Cancelled",
    itemQty: 4,
    des: "Men Relexed Fit Tshirt",
    delivery_date: "20/01/2022",
    price: "Rs.1960",
    chevUp: false,
    detailShown: false,
    orderSummaryShown: false,
    orderSummary: [
      {
        _attributes: [
          {
            lable: "Art.no.",
            val: "09700858009",
          },
          {
            lable: "Quantity:",
            val: "1",
          },
          {
            lable: "Colour:",
            val: "Black",
          },
          {
            lable: "Size:",
            val: "L",
          },
          {
            lable: "Total",
            val: "Rs.699",
          },
        ],
        estimated_delivery: "",
        delivery_method: "Standard Delivery",
        orderTimeline: [
          {
            _track_status: "Order Received",
            remarks: "Great! we've got your order.",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Processed",
            remarks: "Order is packed",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Dispatched",
            remarks: "Your Order is on the way to your customer.",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Order Delivered",
            remarks: "Your Order should be delivered by estimate date.",
            delivered_date: "04/03/2022",
            completed: true,
          },
        ],
      },
    ],
  },
  {
    order_pic:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    status: "Delivered",
    itemQty: 3,
    des: "Men Relexed Fit Tshirt",
    delivery_date: "04/03/2022",
    price: "Rs.1870",
    chevUp: false,
    detailShown: false,
    orderSummaryShown: false,
    orderSummary: [
      {
        _attributes: [
          {
            lable: "Art.no.",
            val: "09700858009",
          },
          {
            lable: "Quantity:",
            val: "1",
          },
          {
            lable: "Colour:",
            val: "Black",
          },
          {
            lable: "Size:",
            val: "L",
          },
          {
            lable: "Total",
            val: "Rs.699",
          },
        ],
        estimated_delivery: "",
        delivery_method: "Standard Delivery",
        orderTimeline: [
          {
            _track_status: "Order Received",
            remarks: "Great! we've got your order.",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Processed",
            remarks: "Order is packed",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Dispatched",
            remarks: "Your Order is on the way to your customer.",
            delivered_date: "04/03/2022",
            completed: true,
          },
          {
            _track_status: "Order Delivered",
            remarks: "Your Order should be delivered by estimate date.",
            delivered_date: "04/03/2022",
            completed: true,
          },
        ],
      },
    ],
  },
];

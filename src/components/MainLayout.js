import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "./Header";
const MainLayout = ({ children }) => (_jsxs("div", { className: "flex h-screen", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1 w-screen h-screen overflow-y-auto", children: children })] }));
export default MainLayout;

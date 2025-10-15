import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { useWorkingCapitalStore } from "../stores/useWorkingCapitalStore";
import Spinner from "./Spinner";
import WorkingCapitalChart from "./WorkingCapitalChart";
const WorkingCapital = () => {
    const { workingCapital, loading, error, fetchWorkingCapital } = useWorkingCapitalStore();
    useEffect(() => {
        if (!workingCapital)
            fetchWorkingCapital();
    }, [fetchWorkingCapital, workingCapital]);
    if (loading)
        return _jsx(Spinner, {});
    if (error)
        return _jsxs("div", { className: "text-red-500", children: ["Error: ", error] });
    if (!workingCapital)
        return null;
    return (_jsx(_Fragment, { children: _jsx(WorkingCapitalChart, { data: workingCapital.data, currency: workingCapital.currency }) }));
};
export default WorkingCapital;

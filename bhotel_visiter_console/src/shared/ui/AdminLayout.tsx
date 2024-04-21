import {ReactNode} from "react";
import {SideBar} from "../../widgets";

export const AdminLayout = (props: { children: ReactNode }) => {

    const {children} = props

    return (
        <div className="grid">
            <div className="col-2 p-0">
                <SideBar/>
            </div>
            <div className="col-10 p-0 pl-4">{children}</div>
        </div>
    );
};
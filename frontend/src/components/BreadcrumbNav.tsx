import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter((path) => path !== "");
  const withoutLast = paths.slice(0, paths.length - 1);

  return (
    <Breadcrumb>
      <BreadcrumbList key={Math.random()} className="text-sm sm:text-base">
        {withoutLast.map((path, index) => (
          <>
            <BreadcrumbItem key={index}>
              <Link
                to={`/${
                  paths.indexOf(path) !== 0
                    ? `${paths.slice(0, paths.indexOf(path)).join("/")}/${path}`
                    : "dashboard"
                }`}
                className="capitalize"
              >
                {path}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize text-red">{paths.pop()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;

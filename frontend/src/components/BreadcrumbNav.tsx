import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";

const BreadcrumbNav = () => {
  const { pathname } = useLocation();
  const paths = pathname.split("/").filter((path) => path !== "");
  const withoutLast = paths.slice(0, paths.length - 1);

  return (
    <Breadcrumb>
      <BreadcrumbList key={Math.random()} className="text-base sm:text-lg">
        {withoutLast.map((path, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={`/${
                  paths.indexOf(path) !== 0
                    ? `${paths.slice(0, paths.indexOf(path)).join("/")}/${path}`
                    : "dashboard"
                }`}
                className="capitalize"
              >
                {path}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ))}

        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{paths.pop()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNav;

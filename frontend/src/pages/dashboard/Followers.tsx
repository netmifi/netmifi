import CustomTable from "@/components/CustomTable";
import ViewFollower from "@/components/dashboard/ViewFollower";
import React from "react";
const followers = [
  {
    id: "180910-29021",
    name: "john top",
    email: "julius@demo.com",
    username: "juliusthethird",
    date: new Date(),
  },
  {
    id: "180910-39203",
    name: "julius caesar",
    email: "julius@demo.com",
    username: "juliusthethird",
    date: new Date(),
  },
  {
    id: "2190-16712",
    name: "artzkaizen imim",
    email: "julius@demo.com",
    username: "juliusthethird",
    date: new Date(),
  },
  {
    id: "1292-219021",
    name: "amos king",
    email: "julius@demo.com",
    username: "juliusthethird",
    date: new Date(),
  },
];
const Followers = () => {
  return (
    <main>
      <CustomTable
        data={[...followers]}
        keys={["name", "email", "date"]}
        pageSize={50}
        promptLabel={"name"}
        isDialog={true}
        isEdit={false}
        ViewComponent={ViewFollower}
        setData={function (value: React.SetStateAction<HasId[]>): void {
          throw new Error("Function not implemented.");
        }}
        deleteURL={""}
        specialStyle={[
          {
            column: "name",
            className: "capitalize",
          },
        ]}
        lastPage={8}
      />
    </main>
  );
};

export default Followers;

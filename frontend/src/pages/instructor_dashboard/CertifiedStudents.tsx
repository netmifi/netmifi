import CustomTable from "@/components/CustomTable";
import ViewStudent from "@/components/instructor_dashboard/ViewStudent";

const students = [
  {
    id: "190223-d68734874",
    name: "ugochukwu aronu",
    amount: 89200,
    email: "ugochukwu956@example.com",
    course: "product design for pros",
    certifiedOn: new Date(),
    date: new Date(),
  },
  {
    id: "289032109-d68734874",
    name: "ugochukwu aronu",
    amount: 89200,
    email: "ugochukwu956@example.com",
    course: "product design for pros",
    certifiedOn: new Date(),
    date: new Date(),
  },
  {
    id: "216781-d68734874",
    name: "ugochukwu aronu",
    amount: 89200,
    email: "ugochukwu956@example.com",
    course: "product design for pros",
    certifiedOn: new Date(),
    date: new Date(),
  },
  {
    id: "289032109-2361812",
    name: "ugochukwu aronu",
    amount: 89200,
    email: "ugochukwu956@example.com",
    course: "product design for pros",
    certifiedOn: new Date(),
    date: new Date(),
  },
  {
    id: "289032109-1013",
    name: "ugochukwu aronu",
    amount: 89200,
    email: "ugochukwu956@example.com",
    course: "product design for pros",
    certifiedOn: new Date(),
    date: new Date(),
  },
];
const CertifiedStudents = () => {
  return (
    <main>
      <CustomTable
        data={[...students]}
        keys={["name", "course", "email", "certifiedOn", "date"]}
        pageSize={50}
        promptLabel={"name"}
        isDialog={true}
        isEdit={false}
        isDelete={false}
        ViewComponent={ViewStudent}
        setData={function (value: React.SetStateAction<HasId[]>): void {
          throw new Error("Function not implemented.");
        }}
        deleteURL={""}
        specialStyle={[
          {
            column: "name",
            className: "capitalize",
          },
          {
            column: "course",
            className: "capitalize",
          },
        ]}
        lastPage={8}
      />
    </main>
  );
};

export default CertifiedStudents;

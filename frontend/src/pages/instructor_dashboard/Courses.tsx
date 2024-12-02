import { aboutHero } from "@/assets/images";
import { testVid, testVid1, testVid2 } from "@/assets/videos";
import CustomTable from "@/components/CustomTable";
import ViewCourse from "@/components/instructor_dashboard/ViewCourse";
import ViewStudent from "@/components/instructor_dashboard/ViewStudent";
import React from "react";

const courses = [
  {
    id: "1891-239r44",
    title: "product design for pros",
    price: 89200,
    oldPrice: 19009,
    students: 80,
    thumbnail: aboutHero,
    introductionVideo: testVid,
    sections: [
      {
        title: "getting started",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro ",
        video: testVid1,
      },
      {
        title: "application of new ideas",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro ",
        video: testVid2,
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro dignissimos dicta cum corporis a praesentium modi laudantium odio! Rem, cumque eligendi.",
    requirements: ["laptop", "a brain", "camera"],
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "328904-343422rv",
    title: "mastering photography",
    price: 89200,
    students: 80,
    thumbnail: aboutHero,
    introductionVideo: testVid,
    sections: [
      {
        title: "getting started",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro ",
        video: testVid1,
      },
      {
        title: "application of new ideas",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro ",
        video: testVid2,
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro dignissimos dicta cum corporis a praesentium modi laudantium odio! Rem, cumque eligendi.",
    requirements: ["laptop", "a brain", "camera"],
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "23434-d68734874",
    title: "content creation extraodinare",
    price: 89200,
    oldPrice: 17812,
    students: 80,
    thumbnail: aboutHero,
    introductionVideo: testVid,
    sections: [
      {
        title: "getting started",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro ",
        video: testVid1,
      },
      {
        title: "application of new ideas",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro ",
        video: testVid2,
      },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, cumque officiis repellat sapiente fuga ipsa rem, eius porro dignissimos dicta cum corporis a praesentium modi laudantium odio! Rem, cumque eligendi.",
    requirements: ["laptop", "a brain", "camera"],
    rating: 4.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Courses = () => {
  return (
    <main>
      <CustomTable
        data={[...courses]}
        keys={[
          "title",
          "price",
          "oldPrice",
          "students",
          "createdAt",
          "updatedAt",
        ]}
        pageSize={50}
        promptLabel={"title"}
        isDialog={true}
        ViewComponent={ViewCourse}
        setData={function (value: React.SetStateAction<HasId[]>): void {
          throw new Error("Function not implemented.");
        }}
        deleteURL={""}
        specialStyle={[
          {
            column: "title",
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

export default Courses;

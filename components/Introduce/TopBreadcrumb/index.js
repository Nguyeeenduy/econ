import Breadcrumb from "@/components/Common/Breadcrumb";

function TopBreadcrumb() {
  const breadcrumb = [
    {
      href: "/gioi-thieu",
      title: "Giới thiệu",
    },
    {
      href: "#",
      title: "Câu chuyện đằng sau Ezmoney.vn",
    },
  ];
  return (
    <div style={{ paddingTop: "24px" }}>
      <div
        className="container"
        style={{ paddingTop: "24px", paddingBottom: "24px" }}
      >
        <Breadcrumb breadcrumb={breadcrumb} />
      </div>
    </div>
  );
}

export default TopBreadcrumb;

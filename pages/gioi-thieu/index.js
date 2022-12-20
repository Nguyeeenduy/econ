import MileStoneIntroduce from "@/components/Introduce/MilestoneIntroduce";
import MissionIntroduce from "@/components/Introduce/MissionIntroduce";
import OurTeamIntroduce from "@/components/Introduce/OurTeamIntroduce";
import SliderIntroduce from "@/components/Introduce/SliderIntroduce";
import ValueIntroduce from "@/components/Introduce/ValueIntroduce";
import React from "react";
import SecurityIntroduce from "@/components/Introduce/SecurityIntroduce";
import OurPartNers from "@/components/Introduce/OurPartNers";
import OurCustomers from "@/components/Introduce/OurCustomers";
import Advertisement from "@/components/Introduce/Advertisement";
import Layout from "@/components/_App/Layout";
import { getIntroducePageSetting } from "stores/pageSetting";

function Introduce() {
  const [dataIntroduce, setDataIntroduce] = React.useState();
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const getDataIntroduce = async () => {
      const result = await getIntroducePageSetting();
      if (result) setDataIntroduce(result?.data?.data);
    };
    getDataIntroduce();
    const onStorage = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <Layout title={"Ezmoney- Giới thiệu"}>
      <SliderIntroduce
        data={dataIntroduce?.attributes?.storys}
        isDark={isDark}
      />
      <ValueIntroduce data={dataIntroduce?.attributes?.worths} />
      <MissionIntroduce
        data={dataIntroduce?.attributes?.mission_vision}
        isDark={isDark}
      />
      <OurTeamIntroduce data={dataIntroduce?.attributes?.our_team} />
      <MileStoneIntroduce
        data={dataIntroduce?.attributes?.timelines}
        isDark={isDark}
      />
      <OurPartNers data={dataIntroduce?.attributes?.our_partners} />
      <SecurityIntroduce data={dataIntroduce?.attributes?.guards} />
      <OurCustomers
        data={dataIntroduce?.attributes?.our_customers}
        isDark={isDark}
      />
      <Advertisement data={dataIntroduce?.attributes?.image_ad} />
    </Layout>
  );
}

export default Introduce;

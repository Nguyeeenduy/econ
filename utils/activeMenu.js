import React from "react";

const clamp = (value) => Math.max(0, value);

const isBetween = (value, ceil) => value <= ceil;
export const activeMenu = (data, offset) => {
  const [activeId, setActiveId] = React.useState("");

  React.useEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;

      const position = data
        ?.map((item) => {
          const element = document.getElementById(item.id);

          if (!element) return { id: 0, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          //   const top = clamp(rect.top + scroll - offset);
          const bottom = clamp(rect.bottom + scroll - offset);
          const id = item.id;
          return { id, top, bottom };
        })
        .find(({ bottom }) => isBetween(scroll, bottom));

      setActiveId(position?.id || data?.[data?.length - 1]?.id);
    };

    listener();

    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, [data, offset]);

  return activeId;
};

export const activeMenuBlog = (data, offset) => {
  const [activeId, setActiveId] = React.useState("");

  React.useEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;
      let idd = data?.[0]?.id;
      const position = data?.map((item) => {
        const element = document.getElementById(item.id);

        if (!element) return { id: 0, top: -1 };

        const rect = element.getBoundingClientRect();
        const top = clamp(rect.top + scroll - offset);
        if (top < scroll) idd = item.id;
      });

      setActiveId(idd || data?.[data?.length - 1]?.id);
    };

    listener();

    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, [data, offset]);

  return activeId;
};
